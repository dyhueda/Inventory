import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import SmallArrowDownIcon from "@/components/icons/SmallArrowDownIcon";
import SmallArrowUpIcon from "@/components/icons/SmallArrowUpIcon";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import InputIngredients from "@/components/InputIngredients";

export default function InputItems(props) {
  const [disabled, setDisabled] = useState(true);
  const [ingredientsDropDown, setIngredientsDropDown] = useState(false);
  const item = props.item;
  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <input
          className={` ${
            disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
          } w-10/12`}
          disabled={disabled}
          value={item.name}
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
      <div className="flex flex-col gap-1 py-1">
        {ingredientsDropDown &&
          item.ingredients.map((ingredient) => (
            <div key={ingredient._id}>
              <InputIngredients ingredients={ingredient} />
            </div>
          ))}
      </div>
    </div>
  );
}
