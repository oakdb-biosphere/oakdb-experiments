const { dset } = require("dset");
const level = require("level");

function createReadStream(db, from, to) {
  console.log("from,to", from, to);

  const returnArray = false;
  const obj = returnArray ? [] : {};
  // const dset = (obj, a, b) => (obj[a] = b);

  return new Promise((resolve, reject) => {
    db.createReadStream({
      gte: from,
      lt: to,
    })
      .on("data", (data) =>
        returnArray
          ? obj.push(data)
          : dset(
              obj,
              data.key.replace(from, "").replaceAll("/", "."),
              data.value
            )
      )
      .on("error", reject)
      .on("close", () => resolve(obj));
    // .on("end", () => {
    //   console.log("[STREAM] Stream ended");
    // });
  });
}

function PrimaryIndex() {
  const db = level("./storage/db-primary", { valueEncoding: "json" });

  return {
    set(path, value) {
      return db.put(path, value);
    },
    get(path) {
      return db.get(path);
    },
    async readObject(path) {
      const obj = createReadStream(db, path, path + String.fromCharCode(255));
      return obj;
    },
  };
}

function SecondaryIndex() {
  const db = level("./storage/db-secondary", { valueEncoding: "json" });
  const indices = [];

  return {
    addIndex(name, path, key) {
      db.put(`/_index/${name}`);
      db.indices.push({ path, key });
    },
    set(idOrPath, obj) {
      indices.forEach(({ path, key }) => {
        if (idOrPath.startsWith(path)) {
          const value = obj[key];
          db.put(`${path}/${value}`, idOrPath);
        }
      });
    },
  };
}

function DB() {
  const p = PrimaryIndex();
  const s = SecondaryIndex();
  const r = () => Math.random().toString(16).substr(2);

  return {
    init() {
      const data = {
        "/": "HELLO", // r(), // ???
        "/obj": "HI1",
        // "/obj/": "HI2",
        "/obj/a": r(),
        "/obj/b": r(),
        "/obj/subobj/x": r(),
        "/obj/subobj/y": r(),
        "/obj/arr/0": r(),
        "/obj/arr/1": r(),
        "/obj/arr/2": r(),
        "/obj/arr/3": r(),
      };
      const pList = Object.keys(data)
        .map((key) => {
          return [p.set(key, data[key]), s.set(key, data[key])];
        })
        .flat();
      return Promise.all(pList);
    },
    readObject: p.readObject,
    addIndex: s.addIndex,
    set(key, value) {
      p.set(key, value);
      s.set(key, value);
    },
  };
}

async function main() {
  const db = DB();
  await db.init();
  const obj = await db.readObject("/obj/");
  console.log(obj);
}

main();
