import CakesModel from "../models/cakes";


export const getAllCakes = async(req:any, res:any)=>{
        const cakes = await CakesModel.find();
    res.status(200).json({ cakes });
}


export const postCake = async(req:any, res:any)=>{
      try {
    const newCake = await CakesModel.create(req.body)
    res.status(200).json(newCake)
  } catch (error) { 
    console.error(error)
    res.status(500).json({message: error.message})
  }
}

