const layout = require("../layout");
const { getErrors } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `<div>
    <form method='POST'>
      <input name="email" type="email" />
      ${getErrors(errors, "email")}
      <input name="password" type="password" />
      ${getErrors(errors, "password")}
      <button>Sign in</button>  
    </form>
    </div>`,
  });
};
