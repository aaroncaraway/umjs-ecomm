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
  async getAll() {
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    const data = await JSON.parse(contents);
    return data;
  }
}

// const repo = new UsersRepository();

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.getAll();
};

test();
