import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;
function App() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // INITIAL FETCH
  // =========================================

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================================
  // REFRESH PRODUCTS
  // Create / Update / Delete ke baad
  // =========================================

  const refreshProducts = async () => {
    try {
      const response = await axios.get(API_URL);

      setProducts(response.data);
      setError("");
    } catch (error) {
      console.error("Refresh error:", error);
      setError("Failed to fetch products");
    }
  };

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // =========================================
  // CREATE / UPDATE PRODUCT
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Name and price are required");
      return;
    }

    const productData = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
    };

    try {
      // UPDATE
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          productData
        );

        setEditingId(null);
      }

      // CREATE
      else {
        await axios.post(API_URL, productData);
      }

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
      });

      // Reload products
      await refreshProducts();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  // =========================================
  // DELETE PRODUCT
  // =========================================

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      await refreshProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  // =========================================
  // EDIT PRODUCT
  // =========================================

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // CANCEL EDIT
  // =========================================

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      price: "",
      description: "",
    });
  };

  return (
    <main className="app-container">
      <header className="header">
        <h1>Product Manager</h1>
        <p>Simple MERN Stack CRUD Application</p>
      </header>

      {/* ADD / UPDATE FORM */}

      <section className="form-section">
        <h2>
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="submit-btn"
            >
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* PRODUCTS */}

      <section className="products-section">
        <h2>Products</h2>

        {loading && (
          <p className="message">
            Loading products...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          products.length === 0 && (
            <p className="message">
              No products available.
            </p>
          )}

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;