import connectMongoDb from "@/libs/mongodb";
import Items from "@/models/item";
import Ingredients from "@/models/ingredient";

export default async function handler(req, res){

if(req.method === 'POST'){
  try{
    const { name } = req.body;
    await connectMongoDb();
    await Items.create({name: name});
    return res.status(201).send({message : "Item created successfully"})
  }catch(error){
    return res.status(500).send({message : "Error creating" , error : error})
  }
}
if (req.method === 'PUT'){
  try{
    const { name, ingredientId, quantity } = req.body;
    await connectMongoDb();
    const item = await Items.findOneAndUpdate(
      { name: name },
      {
        $push: {
          ingredients: [{ ingredient: ingredientId, quantity: quantity }],
        },
      },
      { new: true }
    ).populate('ingredients.ingredient');
    return res.status(201).send({message : "Item updated successfully", item: item}) 
   }catch(error){
    console.error(error)
    return res.status(500).send({message : "Error updating"});
   }
} 
if (req.method === 'GET'){
  try{
    await connectMongoDb();
    const items = await Items.find().sort({name:"asc"}).populate('ingredients.ingredient', 'name');
    return res.status(200).send({items})
  }catch(error){
    console.log(error)
    return res.status(500).send({error})
  }
} 
}
