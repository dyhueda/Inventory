import ItemList from "@/components/ItemList"
export default function ItemsPage(){
  

  return(
    <div className="flex flex-col bg-gray-900 text-2xl items-center mb-2">
      <h1 className="p-2">New Item</h1>
      <ItemList />
    </div>
  )
}
