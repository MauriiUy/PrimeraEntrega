const mongoose =require("mongoose") ;

const connectMongo =async () => {
    try {
        await mongoose.connect("mongodb+srv://mauriicarballo7:mauri7@cluster0.qgnqqe4.mongodb.net/?retryWrites=true&w=majority") //agrego enlace para mongo, y le pongo nombre "Ecommerce"
        console.log("db is connected")
    }
    catch  (error){
        console.log(error)
    }
}

module.exports= connectMongo 