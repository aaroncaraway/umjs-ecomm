const fs = require("fs");
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Need filename!");
    }

    this.filename = filename;
    try {
      fs.accessFileSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
}

// const repo = new UsersRepository();
const repo = new UsersRepository("users.json");
