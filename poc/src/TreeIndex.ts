import level from "./utils/levelFake";
import { createReadStreamAsArray } from "./utils/createReadStream";
import { parallel } from "./utils/utils";

export function TreeIndex() {
  const db = level("./storage/db-tree", { valueEncoding: "json" });
  let autoincrement = 0;

  return {
    $debug: db.$debug,
    clear: db.clear.bind(db),

    async set(path, id) {
      path.endsWith("/") || (path += "/");
      path = `${path}${autoincrement}`;
      autoincrement += 1;
      await parallel(db.put(path, id), db.put(id, path));
      return path;
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
      const entries = await createReadStreamAsArray(
        db,
        path,
        path + String.fromCharCode(255)
      );
      return entries.map(({ key, value }) => ({
        path: key.substring(path.length, key.lastIndexOf("/") + 1),
        id: value,
      }));
    },
  };
}
