import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BookList from "../pages/book/BookList";
import BookDetails from "../pages/book/BookDetail";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import BookCreate from "../pages/book/BookCreate";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import BookDelete from "../pages/book/BookDelete";
import BookEdit from "../pages/book/BookEdit";
import Navbar from "./Navbar";
import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Navbar />
      <Routes>
        <Route
          path="/update-book/:id"
          element={<ProtectedRoute component={BookEdit} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route
          path="/book/create"
          element={<ProtectedRoute component={BookCreate} />}
        />
        <Route
          path="/delete-book/:id"
          element={<ProtectedRoute component={BookDelete} />}
        />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
