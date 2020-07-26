const fs = require("fs");
const crypto = require("crypto");
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Need filename!");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((id) => id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const updatedRecords = records.filter((record) => record.id !== id);
    await this.writeAll(updatedRecords);
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  //   TESTING CREATE + GET ALL
  //   await repo.create({ email: "catmom@gmail", password: "ilovecats" });
  //   const users = await repo.getAll();
  //   console.log(users);

  //  TESTING GETONE
  //   const user = await repo.getOne("fbdeba1c");
  //   console.log(user);

  //  TESTING DELETE
  await repo.delete("2675571a");
};

test();
