import React from "react";
import { Messages } from "../components/Chat/Messages";
import { Sidebar } from "../components/Chat/Sidebar";
import { useUser } from "../firebase models/userContext";

export function Chat() {
//   const { user } = useUser();
  return (
   
      <div id="secondHalf" className=" flex h-full w-screen justify-center  items-center ">
          <div className="flex flex-col w-full h-screen mx-auto rounded-xl shadow shadow-slate-300 overflow-hidden ">
            <div className="flex flex-row  h-full w-full">
              <Sidebar></Sidebar>
              <Messages></Messages>
            </div>
          </div>
        </div>
  );
}
