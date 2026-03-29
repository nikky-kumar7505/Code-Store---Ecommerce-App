const express = require("express")
const path = require("path")
const { readdirSync } = require("fs")

const app = express()
const dotenv = require("dotenv")
dotenv.config()

const port =  process.env.PORT ||  5000
const cors = require("cors")
const { connectDB } = require("./db/connection")

//handle connection errors
app.use(cors({ 
    origin : process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
 }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

connectDB();

app.get("/",(req, res)=>{
    res.send(`<center><h1>Server Running on PORT ${port}</h1></center>`)
});


// dynamic sync routes (use __dirname so startup works when cwd is not /server)
const routesDir = path.join(__dirname, "routes")
readdirSync(routesDir).forEach((file) => {
  if (!file.endsWith(".js")) return
  app.use("/api", require(path.join(routesDir, file)))
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port} `);
    
})