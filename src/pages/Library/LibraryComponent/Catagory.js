import React from "react";
import { useNavigate } from "react-router-dom";

const Catagory = ({ title, poster, id }) => {
    const navigate=useNavigate()
  return (
    <div
      className="bg-gray-100 w-72 h-72 rounded-lg shadow-xl overflow-hidden mr-4 mb-4 cursor-pointer"
      onClick={() => {
        navigate(`/Catagory/${id}`);
      }}
    >
      <div className="w-full h-full">
        <p className="h-1/6 p-2 flex items-center text-white bg-mainColor mb-0">
          {title}
        </p>
        <div className="w-full h-5/6">
          <img src={poster} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Catagory;
