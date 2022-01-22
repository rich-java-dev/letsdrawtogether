import "./App.css";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Canvas } from "./components/MainView";
import { MenuBar } from "./components/MenuBar";
import About from "./components/About";

const App = () => {
  return (
    <div className="App">
      <MenuBar />
      <Route path="/about" component={About} />
      <Route exact path="/" component={Canvas} />
      <Route path="/room/:roomId" component={Canvas} />
    </div>
  );
};

export default App;
