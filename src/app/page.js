"use client"
import { useRouter } from "next/navigation"

export default function Home() {
const router = useRouter();
  return (
   <div className="grid grid-flow-row grid-cols-2 p-2 text-2xl gap-2">
    <button className="p-2 bg-slate-900 rounded-xl" onClick={()=>{router.push('/items')}}>New Items</button>
    <button className="p-2 bg-slate-900 rounded-xl" onClick={()=>{router.push('/editItems')}} >Edit Items</button>
    <button className="p-2 bg-slate-900 rounded-xl" onClick={()=>{router.push('/sale')}}>Sale</button>
    <button className="p-2 bg-slate-900 rounded-xl" onClick={()=>{router.push('/sales')}}>Sales</button>
   </div>
  )
}
