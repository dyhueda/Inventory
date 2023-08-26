import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";

export default function InputIngredients(props) {
  const [disabled, setDisabled] = useState(true);
  const ingredient = props.ingredients;
  console.log(ingredient)
  return (
    <div>
      <div className="flex items-center gap-1" >
        <input
          className={` ${
            disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
          } w-10/12`}
          disabled={disabled}
          value={ingredient.ingredient.name}
        ></input>
          <input
          className={` ${
            disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
          } w-2/12`}
          disabled={disabled}
          value={ingredient.quantity}
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
            }}
            className="bg-green-800 p-1 rounded"
          >
            <CheckIcon />
          </button>
        )}
        <button className="bg-red-800 p-1 rounded">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
