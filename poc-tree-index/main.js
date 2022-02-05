// const level = require("level");
const level = require("./level-fake");
const { createReadStream } = require("./createReadStream");
const { series, parallel, zip, collapse } = require("./utils");

// PrimaryStorage
function PrimaryStorage() {
  const db = level("./storage/db-primary", { valueEncoding: "json" });

  return {
    $debug: db.$debug,
    clear: db.clear.bind(db),
    setProp(objectId, prop, value) {
      return db.put(`${objectId}:${prop}`, value);
    },
    getProp(objectId, prop) {
      return db.get(`${objectId}:${prop}`);
    },
    updateObject(objectId, object) {
      return parallel(
        ...Object.keys(object).map((prop) =>
          db.put(`${objectId}:${prop}`, value)
        )
      );
    },
    setObject(objectId, object) {
      return series(
        this.deleteObject(objectId),
        parallel(
          ...Object.keys(object).map((prop) =>
            db.put(`${objectId}:${prop}`, value)
          )
        )
      );
    },
    async deleteObject(objectId) {
      // TODO: use stream
      const object = await this.getObject(objectId);
      return parallel(
        ...Object.keys(object).map((prop) => db.del(`${objectId}:${prop}`))
      );
    },
    getObject(objectId) {
      return createReadStream(
        db,
        objectId,
        objectId + String.fromCharCode(255),
        { sep: ":", returnArray: false }
      );
    },
  };
}

// TreeIndex
function TreeIndex() {
  const db = level("./storage/db-tree", { valueEncoding: "json" });
  let autoincrement = 0;

  return {
    $debug: db.$debug,
    clear: db.clear.bind(db),
    set(path, id) {
      autoincrement += 1;
      path.endsWith("/") || (path += "/");
      path = `${path}${autoincrement}`;
      return parallel(db.put(path, id), db.put(id, path));
    },
    async deleteByPath(path) {
      const id = await this.getByPath(path);
      await parallel(db.del(id), db.del(path));
      return id;
    },
    async deleteById(id) {
      const path = await this.getById(id);
      await parallel(db.del(id), db.del(path));
      return path;
    },
    getByPath(path) {
      return db.get(path);
    },
    getById(id) {
      return db.get(id);
    },
    async getObjectIdsAtPath(path) {
      const entries = await createReadStream(
        db,
        path,
        path + String.fromCharCode(255),
        { sep: "", returnArray: true }
      );
      return entries.map(({ key, value }) => ({
        path: key.substring(path.length, key.lastIndexOf("/") + 1),
        id: value,
      }));
    },
  };
}

// DB
function DB() {
  const p = PrimaryStorage();
  const t = TreeIndex();

  return {
    clear() {
      return parallel(p.clear(), t.clear());
    },
    $debug() {
      return p.$debug ? { p: p.$debug(), t: t.$debug() } : {};
    },
    async createObject(path, id, obj) {
      return parallel(
        t.set(path, id),
        ...Object.keys(obj).map((prop) => {
          p.setProp(id, prop, obj[prop]);
        })
      );
    },
    async updateObject(id, obj) {
      return parallel(
        ...Object.keys(obj).map((prop) => {
          p.setProp(id, prop, obj[prop]);
        })
      );
    },
    async deleteObjectByPath(path) {
      const id = await t.deleteByPath(path);
      return p.deleteObject(id);
    },
    async deleteObjectById(id) {
      return parallel(t.deleteById(id), p.deleteObject(id));
    },
    async setProp(id, prop, value) {
      return p.setProp(id, prop, value);
    },
    async getObjectById(id) {
      return p.getObject(id);
    },
    async getObjectsByPath(path) {
      const ids = await t.getObjectIdsAtPath(path);

      return collapse(
        await parallel(
          ...ids.map(async ({ path, id }) => ({
            k: `${path}${id}`,
            v: await p.getObject(id),
          }))
        )
      );
    },
    async getProp(id, prop) {
      return p.getProp(id, prop);
    },
  };
}

// Demo
async function main() {
  const db = DB();
  await db.clear();
  await db.createObject("/articles/", "id1", { foo: "bar", baz: "oak" });
  await db.createObject("/articles/", "id2", { foo: "qux", baz: "db" });
  await db.createObject("/articles/id1/sub/", "id3", { hello: "world" });

  const obj = await db.getObjectById("id1");
  console.log("▶️ obj:", obj);

  const list = await db.getObjectsByPath("/articles/");
  console.log("▶️ list:", list);

  db.setProp("id1", "baz", "OAK!");
  const prop = await db.getProp("id1", "baz");
  console.log("▶️ prop:", prop);

  // console.log("-".repeat(process.stdout.columns));
  // console.log("db.$debug", db.$debug());

  await db.deleteObjectById("id1");
  // await db.deleteObjectByPath("/articles/1");
  db.updateObject("id2", { foo: "vvv", baz: "uuu" });

  console.log("-".repeat(process.stdout.columns));
  console.log("db.$debug", db.$debug());
}

main();
