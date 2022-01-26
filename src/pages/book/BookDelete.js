import { useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";

import api from "../../apis/api";

function BookDelete() {
  const { id } = useParams();
  const navigate = useNavigate ();

  useEffect(() => {
    async function deleteBook() {
      try {
        const response = await api.delete(`/delete-book/${id}`);

        console.log("erro", response.data);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
    deleteBook();
  }, [id, navigate ]);

  return <div>Deletando...</div>;
}

export default BookDelete;