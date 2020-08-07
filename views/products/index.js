module.exports = ({ products }) => {
  const renderedProducts = products.map((product) => {
    return `<li>${product.title} | ${product.price}</li>`;
  });
  return renderedProducts.join("");
};
