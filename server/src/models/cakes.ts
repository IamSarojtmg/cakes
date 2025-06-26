import mongoose from "mongoose"; 

export interface CakeInterface extends mongoose.Document {
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number;
}

const cakesSchema = new mongoose.Schema<CakeInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    yumFactor: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const CakesModel = mongoose.model<CakeInterface>("Cakes", cakesSchema);
module.exports = CakesModel;
