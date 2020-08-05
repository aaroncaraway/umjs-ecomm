const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);
const Repository = require("./repository");

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();

    const salt = crypto.randomBytes(8).toString("hex");

    const buf = await scrypt(attrs.password, salt, 64);

    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    const [savedHash, salt] = saved.split(".");
    const suppliedHash_asBuf = await scrypt(supplied, salt, 64);

    return savedHash === suppliedHash_asBuf.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
