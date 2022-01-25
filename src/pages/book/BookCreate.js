import { useState } from "react";

import FormField from "../../components/forms/FormField";
import Navbar from "../../components/Navbar";
import api from "../../apis/api";

function BookCreate() {
  const [booktData, setBookData] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    picture: new File([], ""),
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files) {
      return setBookData({
        ...booktData,
        [e.target.name]: e.target.files[0],
      });
    }

    setBookData({ ...booktData, [e.target.name]: e.target.value });
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

      const coverImage = await handleFileUpload(booktData.picture);

      const response = await api.post("/book-create", {
        ...booktData,
        coverImage,
      });

      console.log(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <h1>New Book</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="New Book"
          id="productFormName"
          name="title"
          onChange={handleChange}
          value={booktData.title}
          required
          readOnly={loading}
        />

        <FormField
          label="Author"
          id="productFormManufacturer"
          name="author"
          onChange={handleChange}
          value={booktData.author}
          required
          readOnly={loading}
        />

        <FormField
          label="Synopsis"
          id="roductFormName"
          name="price"
          onChange={handleChange}
          value={booktData.synopsis}
          readOnly={loading}
        />

        <FormField
          label="Ano de lançamento"
          id="roductFormName"
          name="year"
          onChange={handleChange}
          value={booktData.releaseYear}
          required
          min="0"
          readOnly={loading}
        />

       

        <FormField
          type="file"
          label="Imagem"
          id="productFormPicture"
          name="picture"
          onChange={handleChange}
          readOnly={loading}
        />

        <div className="mb-3 text-right">
          <button disabled={loading} type="submit" className="btn btn-primary">
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
  );
}

export default BookCreate;
