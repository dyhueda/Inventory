import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";

export default function InputIngredients(props) {
  const ingredient = props.ingredients;
  const [disabled, setDisabled] = useState(true);
  const [ingredientName, setIngredientName] = useState(
    ingredient.ingredient.name
  );
  const [ingredientQuantity, setIngredientQuantity] = useState(
    ingredient.quantity
  );
  const [deleted, setDeleted] = useState(true);
  const handleUpdateIngredient = async () => {
    const res = await fetch("/api/ingredient", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: ingredient.ingredient._id,
        name: ingredientName,
      }),
    });
    const response = await res.json();
    if (res.ok) {
    } else {
      console.error(response.message);
    }
  };
  const handleUpdateQuantity = async () => {
    const res = await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        itemId: props.itemId,
        id: ingredient._id,
        quantity: ingredientQuantity,
        type: "updateQuantity",
      }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log("ok2");
    } else {
      console.error(response.message);
    }
  };

  const handleDeleteIngredient = async () => {
    const res = await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: props.itemId,
        id: ingredient._id,
        type: "deleteIngredient",
      }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log("ok");
    } else {
      console.error(message.error);
    }
  };

  return (
    <div>
      {deleted && (
        <div className="flex items-center gap-1">
          <input
            onChange={(e) => {
              setIngredientName(e.target.value);
            }}
            className={` ${
              disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
            } w-10/12`}
            disabled={disabled}
            value={ingredientName}
          ></input>
          <input
            onChange={(e) => {
              setIngredientQuantity(e.target.value);
            }}
            className={` ${
              disabled ? "text-white bg-inherit" : "text-black bg-slate-400"
            } w-2/12`}
            disabled={disabled}
            value={ingredientQuantity}
            type="number"
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
                e.preventDefault();
                setDisabled(!disabled);
                handleUpdateIngredient();
                handleUpdateQuantity();
              }}
              className="bg-green-800 p-1 rounded"
            >
              <CheckIcon />
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteIngredient();
              setDeleted(false)
            }}
            className="bg-red-800 p-1 rounded"
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
}
