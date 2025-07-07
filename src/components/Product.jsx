import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
function Product({ product }) {
  const { name, popularityScore, images, price } = product;
  const colorOptions = {
    yellow: "bg-yellowgold",
    white: "bg-whitegold",
    rose: "bg-rosegold",
  };

  const [activeColor, setActiveColor] = useState("yellow");
  const starCount = (popularityScore * 5).toFixed(1);

  return (
    <div className="flex-none w-1/4 p-4">
      <div className="flex mb-5 ">
        <img
          src={images[activeColor]}
          className="rounded-2xl h-[300px] w-[300px] object-cover"
        />
      </div>

      <div className="font-montserratmed text-[15px] mb-3">{name}</div>
      <div className="font-montserratreg text-[15px] mb-3">${price} USD</div>

      <div className="flex mb-3 space-x-3">
        {Object.entries(colorOptions).map(([color, bgColor]) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-8 h-8 rounded-full ${bgColor} ${
              activeColor === color
                ? "outline outline-black outline-offset-3 "
                : ""
            }`}
          ></button>
        ))}
      </div>

      <div className="font-avenir text-[12px] mb-3 capitalize">
        {activeColor} gold
      </div>
      <div className="font-avenir text-[14px] mb-3 flex">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < starCount ? (
              <StarIcon className=" w-5 h-5 fill-yellow-300" />
            ) : (
              <StarOutline className="w-5 h-5" />
            )}
          </span>
        ))}
        <span className="ml-2 text-gray-700">{starCount}/5</span>
      </div>
    </div>
  );
}

export default Product;
