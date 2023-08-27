"use client";
import BackIcon from "@/components/icons/BackIcon";
import { useEffect, useState } from "react";

export default function salesPage() {
  const [allDates, setAllDates] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [toggleHidden, setToggleHidden] = useState(false);
  const [clickedDate, setClickedDate] = useState("");
  const [toggleItems, setToggleItems] = useState(false);
  const [toggleIngredients, setToggleIngredients] = useState(false);

  useEffect(() => {
    fetch(`/api/sale`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllDates(response.dates))
      .catch((error) => console.error(error));

    fetch("/api/ingredient", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllIngredients(response.ingredients))
      .catch((error) => console.error(error));

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

  const handleGetSales = async (date) => {
    const res = await fetch(`/api/sale?date=${date}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.sales);
      setAllSales(response.sales);
      setToggleHidden(!toggleHidden);
      setClickedDate(date);
    } else console.log(response.message);
  };

  let arrayIngredients = allIngredients.map((ingredient) => ({
    id: ingredient._id,
    name: ingredient.name,
    quantity: 0,
  }));
  allSales.map((sale) =>
    sale.items.ingredients.map((obj) =>
      arrayIngredients.map((ingredient) => {
        if (obj.ingredient === ingredient.id) {
          ingredient.quantity += obj.quantity;
        }
      })
    )
  );
  let arrayItems = allItems.map((item) => ({ name: item.name, quantity: 0 }));
  arrayItems.map((item) =>
    allSales.map((sale) => {
      if (item.name === sale.items.name) {
        item.quantity = item.quantity + 1;
      }
    })
  );
  return (
    <>
    <div className="flex flex-col bg-gray-900 text-2xl items-center mb-2">
      <h1 className="p-2">Sales</h1>
    </div>
      {toggleHidden && (
        <div>
          <div className="flex flex-row justify-between p-2">
            <div>{clickedDate}</div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setToggleHidden(!toggleHidden);
              }}
            >
              <BackIcon />
            </button>
          </div>

          <div className="flex flex-col divide-y  ">
            <button
              onClick={(e) => {
                e.preventDefault();
                setToggleItems(!toggleItems);
              }}
              className={`text-xl p-2 ${toggleItems ? 'bg-slate-700' : 'bg-slate-900'}`}
            >
              Items
            </button>
            {toggleItems &&
              arrayItems?.map(
                (item, index) =>
                  item.quantity !== 0 && (
                    <div
                      className="flex justify-between p-2  bg-slate-500 odd:bg-slate-600 overflow-y-auto"
                      key={index}
                    >
                      <div>{item.name}</div>
                      <div>{item.quantity}</div>
                    </div>
                  )
              )}

            <button
              onClick={(e) => {
                e.preventDefault();
                setToggleIngredients(!toggleIngredients);
              }}
              className={`text-xl p-2 ${toggleIngredients ? 'bg-slate-700' : 'bg-slate-900'}`}
            >
              Ingredients
            </button>

            {toggleIngredients &&
              arrayIngredients?.map(
                (ingredient) =>
                  ingredient.quantity !== 0 && (
                    <div
                      className="flex justify-between p-2  bg-slate-500 odd:bg-slate-600 overflow-y-auto"
                      key={ingredient.id}
                    >
                      <div>{ingredient.name}</div>
                      <div>{ingredient.quantity}</div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
      {!toggleHidden && (
        <div className="grid grid-cols-3 gap-1">
          {allDates.map((date, index) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleGetSales(date);
              }}
              className="bg-slate-900 p-1 rounded-xl"
              key={index}
            >
              {date}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
