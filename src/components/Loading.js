import LoadingIcon from "./icons/LoadingIcon";

export default function Loading() {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <h1>Loading...</h1>
      <LoadingIcon />
    </div>
  );
}
