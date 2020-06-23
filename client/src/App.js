import React from "react";
import "./App.css";
import { Redirect, Router } from "@reach/router";
import StartChat from "./views/StartChat";
import ChatSession from "./views/ChatSession";

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/startchat" noThrow="true" />
        <StartChat path="/startchat" />
        <ChatSession path="/chatsession/:chatName" />
      </Router>
    </div>
  );
}

export default App;
