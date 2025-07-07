import React from "react";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
function App() {
  return (
    <div className="flex flex-col h-dvh justify-center items-center">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
