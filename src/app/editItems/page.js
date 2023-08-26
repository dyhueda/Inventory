"use client";
import InputItems from "@/components/InputItems";

import { useEffect, useState } from "react";

export default function editItemsPage() {
  const [allItems, setAllItems] = useState([]);


  useEffect(() => {
    fetch("/api/item", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllItems(response.items))
      .catch((error) => console.error(error));
  }, []);
  console.log(allItems);

  return (
    <>
    <div className="flex flex-col bg-gray-900 text-2xl items-center mb-2">
      <h1 className="p-2">Edit Items</h1>
    </div>
    <div className="flex p-2 flex-col text-lg gap-1 ">
      {allItems?.map((item) => (
        <div key={item._id}>
          <InputItems item={item} />
        </div>
      ))}
      </div>
    </>
  );
}
