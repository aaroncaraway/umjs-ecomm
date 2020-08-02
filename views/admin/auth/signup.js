const layout = require("../layout");
module.exports = ({ req }) => {
  return layout({
    content: `<div>
    Your id is: ${req.session.userId}
      <form method='POST'>
        <input name="email" type="email" />
        <input name="password" type="password" />
        <input name="passwordConfirmation" type="password" />
        <button>Submit</button>  
      </form>
      </div>`,
  });
};
