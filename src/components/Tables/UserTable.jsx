import React from "react";

const UserTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400 text-center">No user data available.</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full table-auto border-collapse bg-gray-800 text-gray-100">
        <thead>
          <tr className="bg-gray-900 text-gray-100">
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={index}
              className={`border-t border-gray-700 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-900"
              }`}
            >
              <td className="p-3">{user.firstName || "N/A"}</td>
              <td className="p-3">{user.lastName || "N/A"}</td>
              <td className="p-3">{user.age || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
