"use client"
import InputItems from "@/components/InputItems";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

export default function editItemsPage() {
  const [allItems , setAllItems] = useState()
  const [loading , setLoading] = useState(true)
  
  useEffect(() => {
    fetch("/api/item", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllItems(response.items))
      .then (setLoading(false))
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
    <div className="flex flex-col bg-gray-900 text-2xl items-center ">
      <h1 className="p-2">Edit Items</h1>
    </div>
    <div className="flex p-2 flex-col text-lg  divide-y">
      {loading ? (
        <Loading/>
      ):(
        
        allItems?.map((item) => (
          <div className="p-1" key={item._id}>
            <InputItems item={item} />
          </div>
        ))
      )}
      </div>
    </>
  );
}
