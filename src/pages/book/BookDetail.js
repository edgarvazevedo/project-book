import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BookDetails.css";
import api from "../../apis/api";

import ConfirmationModal from "../../components/ConfirmationModal";

function BookDetail() {
  const [bookDetail, setBookDetail] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: "",
    genre: "",
    coverImage: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get(`/detail-book/${id}`);

        setBookDetail({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <div className="container">
      <div className=" d-flex justify-content-between"></div>

      <div>
        <div className="description-details">
          <h1>
            <strong>{bookDetail.title}</strong>
          </h1>
          <p>
            <strong>{bookDetail.author} </strong>
          </p>
          <p>
            <strong>{bookDetail.releaseYear}</strong>
          </p>
          <p>
            <strong>{bookDetail.synopsis}</strong>
          </p>
          <p>
            <strong> {bookDetail.genre}</strong>
          </p>
        </div>

        <div className="img-fluid mt-5">
          <img
            className="image-details"
            alt={bookDetail.title}
            src={bookDetail.coverImage}
          />
        </div>

        <div className="pt-5">
          <Link
            to={`/update-book/${id}`}
            type="button"
            className="btn btn-warning mr-3 me-5"
          >
            Editar
          </Link>
          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Deletar
          </button>
        </div>

        <ConfirmationModal
          title="Tem certeza que quer deletar?"
          variant="danger"
          confirmationText="Deletar"
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirmation={() => {
            navigate(`/delete-book/${id}`);
            setShowModal(false);
          }}
        >
          Esta ação é irreversível!
        </ConfirmationModal>
      </div>
    </div>
  );
}

export default BookDetail;
