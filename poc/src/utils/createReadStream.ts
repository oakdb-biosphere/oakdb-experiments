import { dset } from "dset";

// dset: A tiny (194B) utility for safely writing deep Object values
// const dset = (obj, a, b) => (obj[a] = b);

export function createReadStreamAsObj<T>(
  db,
  from: string | number,
  to: string | number,
  { sep = ":" }
): Promise<Record<string, T>> {
  const obj: Record<string, T> = {};
  return new Promise((resolve, reject) => {
    db.createReadStream({
      gte: from,
      lt: to,
    })
      .on("data", (data: { key: string; value: any }) =>
        dset(
          obj,
          data.key.replace(from + sep, "").replaceAll(/[\/:]/g, "."),
          data.value
        )
      )
      .on("error", reject)
      .on("close", () => resolve(obj));
  });
}

export function createReadStreamAsArray<T>(
  db,
  from: string | number,
  to: string | number
): Promise<T[]> {
  const obj: T[] = [];
  return new Promise((resolve, reject) => {
    db.createReadStream({
      gte: from,
      lt: to,
    })
      .on("data", (data: T) => obj.push(data))
      .on("error", reject)
      .on("close", () => resolve(obj));
  });
}

export default createReadStreamAsObj;
