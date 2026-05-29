import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeUpload from "./pages/ResumeUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/upload" element={<ResumeUpload />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;