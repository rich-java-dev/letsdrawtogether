import "./App.css";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Canvas } from "./components/MainView";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Canvas} />
    </div>
  );
};

export default App;