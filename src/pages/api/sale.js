import connectMongoDb from "@/libs/mongodb";
import Sales from "@/models/sale";
import Items from "@/models/item";
import Ingredients from "@/models/ingredient";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { date, items } = req.body;
      await connectMongoDb();
      await Sales.create({ date: date, items: items });
      res.status(201).send({ message: `${date} created successfully` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { date, items } = req.body;
      await connectMongoDb();
      await Sales.findOneAndDelete({ date: date, items: items });
      return res.status(200).send({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  if (req.method === "GET") {
    try {
      const {date} = req.query;
      if (date === undefined) {
        await connectMongoDb();
        const allDates = await Sales.distinct("date");
        res.status(200).send({ dates: allDates });
      }else{
        await connectMongoDb();
        const allSales = await Sales.find({date:date}).populate('items').populate('items.ingredient' , 'name')
        res.status(200).send({ sales: allSales })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: error.message });
    }
  }
}
