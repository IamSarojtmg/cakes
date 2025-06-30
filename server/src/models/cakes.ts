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
      required: [true, "Please enter cake name"],
      unique: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide the URL of the image of the cake'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide comment for the cake'],
      minlength: [5, 'Comment must be more than 5 characters'],
      maxlength: [200, 'Comments must be less than 200 characters'],
    },
    yumFactor: {
      type: Number,
      required: [true, 'Please provide us the rating of the cake'],
      min: [1,'Yum factor to be more than 1'],
      max: [5,'Yum factor to me less than 5'],
    },
  },
  {
    timestamps: true,
  }
);

const CakesModel = mongoose.model<CakeInterface>("Cakes", cakesSchema);
module.exports = CakesModel;
