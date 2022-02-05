const { dset } = require("dset");

async function series(...args) {
  for (arg in args) {
    await arg;
  }
}

function parallel(...args) {
  return Promise.all(args);
}

function uuid() {
  return Math.random().toString(16).substring(2);
}

function zip(list) {
  return list.reduce((a, { k, v }) => ((a[k] = v), a), {});
}

function collapse(list) {
  const obj = {};
  for (const { k, v } of list) {
    dset(obj, k.replaceAll("/", "."), v);
  }
  return obj;
}

exports.series = series;
exports.parallel = parallel;
exports.uuid = uuid;
exports.zip = zip;
exports.collapse = collapse;
