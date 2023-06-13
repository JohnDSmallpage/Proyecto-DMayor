
import React, { useContext } from 'react'
import { useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase models/Config"
import { useUser } from '../../firebase models/userContext';
import { UserContext } from '../../firebase models/userContext';


const Search = () => {

  const {user} = useUser()

  const [username, setUsername] = useState("")
  const [userB, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("name", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {

    

    const combinedId = user.uid > userB.uid ? user.uid + userB.uid : userB.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userB.uid,
            name: userB.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userB.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null)
    setUsername('')

  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>Usuario no encontrado</span>}
      {userB && (
        <div className="userChat" onClick={handleSelect}>
          <img src='' alt="" />
          <div className="userChatInfo">
            <span>{userB.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search
