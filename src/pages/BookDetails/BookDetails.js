import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import "./BookDetails.css";



function BookDetails() {
  const [bookData, setBookData] = useState({
    _id: "",
    image: "",
    title: "",
    price: "",
    description: "",
    author: "",
  });
  const params = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/books/${params.id}`
        );
        setBookData({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }

    fetchBook();
  }, [params.id]);

  return (
    <>
      <Navbar />
      <>
        <div className="container">
          <div>
            <section>
              <h1>{bookData.title}</h1>
              <p>by {bookData.author}</p>
              <div>
                <h2 className="about">ABOUT THE BOOK</h2>
                <p className="description-details">{bookData.description}</p>
              </div>
              <img
                className="image-details"
                src={bookData.image}
                alt="book"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png";
                }}
              />
            </section>
          </div>
        </div>
      </>
    </>
  );
}

export default BookDetails;
