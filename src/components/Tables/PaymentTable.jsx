import React from "react";

const PaymentTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400 text-center">No payment data available.</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full table-auto border-collapse bg-gray-800 text-gray-100">
        <thead>
          <tr className="bg-green-600 text-gray-100">
            <th className="p-3 text-left">Card Number</th>
            <th className="p-3 text-left">Expiration Date</th>
            <th className="p-3 text-left">CVV</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payment, index) => (
            <tr
              key={index}
              className={`border-t border-gray-700 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-900"
              }`}
            >
              <td className="p-3">{payment.cardNumber || "N/A"}</td>
              <td className="p-3">{payment.expirationDate || "N/A"}</td>
              <td className="p-3">{payment.cvv || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
