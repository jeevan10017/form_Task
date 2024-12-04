import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DynamicForm from "./components/DynamicForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditCardForm from "./components/CreditCardForm";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <DynamicForm />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
