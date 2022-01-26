import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import api from "../../apis/api";

import { useParams } from "react-router-dom";

function BookEdit() {
    const [BookEdit, setBookEdit] = useState({
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
  
          setBookEdit({ ...response.data });
        } catch (err) {
          console.error(err);
        }
      }
      fetchBook();
    }, [id]);

  
  

  return (
    <div>
      <h1>eeeee</h1>

      <div className="container">
        <div className="img-container d-flex justify-content-between">
          <img
            className="img-fluid mh-100"
            src={BookEdit.coverImage}
            alt={BookEdit.title}
          />

          <div>
            <button className="btn btn-warning me-2">Editar</button>
          </div>
        </div>

        <p>
          <strong>Title: </strong>
          {BookEdit.title}
        </p>
        <p>
          <strong>Authot: </strong>
          {BookEdit.author}
        </p>
        <p>
          <strong>Synopsis: </strong>
          {BookEdit.synopsis}
        </p>
        <p>
          <strong>Ano: </strong>
          {BookEdit.releaseYear}
        </p>
        <p>
          <strong>Genre: </strong>
          {BookEdit.genre}
        </p>
        <p>
          <strong>IMG: </strong>
          {BookEdit.coverImage}
        </p>
        <Link to={`/delete-book/${BookEdit._id}`}>
          <i class="fas fa-trash-alt">deletar</i>
        </Link>
      </div>
    </div>
      
    
  );

}
export default BookEdit;