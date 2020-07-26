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

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id == id);

    if (!record) {
      throw new Error(`Record with ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

// module.exports = UsersRepository;

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
  //   await repo.delete("2675571a");

  // TESTING UPDATE
  //   await repo.create({ email: "turtlemom@gmail" });
  //   await repo.update("e72f6a67", { password: "iloveturtles" });
  //  TESTING GETONEBY

  const user = await repo.getOneBy({ email: "turtlemom@gmail" });
  console.log(user);
};

test();
