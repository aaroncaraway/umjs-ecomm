const layout = require("../layout");
module.exports = () => {
  return layout({
    content: `<div>
    <form method='POST'>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button>Sign in</button>  
    </form>
    </div>`,
  });
};
