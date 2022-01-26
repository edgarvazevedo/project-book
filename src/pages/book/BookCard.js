import { Link } from "react-router-dom";
import "./BookDetails.css";

function BookCard(props) {
  return (
    <Link
      to={`/bookdetails/${props._id}`}
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
        <div className="img-container d-flex justify-content-between">
        <div className="container">
        <p>
          <strong>{props.title}</strong>
          
        </p>
        <img  className="image-details" src={props.coverImage} alt="cover"/>
        <p>
          <strong>Authot: </strong>
          {props.author}
        </p>
        <p>
          <strong>Synopsis: </strong>
          {props.synopsis}
        </p>
        <p>
          <strong>Ano: </strong>
          {props.releaseYear}
        </p>
        <p>
          <strong>Genre: </strong>
          {props.genre}
        </p>
      </div>
        </div>
      
    </Link>
  );
}

export default BookCard;
