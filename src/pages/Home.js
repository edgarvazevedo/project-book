import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import imagebook from "../assets/ugur-akdemir-XT-o5O458as-unsplash.jpg";
import "./Home.css";
import Navbar from "../components/Navbar";

function Home() {
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
    <div>
      <Navbar />
      <img className="img-home" src={imagebook} alt="..." />
      <h1 className="pt-3 pb-3">Most Viewed Books</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 ms-1 me-1">
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
                <p1 className="fw-light">{currentBook.title}</p1>
                <p>{currentBook.author}</p>
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
    </div>
  );
}

export default Home;
