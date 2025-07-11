const CakesModel = require("../models/cakes");

const getAllCakes = async (req: any, res: any) => {
  const cakes = await CakesModel.find();
  res.status(200).json({ cakes });
  //WRITE ERROR MESSAGE LATER
};

const getCakeById = async (req: any, res: any) => {
  const { _id } = req.params;
  try {
    const cake = await CakesModel.findById(_id);

    if (!cake) {
      res.status(400).json({
        status: "Fail",
        message: "Cake not found with that ID",
      });
    }

    res.status(200).json(cake);
  } catch (error) {
    //WRITE ERROR MESSAGE LATER
  }
};

const postCake = async (req: any, res: any) => {
  try {
    const newCake = await CakesModel.create(req.body);
    res.status(201).json(newCake);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrorDetail = (error as any).errors;
      let arrOfMsg: string[] = [];
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

      res.status(400).json(arrOfMsg[0]);
    }
  }
};

module.exports = { getAllCakes, postCake, getCakeById };
