const CakesModel = require('../models/cakes')

const getAllCakes = async (req: any, res: any) => {
  const cakes = await CakesModel.find();
  res.status(200).json({ cakes });
};

const postCake = async (req: any, res: any) => {
  try {
    const newCake = await CakesModel.create(req.body);
    res.status(200).json(newCake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getAllCakes, postCake}
