import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";

import { ChatContext } from "../../Context/ChatContext";
import ChatsList from "./ChatsList";
import {
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 } from "uuid";
import moment from "moment/moment";

const Chat = () => {
  const divRef = useRef();
  const chatCtx = useContext(ChatContext);
  const [text, setText] = useState("");
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);

  const Connect = async () => {
    console.log("Click");
    await setDoc(doc(db, "users", userdata._id), {
      uid: userdata._id,
      displayName: userdata.firstName,
      email: userdata.email,
    });
    await setDoc(doc(db, "userChats", userdata._id), {});
  };

  const handleSend = async () => {
    setText("");
    await updateDoc(doc(db, "chats", chatCtx.data.chatId), {
      messages: arrayUnion({
        id: v4(),
        text: text,
        senderId: userdata._id,
        date: Timestamp.now(),
      }),
    });
  };
  const handleKey = (e) => {
    console.log(e.code);
    e.code === "Enter" && handleSend();
  };
  useEffect(() => {
    divRef.current?.scrollIntoView();
    // divRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    console.log("Chat Rendering");
    const unSub = onSnapshot(doc(db, "chats", chatCtx.data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        console.log(doc.data().messages);
      }
    });
    // Connect()
    return () => {
      unSub();
    };
  }, [chatCtx.data.chatId]);

  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        {/* <div className="sidebar-container">
          <Sidebar />
        </div> */}
        <div
          className="w-full flex mt-2"
          style={{ height: "calc(100vh - 150px" }}
        >
          <ChatsList />

          <div className="w-4/5 p-2 border bg-white rounded">
            {chatCtx.data.chatId === "null" ? (
              <p>Please Select a Chat</p>
            ) : (
              <div className="h-full">
                <div className="h-5/6 border overflow-y-auto">
                  <div className="h-full">
                    <div className="fixed">{chatCtx.data.user?.displayName}</div>
                    <div>
                      {messages?.map((message) => {
                        return (
                          <div
                            className={`flex ${
                              message.senderId === userdata._id
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div className="w-3/5 mr-3">
                              <p
                                className={`p-3 px-4 m-2 ${
                                  message.senderId === userdata._id
                                    ? "bg-purple-400"
                                    : "bg-blue-400"
                                } rounded w-full break-all`}
                                ref={divRef}
                              >
                                {message.text}
                              </p>
                              <div
                                className={`w-full flex ${
                                  message.senderId !== userdata._id &&
                                  "justify-end"
                                }`}
                              >
                                <p className="text-xs">{moment(message?.Timestamp).format(
                                  "DD-MM-YYYY"
                                )}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="h-1/6 border flex justify-between items-center">
                  <input
                    placeholder="Enter Message to send"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full"
                    onKeyDown={handleKey}
                  />
                  <button
                    className="bg-blue-500 h-full w-3/12"
                    onClick={handleSend}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default Chat;
