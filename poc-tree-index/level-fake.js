function stream(db, { gte, lt } = {}) {
  const callbacks = {
    data: () => {},
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

function level(path, options) {
  const db = new Map();

  return {
    async put(key, value) {
      db.set(key, value);
    },
    async del(key) {
      db.delete(key);
    },
    async get(key) {
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

module.exports = level;

/*
batch(array: AbstractBatch[], options?: any): Promise<void>;
batch(array: AbstractBatch[], options: any, callback: (err?: any) => any): void;
batch(array: AbstractBatch[], callback: (err?: any) => any): void;
batch(): LevelUpChain;
iterator(options?: AbstractIteratorOptions): Iterator;
isOperational(): boolean;
createReadStream(options?: AbstractIteratorOptions): NodeJS.ReadableStream;
createKeyStream(options?: AbstractIteratorOptions): NodeJS.ReadableStream;
createValueStream(options?: AbstractIteratorOptions): NodeJS.ReadableStream;
on(event: 'put', cb: (key: any, value: any) => void): this;
on(event: 'del', cb: (key: any) => void): this;
on(event: 'batch', cb: (ary: any[]) => void): this;
on(event: 'clear', cb: (opts: any) => void): this;
on(event: 'open' | 'ready' | 'closed' | 'opening' | 'closing', cb: () => void): this;
*/
