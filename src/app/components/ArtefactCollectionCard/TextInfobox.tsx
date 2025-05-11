export default function TextInfobox() {
  return (
    <div
      className="absolute left-1/2 top-3/4 bg-gray-900 border-2 border-white rounded-md flex flex-col justify-center items-center gap-3 transition-all p-3 min-w-fit cursor-default"
      style={{ opacity }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    ></div>
  );
}
