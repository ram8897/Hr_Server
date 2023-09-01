const mongoose = require('mongoose')
exports.connectDb = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/Test");
        process.env.CONNECTION_STRING
        console.log('db connected:', connect.connection.name);
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}