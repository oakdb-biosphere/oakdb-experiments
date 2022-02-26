import { dset } from "dset";

export async function series(...args: (Promise<any> | any)[]) {
  for (const arg in args) {
    await arg;
  }
}

export function parallel(...args: (Promise<any> | any)[]) {
  return Promise.all(args);
}

export function uuid() {
  return Math.random().toString(16).substring(2);
}

export function zip(list) {
  return list.reduce((a, { k, v }) => ((a[k] = v), a), {});
}

export function collapse(list: any[]): any {
  const obj = {};
  for (const { k, v } of list) {
    dset(obj, k.replaceAll("/", "."), v);
  }
  return obj;
}
