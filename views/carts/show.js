const layout = require("../layout");

module.exports = ({ items }) => {
  renderedItems = items
    .map((item) => `<div>${item.product.title} | ${item.product.price}</div>`)
    .join("");
  return layout({ content: `<h1>My Cart Items</h1>${renderedItems}` });
};
