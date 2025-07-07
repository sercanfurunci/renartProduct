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

  const starScore = popularityScore * 5;
  const fullStars = Math.floor(starScore);
  const hasHalfStar =
    starScore - fullStars >= 0.25 && starScore - fullStars < 0.75;

  return (
    <div className="snap-center flex-none w-[90vw] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/4 p-2 sm:p-4">
      <div className="flex mb-4 sm:mb-5 justify-center">
        <img
          src={images[activeColor]}
          className="rounded-2xl h-[200px] sm:h-[300px] w-full sm:w-[300px] object-cover"
          alt={name}
        />
      </div>

      <div className="font-montserratmed text-[14px] sm:text-[15px] mb-2 sm:mb-3">
        {name}
      </div>
      <div className="font-montserratreg text-[14px] sm:text-[15px] mb-2 sm:mb-3">
        ${price} USD
      </div>

      <div className="flex mb-2 sm:mb-3 space-x-3">
        {Object.entries(colorOptions).map(([color, bgColor]) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${bgColor} ${
              activeColor === color
                ? "outline outline-black outline-offset-2"
                : ""
            }`}
          ></button>
        ))}
      </div>

      <div className="font-avenir text-[12px] mb-2 sm:mb-3 capitalize">
        {activeColor} gold
      </div>
      <div className="font-avenir text-[13px] sm:text-[14px] mb-3 flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <StarIcon
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-300"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative w-4 h-4 sm:w-5 sm:h-5">
                <StarOutline className="absolute top-0 left-0 w-full h-full text-gray-400" />
                <StarIcon
                  className="absolute top-0 left-0 w-full h-full fill-yellow-300"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
            );
          } else {
            return (
              <StarOutline
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
              />
            );
          }
        })}
        <span className="ml-2 text-gray-700">{starScore.toFixed(1)}/5</span>
      </div>
    </div>
  );
}

export default Product;
