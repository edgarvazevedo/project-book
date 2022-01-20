import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import BookList from "../pages/book/BookList";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/auth/Login";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
