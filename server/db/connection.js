const mongoose = require("mongoose")

const connectDB = async () => {
    try {
const connection = await mongoose.connect(process.env.MONGO_URI)

        if (connection.STATES.connecting){
            console.log(`Connecting DB to ${connection.connection.host} `);
            
        }
        if (connection.STATES.connected){
            console.log(`DB Connected`);
            
        }
        if (connection.STATES.disconnected){
            console.log(`Disconnected DB to ${connection.connection.host} `);
            
        }
        
    } catch (error) {
        console.log("Error connecting to database", error);
        
    }

}

module.exports = {connectDB}