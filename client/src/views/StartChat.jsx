// import React, { useState, useEffect } from "react";
// import { Redirect, Router, Link, navigate } from "@reach/router";

import React, { useState } from "react";
import { navigate } from "@reach/router";

const StartChat = (props) => {
  const [chatName, setChatName] = useState("");

  const handleStartChat = (e) => {
    e.preventDefault();
    navigate("/chatsession/" + chatName);
  };

  return (
    <div>
      <h3 className="mt-5">Socket Chat App</h3>
      <div className="mt-4">
        <h6>Please Enter your Chat Name: </h6>
        <form onSubmit={handleStartChat}>
          <div className="mt-2 mb-2">
            <input
              onChange={(e) => setChatName(e.target.value)}
              className="form-control w-50 mx-auto"
              type="text"
            ></input>
            <button className="mt-3 btn btn-outline-success">
              Start Chatting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartChat;
