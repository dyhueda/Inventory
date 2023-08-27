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
if (req.method === 'PUT' && req.body.type === 'addIngredient'){
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

if(req.method === 'PUT' && req.body.type === 'updateItem'){
  try{
    const { id,  name } = req.body;
    await connectMongoDb();
    await Items.findByIdAndUpdate({_id: id}, {name: name})
    return res.status(200).send({message : "Item updated successfully"});

  }catch(error){
    return res.status(500).send({message: error})
  }
}
if(req.method === 'PUT' && req.body.type === 'updateQuantity'){
  try{
    const { itemId, id , quantity } = req.body;
    console.log(id, quantity , itemId);
    await connectMongoDb();
    const item = await Items.updateOne({'ingredients._id' : id},{$set:{'ingredients.$.quantity' : quantity}})
    console.log(item)
    return res.status(200).send({message : "Quantity updated successfully"});
  }catch(error){
    console.error(error)
    return res.status(500).send({message: error})

  }
}
if(req.method === 'PUT' && req.body.type === 'deleteIngredient'){
  try{
    const { itemId , id  } = req.body;
    console.log(id);
    await connectMongoDb();
    const item = await Items.updateOne({_id : itemId},{$pull:{ingredients :{_id: id}}})
    console.log(item)
    return res.status(200).send({message : "Quantity updated successfully"});
  }catch(error){
    console.error(error)
    return res.status(500).send({message: error})

  }
}

if (req.method === 'GET'){
  try{
    await connectMongoDb();
    const items = await Items.find().sort({name:"asc"}).populate('ingredients.ingredient', 'name');
    return res.status(200).send({items})
  }catch(error){
    console.error(error)
    return res.status(500).send({error})
  }
} 
if(req.method === 'DELETE'){
  try{
    const {item} = req.body
    await connectMongoDb();
    await Items.findByIdAndDelete(item._id)
    return res.status(200).send({message : "Item deleted"})
  }catch(error){
    return res.status(500).send({message : error})
  }
}
}
