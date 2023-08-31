"use client"
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import SmallArrowDownIcon from "@/components/icons/SmallArrowDownIcon";
import SmallArrowUpIcon from "@/components/icons/SmallArrowUpIcon";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import InputIngredients from "@/components/InputIngredients";
import firstLetterUpperCase from "@/utils/firstLetterUpperCase";

export default function InputItems(props) {
  const [disabled, setDisabled] = useState(true);
  const [ingredientsDropDown, setIngredientsDropDown] = useState(false);
  const [itemsDeleted, setItemDeleted] = useState(true);
  const [itemName, setItemName] = useState(props.item.name)
  const item = props.item;

  const handleDeleteItem = async () => {
    const res = await fetch("/api/item", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ item }),
    });
    const response = await res.json();
    if (res.ok) {
      setItemDeleted(false);
    } else {
      console.error(response.message);
    }
  };

  const handleUpdateItem = async () => {
    const res = await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: itemName, id: item._id,  type: "updateItem" }),
    });
    const response = await res.json();
    if (res.ok) {
    }else{
      console.error(response.message)
    }
  }
  return (
    <div>
      {itemsDeleted && (
        <>
          <div className="flex flex-row items-center gap-1 pb-2">
            <input
            onChange={(e)=>{setItemName(firstLetterUpperCase(e.target.value))}}
              className={` ${
                disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
              } w-10/12`}
              disabled={disabled}
              value={itemName}
            ></input>
            {disabled ? (
              <button
                onClick={(e) => {
                  e.preventDefault;
                  setDisabled(!disabled);
                }}
                className="bg-blue-800 p-1 rounded"
              >
                <EditIcon />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault;
                  setDisabled(!disabled);
                  handleUpdateItem();
                }}
                className="bg-green-800 p-1 rounded"
              >
                <CheckIcon />
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteItem();
              }}
              className="bg-red-800 p-1 rounded"
            >
              <DeleteIcon />
            </button>
            {ingredientsDropDown ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIngredientsDropDown(!ingredientsDropDown);
                }}
                className="bg-slate-600 p-1 rounded"
              >
                <SmallArrowUpIcon />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIngredientsDropDown(!ingredientsDropDown);
                }}
                className="bg-slate-600 p-1 rounded"
              >
                <SmallArrowDownIcon />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 bg-slate-700 divide-y">
            {ingredientsDropDown &&
              item.ingredients.map((ingredient) => (
                <div className="p-1" key={ingredient._id}>
                  <InputIngredients ingredients={ingredient} itemId={item._id} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
