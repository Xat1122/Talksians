import React from "react";

const Request = (props) => {
  const { requestData, acceptRequestHandler, rejectRequestHandler } = props;
  const { firstName, lastName, _id: id } = requestData;
  return (
    <div
      className="bg-gray-200 border-2 border-mainColor w-full rounded-lg shadow-xl overflow-hidden mb-4 p-3"
      key={id}
    >
      <p>
        {`${firstName} ${lastName}`} want to become a Teacher Please Approve or Reject the
        request
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white rounded-md text-center m-2 py-2 px-6"
          onClick={() => acceptRequestHandler(id)}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white rounded-md text-center m-2 py-2 px-6"
          onClick={() => rejectRequestHandler(id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Request;
