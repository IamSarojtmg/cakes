import mongoose from "mongoose";

const cakesSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    yumFactor:{
        type:Number,
        required:true
    }
})

const CakesModel = mongoose.model('Cakes', cakesSchema)
export default CakesModel


