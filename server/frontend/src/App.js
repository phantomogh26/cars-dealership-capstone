import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealer/Dealer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PostReview from "./components/PostReview/PostReview";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dealers />} />
        <Route path="/dealers/:state" element={<Dealers />} />
        <Route path="/dealer/:id" element={<Dealer />} />
        <Route path="/postreview/:id" element={<PostReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;