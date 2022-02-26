function stream(
  db: Map<string, any>,
  { gte, lt }: { gte?: string; lt?: string } = {}
) {
  const callbacks = {
    data: (obj: any) => {},
    error: () => {},
    close: () => {},
    end: () => {},
  };

  setTimeout(() => {
    for (const key of db.keys()) {
      if (key.localeCompare(gte) >= 0 && key.localeCompare(lt) < 0) {
        callbacks?.data({ key, value: db.get(key) });
      }
    }
    callbacks?.close();
    callbacks?.end();
  });

  return {
    on(event, cb) {
      callbacks[event] = cb;
      return this;
    },
  };
}

type TAllowed = string | number | boolean;

function level(path, options) {
  const db = new Map<string, TAllowed>();

  return {
    async put(key: string, value: TAllowed) {
      db.set(key, value);
    },
    async del(key: string) {
      db.delete(key);
    },
    async get(key: string) {
      return db.get(key);
    },
    createReadStream(options) {
      return stream(db, options);
    },
    async clear() {
      db.clear();
    },
    async open() {},
    async close() {},
    isOpen: () => true,
    isClosed: () => true,
    isOperational: () => true,
    // getMany: InferDBGetMany<DB>;
    $debug() {
      return JSON.parse(JSON.stringify([...db.entries()], null, 2));
    },
  };
}

export default level;
