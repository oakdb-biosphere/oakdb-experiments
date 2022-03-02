import { DB } from "./DB";
import { execMessage } from "./utils/execMessage";
import { processMsg } from "./utils/processMsg";

export default function OakDB() {
  const db = DB();

  db.clear(); // async

  return {
    on(event, cb) {
      db.on(event, cb);
    },
    async exec(msgUnprocessed) {
      const ctx = { $log: db.$log.bind(db) };
      const msg = await processMsg(db, msgUnprocessed, ctx);
      const result = await execMessage(db, msg, ctx);
      const { p: opvmap, t: bimap, s: state, u: subtab } = db.$debug();
      return { opvmap, bimap, subtab, state, result };
    },
  };
}
