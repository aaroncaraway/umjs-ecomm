const layout = require("../layout");
const { getErrors } = require("../../helpers");

module.exports = ({ req, errors }) => {
  return layout({
    content: `<div>
    Your id is: ${req.session.userId}
      <form method='POST'>
        <input name="email" type="email" />
        ${getErrors(errors, "email")}
        <input name="password" type="password" />
        ${getErrors(errors, "password")}
        <input name="passwordConfirmation" type="password" />
        ${getErrors(errors, "passwordConfirmation")}
        <button>Submit</button>  
      </form>
      </div>`,
  });
};
