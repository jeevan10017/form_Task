import React from "react";

const AddressTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400 text-center">No address data available.</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full table-auto border-collapse bg-gray-800 text-gray-100">
        <thead>
          <tr className="bg-gray-900 text-gray-100">
            <th className="p-3 text-left">Street</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">State</th>
            <th className="p-3 text-left">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((address, index) => (
            <tr
              key={index}
              className={`border-t border-gray-800 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-700"
              }`}
            >
              <td className="p-3">{address.street || "N/A"}</td>
              <td className="p-3">{address.city || "N/A"}</td>
              <td className="p-3">{address.state || "N/A"}</td>
              <td className="p-3">{address.zipCode || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
