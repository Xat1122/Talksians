import React, { useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Avatar } from "@mui/material";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";

const ChatsList = () => {
  const chatCtx = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);
  const [chat, setChat] = useState([]);
  const handleSearch = async () => {
    console.log("working");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    console.log(q, "q");
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot, "querySnapshot");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data(), "doc.data()");
      });
    } catch (err) {
      console.log("Error");
      setError(true);
    }
  };
  const handleKey = (e) => {
    console.log(e.code);
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    console.log("Handle");
    let combinedId =
      userdata._id > user.uid
        ? userdata._id + user.uid
        : user.uid + userdata._id;
        console.log(combinedId,"combinedId")
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("not exist");
      if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          console.log("not exist");
          // handleChangeUser(user)

        // create User Chat
        await updateDoc(doc(db, "userChats", userdata._id), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userdata._id,
            displayName: userdata.firstName,
            email: userdata.email,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
    setUserName("");
    setUser(null);
  };

  const handleChangeUser = (u) => {
    chatCtx.dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(chatCtx.data, "chatCtx.data");

  useEffect(() => {
    console.log("Chat Working");
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser?._id),
        (doc) => {
          console.log(doc.data(), "doc");
          setChat(doc.data());
        }
      );
      return () => {
        unsubscribe();
      };
    };
    currentUser?._id && getChats();
  }, [currentUser?._id]);
  console.log("Rendering Chat List");
  return (
    <div className="w-1/5 border bg-white mx-2 rounded overflow-y-auto">
      {/* <p className="text-sm text-center mt-2">{userdata.firstName}</p> */}
      <div className="p-2 bg-purple-500 flex items-center m-1 rounded">
        <div className="w-8 h-8 flex justify-center items-center bg-blue-300 rounded-full">
          M
        </div>
        <span className="ml-2 text-sm text-white"> {userdata.firstName}</span>
      </div>
      {/* <div className="w-full border p-2"> */}
      <input
        placeholder="Search users"
        onKeyDown={handleKey}
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        className="w-full border p-2 outline-none"
      />
      {/* </div> */}
      {err && <p>user not found</p>}
      {user && (
        <div
          className="p-2 bg-blue-200 flex items-center m-1 rounded"
          onClick={handleSelect}
        >
          <div className="w-8 h-8 flex justify-center items-center bg-blue-300 rounded-full">
          {user.displayName?.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 text-sm">{user.displayName}</span>
        </div>
      )}
      {/* <button onClick={getChats}>GetAllUsers</button> */}
      {chat &&
        Object.entries(chat)?.length > 0 &&
        Object.entries(chat)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return (
              <div
                className="p-2 bg-blue-200 flex items-center m-1 rounded"
                onClick={() => handleChangeUser(chat[1].userInfo)}
              >
                <div className="w-8 h-8 flex justify-center items-center bg-blue-300 rounded-full">
                  {chat[1].userInfo.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="ml-2 text-sm">
                  {chat[1].userInfo.displayName}
                </span>
              </div>
            );
          })}
    </div>
  );
};

export default ChatsList;
