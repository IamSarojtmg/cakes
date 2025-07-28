const CakesModel = require("../models/cakes");
import { Request, Response } from "express";

const getAllCakes = async (req: Request, res: Response) => {
  const cakes = await CakesModel.find();
  res.status(200).json({ cakes });
  //WRITE ERROR MESSAGE LATER
};

const getCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const cake = await CakesModel.findById(_id);

    if (!cake) {
      res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    res.status(200).json(cake);
  } catch (error) {
    //WRITE ERROR MESSAGE LATER
  }
};

const updateCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const errArrMsg: string[] =[]
  try {   
    const cakeToEdit = await CakesModel.findById(_id);
    if (!cakeToEdit) {
      res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    const updateCake = await CakesModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json(updateCake);
  } catch (error) {
    if (error.code === 11000) {
      errArrMsg.push("Same name detected - Please Enter a different name");
      return res.status(409).json({ status: "fail", message: errArrMsg[0] });
    }
        if (error.name === "ValidationError") {
      const validationErrorDetail = (error as any).errors;

      if (validationErrorDetail.imageUrl) {
        errArrMsg.push(validationErrorDetail.imageUrl.message);
      }
      if (validationErrorDetail.name) {
        errArrMsg.push(validationErrorDetail.name.message);
      }
      if (validationErrorDetail.comment) {
        errArrMsg.push(validationErrorDetail.comment.message);
      }
      if (validationErrorDetail.yumFactor) {
        errArrMsg.push(validationErrorDetail.yumFactor.message);
      }

      const errMsgToReturn =
        errArrMsg.length > 0 ? errArrMsg.join(", and ") : "no errors";
      return res.status(400).json({ status: "fail", message: errMsgToReturn });
    }
  }
};

const postCake = async (req: Request, res: Response) => {
  let arrOfMsg: string[] = [];

  try {
    const newCake = await CakesModel.create(req.body);
    res.status(201).json(newCake);
    return;
  } catch (error) {
    if (error.code === 11000) {
      arrOfMsg.push("Same name detected - Please Enter a different name");
      return res.status(409).json({ status: "fail", message: arrOfMsg[0] });
    }

    if (error.name === "ValidationError") {
      const validationErrorDetail = (error as any).errors;

      if (validationErrorDetail.imageUrl) {
        arrOfMsg.push(validationErrorDetail.imageUrl.message);
      }
      if (validationErrorDetail.name) {
        arrOfMsg.push(validationErrorDetail.name.message);
      }
      if (validationErrorDetail.comment) {
        arrOfMsg.push(validationErrorDetail.comment.message);
      }
      if (validationErrorDetail.yumFactor) {
        arrOfMsg.push(validationErrorDetail.yumFactor.message);
      }

      const errMsgToReturn =
        arrOfMsg.length > 0 ? arrOfMsg.join(", and ") : "no errors";
      return res.status(400).json({ status: "fail", message: errMsgToReturn });
    }
  }
};

const deleteCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const cakeToDelete = await CakesModel.findById(_id);
    if (!cakeToDelete) {
      res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    await CakesModel.findByIdAndDelete(_id);
    res.status(201).json({ message: "Cake has been deleted" });
  } catch (error) {
    //WRITE ERROR MESSAGE LATER
  }
};

module.exports = {
  getAllCakes,
  postCake,
  getCakeById,
  updateCakeById,
  deleteCakeById,
};
