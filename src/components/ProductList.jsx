import React, { useEffect, useRef } from "react";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  getGoldPrice,
  calculatePrice,
} from "../store/productSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function ProductList() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    dispatch(getGoldPrice()).then(() => {
      dispatch(calculatePrice());
    });
  }, []);

  const { products } = useSelector((store) => store.product);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mx-20">
      <ChevronLeftIcon
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 z-10 cursor-pointer text-gray-700 hover:scale-110 transition"
      />

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 px-12 scrollbar-hide"
      >
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      <ChevronRightIcon
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 z-10 cursor-pointer text-gray-700 hover:scale-110 transition"
      />
    </div>
  );
}

export default ProductList;
