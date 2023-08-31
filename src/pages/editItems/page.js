export const getStaticProps = async () =>{
  const res = await fetch("localhost:3000/api/item", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
  const response = await res.json();
  const items = response.items
  return {props : {items}}
}
import InputItems from "@/components/InputItems";

export default function editItemsPage({items}) {

  const allItems = items

/*   useEffect(() => {
    fetch("/api/item", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllItems(response.items))
      .catch((error) => console.error(error));
  }, []); */


  return (
    <>
    <div className="flex flex-col bg-gray-900 text-2xl items-center ">
      <h1 className="p-2">Edit Items</h1>
    </div>
    <div className="flex p-2 flex-col text-lg  divide-y">
      {allItems?.map((item) => (
        <div className="p-1" key={item._id}>
          <InputItems item={item} />
        </div>
      ))}
      </div>
    </>
  );
}
