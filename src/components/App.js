import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Navbar from "./Navbar";
import BookList from "../pages/book/BookList";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookList />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
