import { useState } from "react";
import { Homepage } from "./components/Homepage";
import { SubmittedDataPage } from "./components/Homepage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/submitted" element={<SubmittedDataPage />}></Route>
        </Routes>
        
      </Router>
    </>
  );
}
