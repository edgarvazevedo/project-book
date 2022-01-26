import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../../apis/api";
import "./BookDetails.css";
import Navbar from "../../components/Navbar";

function BookDetail() {
  const [BookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    coverImage: "",
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get(`/book/${id}`);

        setBookDetails({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="img-container d-flex justify-content-between">
          <div>
            <button to="/update-book" className="btn btn-warning me-2">
              Editar
            </button>
          </div>
        </div>

        <p>
          <strong>{BookDetails.title}</strong>
        </p>
        <img
          className="image-details"
          src={BookDetails.coverImage}
          alt="cover"
        />
        <p>
          <strong>Authot: </strong>
          {BookDetails.author}
        </p>
        <p>
          <strong>Synopsis: </strong>
          {BookDetails.synopsis}
        </p>
        <p>
          <strong>Ano: </strong>
          {BookDetails.releaseYear}
        </p>
        <p>
          <strong>Genre: </strong>
          {BookDetails.genre}
        </p>
        <Link to={`/delete-book/${BookDetails._id}`}>
          <i class="fas fa-trash-alt">deletar</i>
        </Link>
      </div>
    </div>
  );
}

export default BookDetail;
