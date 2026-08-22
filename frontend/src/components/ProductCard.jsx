function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <article className="product-card">
      <h2>{product.name}</h2>

      <p className="price">
        ₹{product.price}
      </p>

      <p className="description">
        {product.description ||
          "No description available"}
      </p>

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(product._id)
          }
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductCard;