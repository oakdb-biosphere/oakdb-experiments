import { parallel, collapse } from "./utils/utils";
import { PrimaryStorage } from "./PrimaryStorage";
import { TreeIndex } from "./TreeIndex";

export function DB() {
  const p = PrimaryStorage();
  const t = TreeIndex();
  const callbacks = {};

  return {
    clear() {
      return parallel(p.clear(), t.clear());
    },

    on(event, cb) {
      callbacks[event] = cb;
    },

    $log(...args) {
      callbacks["log"]
        ? callbacks["log"](
            args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg) : arg
              )
              .join(" ")
          )
        : console.log("🟠", ...args);
    },

    async $state() {
      return this.getObjectsByPath("/");
    },

    $debug() {
      return p.$debug
        ? { p: p.$debug(), t: t.$debug(), s: this.$state.bind(this) }
        : {};
    },

    async createObject(path, id, obj) {
      this.$log("createObject", { path, id, obj });
      return parallel(
        t.set(path, id),
        ...Object.keys(obj).map((prop) => {
          p.setProp(id, prop, obj[prop]);
        })
      );
    },

    async updateObject(id, obj) {
      this.$log("updateObject", { id, obj });
      // ???
      return parallel(
        ...Object.keys(obj).map((prop) => {
          p.setProp(id, prop, obj[prop]);
        })
      );
    },

    async deleteObjectByPath(path) {
      this.$log("deleteObjectByPath", { path });
      const id = await t.deleteByPath(path);
      return p.deleteObject(id);
    },

    async deleteObjectById(id) {
      this.$log("deleteObjectById", { id });
      return parallel(t.deleteById(id), p.deleteObject(id));
    },

    async setProp(id, prop, value) {
      this.$log("setProp", { id, prop, value });
      return p.setProp(id, prop, value);
    },

    async getObjectById(id) {
      this.$log("getObjectById", { id });
      return p.getObject(id);
    },

    async getObjectsByPath(path) {
      this.$log("getObjectsByPath", { path });
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
      this.$log("getProp", { id, prop });
      return p.getProp(id, prop);
    },

    async getPathById(id) {
      this.$log("getPathById", { id });
      return t.getById(id);
      // return t.getByPath(path);
    },
  };
}
