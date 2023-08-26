"use client"
import Link from "next/link";
import MenuIcon from "./icons/MenuIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between p-3 px-5 ">
      <Link href="/">
        <h1 className="text-2xl">Inventory App</h1>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpenMenu(!openMenu);
        }}
        className=""
      >
        <MenuIcon />
      </button>
      {openMenu && (
        <div className="absolute z-[999] flex flex-col items-center top-10 right-1 w-60 p-2 text-lg gap-2 bg-gray-900/90 animate-fade-down animate-once animate-ease-linear animate-duration-500">
          <button className="bg-slate-700 p-1 w-full" onClick={(e)=>{setOpenMenu(!openMenu);router.push("/")}}>Home</button>
          <button className="bg-slate-700 p-1 w-full" onClick={(e)=>{setOpenMenu(!openMenu);router.push("/items")}}>New items</button>
          <button className="bg-slate-700 p-1 w-full" onClick={(e)=>{setOpenMenu(!openMenu);router.push("/editItems")}}>Edit Items</button>
          <button className="bg-slate-700 p-1 w-full" onClick={(e)=>{setOpenMenu(!openMenu);router.push("/sale")}}>Sale</button>
          <button className="bg-slate-700 p-1 w-full" onClick={(e)=>{setOpenMenu(!openMenu);router.push("/sales")}}>Sales</button>
        </div>
      )}
    </div>
  );
}
