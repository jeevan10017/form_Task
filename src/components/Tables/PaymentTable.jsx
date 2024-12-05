import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PaymentTable = ({ data }) => {
  const [visibility, setVisibility] = useState(data.map(() => false));

  const toggleCVVVisibility = (index) => {
    setVisibility((prev) =>
      prev.map((isVisible, idx) => (idx === index ? !isVisible : isVisible))
    );
  };

  const formatAccountNumber = (number, hideLastSix) => {
    if (!number) return "N/A";
    if (hideLastSix) {
      return number.replace(/(\d{4})(\d{4})(\d{4})(\d{2})/, "$1 $2 $3 XX");
    }
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
  };

  const formatCVV = (cvv, show) => {
    if (!cvv) return "N/A";
    return show ? cvv : "XXX";
  };

  if (!data || data.length === 0) {
    return <p className="text-gray-400 text-center">No payment data available.</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full table-auto border-collapse bg-gray-800 text-gray-100">
        <thead>
          <tr className="bg-gray-900 text-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Account Number</th>
            <th className="p-3 text-left">Expiration Date</th>
            <th className="p-3 text-left">CVV</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payment, index) => (
            <tr
              key={index}
              className={`border-t border-gray-800 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-700"
              }`}
            >
              <td className="p-3">{payment.cardName || "N/A"}</td>
              <td className="p-3">
                {formatAccountNumber(payment.cardNumber || "", visibility[index])}
              </td>
              <td className="p-3">{payment.expirationDate || "N/A"}</td>
              <td className="p-3 flex items-center space-x-2">
                <span>{formatCVV(payment.cvv || "", visibility[index])}</span>
                <button
                  onClick={() => toggleCVVVisibility(index)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  {visibility[index] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
