// Table.jsx
import React from "react";

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">NIM</th>
          <th className="border border-gray-200 px-4 py-2">Nama</th>
          <th className="border border-gray-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
          <tr key={index}>
            <td className="border border-gray-200 px-4 py-2">{student.nim}</td>
            <td className="border border-gray-200 px-4 py-2">{student.nama}</td>
            <td className="border border-gray-200 px-4 py-2">
              <button
                className="text-blue-500 mr-2"
                onClick={() => onEdit(index)}
              >
                Edit
              </button>
              <button className="text-red-500" onClick={() => onDelete(index)}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
