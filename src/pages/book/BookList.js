/* eslint-disable jsx-a11y/img-redundant-alt */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookLis.css";
import NavbarBooks from "../../components/NavbarBooks";

import api from "../../apis/api"

function BookList() {
  const [book, setBook] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get(`/book-create/${id}`);
        setBook([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <>
      <NavbarBooks />
      <>
        <h1 className="mt-5">Bookstore</h1>
        <div className="container pt-5">
          {book.map((currentBook) => {
            return (
              <article key={currentBook._id} className="content-list">
                <Link to={`/bookdetails/${currentBook._id}`}>
                  <img
                    className="content-img-list"
                    src={currentBook.title}
                    alt="book"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png";
                    }}
                  />
                </Link>
                <div className="content-text-list">
                  <p1 className="card-title">{currentBook.title}</p1>
                  <p>
                    {currentBook.price.toLocaleString("pt-PT", {
                      currency: "EUR",
                      style: "currency",
                    })}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </>
    </>
  );
}

export default BookList;
