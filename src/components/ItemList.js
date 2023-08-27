"use client";

import { useState } from "react";

import AddIngredients from "./AddIngredients";
import CheckIcon from "./icons/CheckIcon";
import firstLetterUpperCase from './../utils/firstLetterUpperCase';

export default function ItemList() {
  const [title, setTitle] = useState("");
  const [addIngredients, setAddIngredients] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleNewItem = async ()=>{
    const name = firstLetterUpperCase(title);
    const res = await fetch(`/api/item`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const response = await res.json();
    if(res.ok){
      console.log(response);

    }else{
      console.log(response);
    }



  }
  return (
    <div className=" bg-slate-700 w-screen  px-8 p-4">
      <div className="relative p-1 ">
        <form className="flex justify-center">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
              
            }}
            disabled={inputDisabled}
            className="disabled:bg-transparent p-1 rounded-l-xl w-full"
            value={title}
          />
          {!inputDisabled &&(
          <button onClick={(e)=>{
            e.preventDefault();
            setInputDisabled(true);
            setAddIngredients(!addIngredients);
            handleNewItem();
          }}
          className="p-2 bg-green-800 rounded-r-xl">
            <CheckIcon />
          </button>

          )}
        </form>
      </div>
      {addIngredients && <AddIngredients item={firstLetterUpperCase(title)} />}
    </div>
  );
}
