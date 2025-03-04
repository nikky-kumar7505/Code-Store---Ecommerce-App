const express = require("express")

const app = express()
const dotenv = require("dotenv")
dotenv.config()

const port =  process.env.PORT ||  5000
const cors = require("cors")
const { readdirSync } = require("fs")
const { connectDB } = require("./db/connection")

//handle connection errors
app.use(cors({ 
    origin : process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
 }))
app.use(express.json())
app.options("*", cors());

connectDB();

app.get("/",(req, res)=>{
    res.send(`<center><h1>Server Running on PORT ${port}</h1></center>`)
});


//dynamic sync routes
(readdirSync("./routes")).map((route)=>
    app.use("/api", require(`./routes/${route}`))
)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port} `);
    
})