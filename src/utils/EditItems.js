export default function editItems(){
  const getStaticProps = async () =>{
    const res = await fetch("/api/item", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    const response = await res.json();
    const items = response.items
    return {props : {items}}
  }
}
