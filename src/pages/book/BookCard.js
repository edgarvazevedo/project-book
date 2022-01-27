import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";

function BookCard(props) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="list-group-item ">
      
      <h1>
        <strong>{props.title}</strong>
      </h1>
      <div class="img-fluid card" style={{ width: "18rem" }}>
        <img
          src={props.coverImage}
          class="card-img-top img-card"
          alt={props.title}
        />
        <div class="card-body">
          <p>
            <strong>{props.author}</strong>
          </p>

          <p>
            <p>{props.releaseYear}</p>
          </p>
          <p>
            <p>{props.genre}</p>
          </p>
        </div>

        <div>
          <div className="me-2">
            <button className="btn btn-primary me-2">
              <Link to={`/bookdetails/${props._id}`}>Details</Link>
            </button>

            <button className="btn btn-info me-2">
              <Link to={`/edit-book/${props._id}`}>Edit</Link>
            </button>

            <button
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>

          <ConfirmationModal
            title="Tem certeza que quer deletar esse livro?"
            variant="danger"
            confirmationText="Deletar"
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirmation={() => {
              navigate(`/delete-book/${props._id}`);
              setShowModal(false);
            }}
          >
            Esta ação é irreversível!
          </ConfirmationModal>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
