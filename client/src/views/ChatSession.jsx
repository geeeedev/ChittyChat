import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";

const ChatSession = (props) => {
  const { chatName } = props;
  const [socket] = useState(() => io(":8000"));
  const [whoJustJoin, setWhoJustJoin] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [msgObj, setMsgObj] = useState([]);

  useEffect(() => {
    socket.emit("justJoin", chatName);
    socket.on("justJoin", (joinName) => {
      setWhoJustJoin(joinName);
    });
    socket.on("allMsgObjFrServer", (allMsgObj) => {
      console.log(allMsgObj);
      setMsgObj(allMsgObj);
      // setMsgObj((existingMsgObj) => {
      // return [allMsgObj, ...existingMsgObj];
    });

    return () => socket.disconnect(true);
  }, [socket]);

  const handleSendMsg = (e) => {
    e.preventDefault();

    //retrieve timestamp
    const timestamp = moment().utcOffset("-07:00").format("M/D hh:mm a");
    console.log(timestamp);

    //construct newMsgObj
    const newMsgObj = {
      id: socket.id,
      by: chatName,
      msg: newMsg,
      time: timestamp,
    };

    //pass newMsgObj to server
    socket.emit("newMsgObj", newMsgObj);
    setNewMsg("");
  };

  //clear chat - need improvement
  const handleClearChat = () => {
    socket.emit("clearChat");
  };

  if (msgObj === null) {
    return "Loading Chat ...";
  }

  return (
    <div className="container mt-2 mb-2 p-4 ">
      <h3>Socket Chat App</h3>
      <h6>{whoJustJoin} has joined the chat.</h6>

      {msgObj.map((eachMsg) => {
        if (eachMsg.id === socket.id) {
          return (
            <div className="row d-flex justify-content-end">
              <div className="col-6 border border-warning rounded-pill m-1">
                <label className="">{eachMsg.by} said:</label>{" "}
                <h6 className="">{eachMsg.msg}</h6>
                <label> {eachMsg.time}</label>
              </div>
            </div>
          );
        } else {
          return (
            <div className="row  ">
              <div className="col-6 border border-success rounded-pill m-1">
                <label className="">{eachMsg.by} said:</label>{" "}
                <h6 className="">{eachMsg.msg}</h6>
                <label> {eachMsg.time}</label>
              </div>
            </div>
          );
        }
      })}

      <div className="">
        <form onSubmit={handleSendMsg} className="">
          <input
            onChange={(e) => {
              setNewMsg(e.target.value);
            }}
            value={newMsg}
            type="text"
            className="mt-3 form-control"
          ></input>
          <button className="ml-3 mt-3 btn btn-outline-secondary ">Send</button>
          <button
            onClick={handleClearChat}
            className="ml-2 mt-3 btn btn-outline-secondary"
          >
            Clear Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSession;
