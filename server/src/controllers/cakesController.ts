const CakesModel = require("../models/cakes");
import { Request, Response } from "express";

const getAllCakes = async (req: Request, res: Response) => {
  try {
    const cakes = await CakesModel.find();
    if (cakes.length === 0) {
      return res
        .status(404)
        .json({ message: "No cakes found or cakes list not available" });
    }
    return res.status(200).json({ status: "success", cakes: cakes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "MongoNotConnectedError") {
        return res.status(500).json({
          status: "error",
          message: "Unable to connect to the Mongo DB",
        });
      } else {
        return res.status(500).json({
          status: "error",
          message:
            "Internal Server Error - Unknown error found. Please try again",
        });
      }
    }
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, error could not be identified",
    });
  }
};

const getCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const cake = await CakesModel.findById(_id);
    if (!cake) {
      return res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    return res.status(200).json({ status: "success", cake: cake });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          status: "fail",
          message: "Invalid Id. Please provide a valid ID",
        });
      } else {
        return res.status(500).json({
          status: "error",
          message:
            "Internal Server Error - Unknown error found. Please try again",
        });
      }
    }
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, error could not be identified",
    });
  }
};

const updateCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const errArrMsg: string[] = [];
  try {
    const cakeToEdit = await CakesModel.findById(_id);
    if (!cakeToEdit) {
      return res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    const updateCake = await CakesModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json(updateCake);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === 11000) {
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
        return res
          .status(400)
          .json({ status: "fail", message: errMsgToReturn });
      }
    }
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, error could not be identified",
    });
  }
};

const postCake = async (req: Request, res: Response) => {
  let arrOfMsg: string[] = [];
  try {
    const newCake = await CakesModel.create(req.body);
    res.status(201).json({ status: "success", cake: newCake });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === 11000) {
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
        return res
          .status(400)
          .json({ status: "fail", message: errMsgToReturn });
      }
    }
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, error could not be identified",
    });
  }
};

const deleteCakeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const cakeToDelete = await CakesModel.findByIdAndDelete(_id);
    if (!cakeToDelete) {
      return res.status(404).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          status: "fail",
          message: "Invalid Id. Please provide a valid ID",
        });
      } else {
        return res
          .status(500)
          .json({
            status: "error",
            message:
              "Internal Server Error - Unknown error found. Please try again",
          });
      }
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong, error could not be identified",
      });
    }
  }
};

module.exports = {
  getAllCakes,
  postCake,
  getCakeById,
  updateCakeById,
  deleteCakeById,
};
