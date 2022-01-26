import { useState } from "react";
import { useNavigate } from "react-router-dom";



import FormField from "../../components/forms/FormField";
import Navbar from "../../components/Navbar";
import api from "../../apis/api";

function BookCreate() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    picture: new File([], ""),
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.files) {
      return setBookData({
        ...bookData,
        [e.target.name]: e.target.files[0],
      });
    }

    setBookData({ ...bookData, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();

      uploadData.append("picture", file);

      const response = await api.post("/upload", uploadData);

      console.log(response);

      return response.data.url;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const coverImage = await handleFileUpload(bookData.coverImage);

      const response = await api.post("/book-create", {
        ...bookData,
        coverImage,
      });

      console.log(response);
      setLoading(false);
      navigate("/")
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>New Book</h1>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Title"
            id="productFormName"
            name="title"
            onChange={handleChange}
            value={bookData.title}
            required
            readOnly={loading}
          />

          <FormField
            label="Author"
            id="productFormManufacturer"
            name="author"
            onChange={handleChange}
            value={bookData.author}
            required
            readOnly={loading}
          />

          <FormField
            label="Synopsis"
            id=""
            name="synopsis"
            onChange={handleChange}
            value={bookData.synopsis}
            required
            readOnly={loading}
          />

          <FormField
            label="Ano de lançamento"
            id=""
            name="year"
            type="number"
            onChange={handleChange}
            value={bookData.releaseYear}
            required
            readOnly={loading}
          />

          <FormField
            type="file"
            label="Imagem"
            id=""
            name="picture"
            onChange={handleChange}
            readOnly={loading}
          />

          <div className="mb-3 text-right">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  <span>Carregando...</span>{" "}
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookCreate;
