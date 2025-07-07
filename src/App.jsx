import React, { useEffect } from "react";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "./store/productSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  console.log(loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-dvh justify-center items-center px-4 sm:px-8">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
