export async function processMsg(db, msgOriginal, { $log }) {
  const msg = { ...msgOriginal };
  msg.pathBackup = msg.path;

  if (msg.path?.includes(":")) {
    const [path, prop] = msg.path.split(":");

    if (msg.prop && msg.prop !== prop) {
      throw new Error("Prop provided twice");
    }

    msg.path = path;
    msg.prop = prop;
  }

  if (msg.id?.includes(":")) {
    const [id, prop] = msg.id.split(":");

    if (msg.prop && msg.prop !== prop) {
      throw new Error("Prop provided twice");
    }

    msg.id = id;
    msg.prop = prop;
  }

  if (msg.path && !msg.id) {
    const segments = msg.path.split("/");
    msg.id = segments[segments.length - 1];
    msg.path = segments.slice(0, -1).join("/");
  }

  msg.pathAssumingDoc = msg.path;
  msg.path = await db.getPathById(msg.id);

  if (!msg.path) {
    // $log("msg", JSON.stringify(msg, null, 2));
    msg.path = msg.pathBackup;
    msg.pathNotFound = true;
  }

  if (msg.path) {
    // Remove double slashes
    msg.path = msg.path.replace(/(\/)+/g, "$1");
  }

  if (msg.path && msg.path.endsWith("/")) {
    msg.path = msg.path.substring(0, msg.path.length - 1);
  }

  delete msg.pathBackup;

  // TODO:
  msg.connectionId = "con:1";

  // TODO: Aliases?
  return msg;
}
