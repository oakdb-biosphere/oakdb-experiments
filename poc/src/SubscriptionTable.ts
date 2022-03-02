import level from "./utils/levelFake";

export function SubscriptionTable() {
  const db = level("./storage/sub-tab", { valueEncoding: "json" });
  // let autoincrement = 0;

  return {
    $debug: db.$debug,
    clear: db.clear.bind(db),

    async subscribe(userId, path) {
      // const userId = `${userId}/${autoincrement}`;
      // autoincrement += 1;
      await db.put(`${path}<-${userId}`, "options");
      return userId;
    },

    async unsubscribe(userId, path) {
      await this.del(`${path}<-${userId}`);
    },

    async match(path) {
      // TODO:
      // const result = this.graph.match(path);
      // console.log("𝝙", path, result);
      // return result;
    },
  };
}
