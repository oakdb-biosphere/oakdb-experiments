export async function execMessage(db, msg, { $log }) {
  let result = null;
  $log("✉️", msg);

  switch (msg.op) {
    case "init": {
      await db.createObject("/articles", "id1", { foo: "bar", baz: "oak" });
      await db.createObject("/articles", "id2", { foo: "qux", baz: "db" });
      await db.createObject("/articles/id1/sub", "id3", { hello: "world" });
      break;
    }

    case "create": {
      if (typeof msg.value !== "object") {
        throw new Error("value must be an object");
      }
      const id = db.uuid(msg.path);
      const [path] = await db.createObject(msg.path, id, msg.value);
      result = { id, path };
      break;
    }

    case "update":
    case "set": {
      if (msg.prop) {
        // msg.path?
        if (msg.pathNotFound) {
          $log("🔵", "createObject due to not found", { ...msg });
          await db.createObject(msg.pathAssumingDoc, msg.id, {
            [msg.prop]: msg.value,
          });
        } else {
          await db.setProp(msg.id, msg.prop, msg.value);
        }
      } else if (msg.value === null) {
        await db.deleteObjectByPath(msg.path + "/" + msg.id);
        // await db.deleteObjectById(msg.id);
      } else {
        if (msg.pathNotFound) {
          await db.createObject(msg.path, msg.id, msg.value);
        } else {
          // else if (msg.op === "update") {
          // TODO: update => merge, set => overwrite
          await db.updateObject(msg.id, msg.value);
          // } else {
          // await db.createObject(msg.path, msg.id, msg.value);
        }
      }
      break;
    }

    case "delete": {
      if (msg.pathNotFound) {
        await db.deleteObjectByPath(msg.path + "/" + msg.id);
      } else {
        await db.deleteObjectById(msg.id);
      }
      break;
    }

    case "subscribe":
    case "query": {
      if (msg.prop) {
        result = await db.getProp(msg.id, msg.prop);
      } else if (msg.pathNotFound) {
        result = await db.getObjectsByPath(msg.path);
      } else {
        result = await db.getObjectById(msg.id);
      }
      if (msg.op === "subscribe") {
        await db.subscribeUserToPath(msg.connectionId, msg.path);
      }
      break;
    }

    case "unsubscribe": {
      await db.unsubscribeUserFromPath(msg.connectionId, msg.path);
      break;
    }

    case "clear": {
      await db.clear();
      break;
    }
  }

  return result;
}
