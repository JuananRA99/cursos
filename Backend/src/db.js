import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://localhost/cursos") ;
        console.log("MongoDB connected successfully");
         } catch (error){
        console.log(error)
}
};