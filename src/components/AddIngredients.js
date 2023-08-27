"use client";
import { useEffect, useState } from "react";
import AddIcon from "./icons/AddIcon";
import CheckIcon from "./icons/CheckIcon";
import firstLetterUpperCase from "./../utils/firstLetterUpperCase";

export default function AddIngredients(props) {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [numberOfIngredient, setNumberOfIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [numbersOpen, setNumbersOpen] = useState(false);
  const [numberHidden, setNumberHidden] = useState(false);
  const [ingredientsOnItem, setIngredientOnItem] = useState([""]);
  const [createItemButton, setCreateItemButton] = useState(true)

  const handleAddIngredients = async () => {
    const name = firstLetterUpperCase(ingredientName);
    const res = await fetch(`/api/ingredient`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const response = await res.json();
    if (res.ok) {
      if (response.ingredient === undefined) {
        console.log(response.newIngredient);
        const newArray = [...allIngredients, response.newIngredient];
        setAllIngredients(newArray);
        setIngredientId(response.newIngredient._id);
      } else {
        console.log(response.ingredient);
        setIngredientId(response.ingredient._id);
      }
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetch(`/api/ingredient`, {
      next: { revalidate: 2 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setAllIngredients(response.ingredients))
      .catch((error) => console.error(error));
  }, []);

  const handleNumber = (e) => {
    e.preventDefault();
    setNumberOfIngredient(e.target.value);
    setNumbersOpen(!numbersOpen);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const name = props.item;
    const ingredient = ingredientId;
    const quantity = numberOfIngredient;
    const res = await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, ingredientId: ingredient, quantity , type: 'addIngredient' }),
    });
    const response = await res.json();
    if (res.ok) {
      setIngredientOnItem([
        ...ingredientsOnItem,
        { name: ingredientName, quantity: quantity },
      ]);
      setIngredientName("");
      setNumberOfIngredient("");
      setNumberHidden(!numberHidden);
      console.log(response);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      {ingredientsOnItem?.map((ingredient) => (
        <div key={ingredient._id} className="flex flex-row justify-between p-1">
          <div>{ingredient.name}</div>
          <div>{ingredient.quantity}</div>
        </div>
      ))}
      <form className="flex justify-center">
        <div className="flex flex-col relative p-1 max-w-3/4">
          <>
            <input
              onClick={() => {
                setIngredientsOpen(!ingredientsOpen);
              }}
              className="w-full p-1 rounded-l-xl"
              onChange={(e) => {
                setIngredientName(e.target.value);
              }}
              value={ingredientName}
            />
            <button
              className="absolute right-1 p-1 text-black "
              onClick={(e) => {
                e.preventDefault();
                setIngredientsOpen(!ingredientsOpen);
                setNumberHidden(!numberHidden);
                handleAddIngredients();
              }}
            >
              <AddIcon />
            </button>
          </>
          <>
            {ingredientsOpen && (
              <div className="absolute top-11 w-full">
                <div className="flex flex-col ">
                  {allIngredients?.map((ingredient) => (
                    <button
                      className="bg-slate-500 odd:bg-slate-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setIngredientName(ingredient.name);
                        setIngredientsOpen(!ingredientsOpen);
                        setIngredientId(ingredient._id);
                        setNumberHidden(!numberHidden);
                      }}
                      key={ingredient._id}
                    >
                      {ingredient.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        </div>
        {numberHidden && (
          <>
            <div className="flex flex-col relative w-2/12 py-1">
              <input
                onClick={() => {
                  setNumbersOpen(!numbersOpen);
                }}
                className="p-1"
                type="number"
                onChange={(e) => {
                  setNumberOfIngredient(e.target.value);
                }}
                value={numberOfIngredient}
              />
              {numbersOpen && (
                <div className="absolute top-11">
                  <div className="flex flex-col">
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="0.125">
                      0.125
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="0.25">
                      0.25
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="0.5">
                      0.5
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="1">
                      1
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="2">
                      2
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="3">
                      3
                    </button>
                    <button className="bg-slate-500 odd:bg-slate-600" onClick={handleNumber} value="3">
                      4
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleUpdateItem}
              className="bg-green-800 p-1 rounded-r-xl my-1 max-h-[40px] "
            >
              <CheckIcon />
            </button>
          </>
        )}
      </form>
      <div className="flex justify-center">
        {createItemButton ?(
        <button
        onClick={(e)=>{e.preventDefault();setCreateItemButton(!createItemButton)}}
          className="bg-green-800 p-3 rounded-xl mt-5 "
        >
        Create Next Item
        </button>

        ):(
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="bg-red-800 p-3 rounded-xl mt-5 "
        >
          Are You Sure?
        </button>

        )}
      </div>
    </>
  );
}
