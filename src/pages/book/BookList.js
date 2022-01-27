import { useState, useEffect } from "react";

import BookCard from "./BookCard";

import api from "../../apis/api";

function BookList() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get("/list-book");

        setBookList([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBook();
  }, []);

  return (
    <div>
      <div className="list-group">
        {bookList.map((currentBookObj) => (
          <BookCard key={currentBookObj._id} {...currentBookObj} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
