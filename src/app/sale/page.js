"use client";
import CancelIcon from "@/components/icons/CancelIcon";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function salePage() {
  const [allItems, setAllItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesListHidden, setSalesListHidden] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [lastItem, setLastItem] = useState(``);
  useEffect(() => {
    fetch(`/api/item`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllItems(response.items))
      .catch((error) => console.error(error));
  }, []);

  const deleteSale = async (indexToDelete, item, date) => {
    const updatedSales = sales.filter((_, index) => index !== indexToDelete);
    setSales(updatedSales);
    const items = item;
    const dateToDb = date;
    const res = await fetch("/api/sale", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ date: dateToDb, items: items }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.message);
    } else {
      console.log(response.message);
    }
  };

  const handleAddItem = async (item) => {
    const date = dayjs().format("HH:mm DD/MM/YY");
    item.date = date;
    const dateToDb = dayjs().format("DD/MM/YY");
    item.dateToDb = dateToDb;
    setLastItem(
      <p
        key={item._id}
        className="text-lg animate-fade-up animate-once animate-duration-[500ms] animate-ease-linear"
      >
        {date} - {item.name}
      </p>
    );
    setSales([...sales, item]);
    const res = await fetch("/api/sale", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ date: dateToDb, items: item._id }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.message);
    } else {
      console.log(response.message);
    }
  };
  return (
    <>
    <div className="flex flex-col bg-gray-900 text-2xl items-center mb-2">
      <h1 className="p-2">Sale</h1>
    </div>
      <div className="relative flex-row-reverse flex justify-between m-2 p-2 ">
        <button
          className="bg-blue-900 p-2 rounded-xl"
          onClick={(e) => {
            e.preventDefault;
            setSalesListHidden(!salesListHidden);
          }}
        >
          Last Orders
        </button>
        {lastItem}
        {salesListHidden && (
          <div className="absolute top-12 w-screen  right-0 bg-slate-700 rounded-xl p-2  ">
            <div className="flex flex-col-reverse divide-y divide-y-reverse ">
              {sales?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between text-lg p-1 bg-slate-500 odd:bg-slate-600 overflow-y-auto max-h-9/12"
                >
                  <div>{item.date}</div>
                  <div>{item.name}</div>
                  <button
                    className=""
                    onClick={(e) => {
                      e.preventDefault;
                      deleteSale(index, item._id, item.dateToDb);
                    }}
                  >
                    <CancelIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xl bg-slate-700 p-2">
        {allItems?.map((item) => (
          <button
            onClick={(e) => {
              e.preventDefault;
              handleAddItem(item);
            }}
            className="bg-slate-900 p-2 rounded-xl focus:outline-none focus:ring focus:ring-slate-300  "
            key={item._id}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
}
