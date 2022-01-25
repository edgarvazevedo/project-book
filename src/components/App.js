import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import BookList from "../pages/book/BookList";
import BookDetails from "../pages/book/BookDetail";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import BookCreate from "../pages/book/BookCreate";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route path="/book/create" element={<BookCreate />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
