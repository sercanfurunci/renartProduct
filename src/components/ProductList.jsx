import React, { useEffect, useRef, useState } from "react";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function ProductList() {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll(); // ilk durumda kontrol et
    }

    return () => el && el.removeEventListener("scroll", handleScroll);
  }, [products]);

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
    <div className="relative w-full max-w-[1440px]">
      {/* Chevron Left Icon */}
      {canScrollLeft && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20  sm:block">
          <ChevronLeftIcon
            onClick={scrollLeft}
            className="w-10 h-10 cursor-pointer text-gray-700 hover:scale-110 transition "
          />
        </div>
      )}

      {/* Scrollable Product Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pl-6 pr-6 sm:px-12 scrollbar-hide snap-x snap-mandatory"
      >
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      {/* Chevron Right Icon */}
      {canScrollRight && (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20  sm:block">
          <ChevronRightIcon
            onClick={scrollRight}
            className="w-10 h-10 cursor-pointer text-gray-700 hover:scale-110 transition "
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
