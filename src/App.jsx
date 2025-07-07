import React from "react";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
function App() {
  return (
    <div className="flex flex-col h-dvh justify-center items-center px-4 sm:px-8">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
