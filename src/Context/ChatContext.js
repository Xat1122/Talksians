import { createContext, useReducer, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  }
  
  const chatRducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            userdata._id > action.payload.uid
              ? userdata._id + action.payload.uid
              : action.payload.uid + userdata._id,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatRducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
