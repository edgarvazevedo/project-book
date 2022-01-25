import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../apis/api";

import ConfirmationModal from "../../components/ConfirmationModal";

function BookDetail() {
  const [BookDetails, setBooktDetails] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    coverImage: "",
    });
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get(`/product/${id}`);

        setBooktDetails({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <div>
      <div className="img-container d-flex justify-content-between">
        <img
          className="img-fluid mh-100"
          src={BookDetails.coverImage}
          alt={BookDetails.title}
        />

        <div>
          <button className="btn btn-warning me-2">Editar</button>
          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Deletar
          </button>
        </div>
      </div>

      <p>
        <strong>Title: </strong>
        {BookDetails.title}
      </p>
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
      <p>
        <strong>IMG: </strong>
        {BookDetails.coverImage}
      </p>

      <ConfirmationModal
        title="Tem certeza?"
        variant="danger"
        confirmationText="Deletar"
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirmation={() => {
          navigate(`/book/delete/${id}`);
          setShowModal(false);
        }}
      >
        Essa ação é irreversível
      </ConfirmationModal>
    </div>
  );
}

export default BookDetail;