/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookLis.css";

function BookList() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/books"
        );
        setBook([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBook();
  }, []);

  return (
    <>
      <>
        <h1 className="mt-5">Bookstore</h1>
        <div className="container pt-5">
          {book.map((currentBook) => {
            return (
              <article key={currentBook._id} className="content">
                <Link to={`/bookdetails/${currentBook._id}`}>
                  <img
                    className="content-img"
                    src={currentBook.image}
                    alt="book"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png";
                    }}
                  />
                </Link>
                <div className="content-text">
                  <Link
                    className="card-title"
                    to={`/giftdetails/${currentBook._id}`}
                  >
                    <h2 className="card-title">{currentBook.title}</h2>
                  </Link>
                  <p className="text-description">
                    Price:
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
