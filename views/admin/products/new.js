const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Create Product</h1>
              <div class="field">
                <label class="label">Product Name</label>
                <input required class="input" placeholder="Product Name" name="productName" />
                <p class="help is-danger">${getError(errors, "productName")}</p>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <input required class="input" placeholder="Price" name="price" />
                <p class="help is-danger">${getError(errors, "price")}</p>
              </div>
              <div class="field">
                <input type="file" name="image" />
              </field>
              <button class="button is-primary">Create Product</button>
            </form>
          </div>
        </div>
      </div>
    `,
  });
};
