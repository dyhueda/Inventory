import connectMongoDb from "@/libs/mongodb"
import Ingredients from "@/models/ingredient";
import mongoose from "mongoose";

export default async function handler(req, res){



  if(req.method === "POST"){
    try{
      const {name} = req.body
      await connectMongoDb();
      const ingredient = await Ingredients.findOne({name : name})
      if(ingredient === null){
        const id = new mongoose.Types.ObjectId();
        const newIngredient = await Ingredients.create({name: name, _id : id})
        
        res.status(201).send({message: "New ingredient created successfully", newIngredient})
      }else{
        res.status(409).send({message: "Ingredient already exists"})
      }
    }catch(error){
      console.error(error)
      res.status(500).send({message: "API error"})
    }
  }
  if(req.method === "GET"){
    try{
      await connectMongoDb();
      const ingredients = await Ingredients.find().sort({name: "asc"});
      res.status(200).send({message: "Here is the list of ingredients", ingredients})
    }catch(error){
      console.error(error)
      res.status(400).send({message: "API error"})
    }
  }
}
