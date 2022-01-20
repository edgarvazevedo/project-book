import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";



function BookDetails() {
  
  
  const [bookData, setBookData] = useState({
    _id: "",
    image: "",
    title: "",
    price: "",
    description: "",
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
    
        <>
          
          <main className="mt-5 gift-container">
            

            <section
              className="mt-5 d-flex align-items-center flex-column"
              id="gift-detail"
            >
              <img src={bookData.imageUrl} alt="gift" onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png"}}/>
              <h2 className="mt-4">{bookData.title}</h2>
              <p className="mt-4 gift-text-description">
                {bookData.description}
              </p>
            </section>

            <hr />

            <section id="supplies-container">
              <h3>Supplies</h3>
              <ul>
                {bookData.supplies.map((currentSupply, index) => {
                  return (
                    <li key={index} className="mt-4 text-description">
                      {currentSupply}
                    </li>
                  );
                })}
              </ul>
            </section>

            <hr />

            <section className="mb-5" id="instructions-container">
              <h3>Instructions</h3>
              <ol>
                {bookData.instructions.map((currentInstruction, index) => {
                  return (
                    <li key={index} className="mt-4 text-description">
                      {currentInstruction}
                    </li>
                  );
                })}
              </ol>
            </section>
          </main>
        </>
      
    </>
  );
}

export default BookDetails;