import level from "./utils/levelFake";
import { createReadStreamAsObj } from "./utils/createReadStream";
import { series, parallel } from "./utils/utils";

export function PrimaryStorage() {
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
          db.put(`${objectId}:${prop}`, object[prop])
        )
      );
    },

    setObject(objectId, object) {
      return series(
        this.deleteObject(objectId),
        parallel(
          ...Object.keys(object).map((prop) =>
            db.put(`${objectId}:${prop}`, object[prop])
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

    async getObject(objectId) {
      return createReadStreamAsObj(
        db,
        objectId,
        objectId + String.fromCharCode(255),
        { sep: ":" }
      );
    },
  };
}
