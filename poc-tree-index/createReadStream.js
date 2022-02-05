const { dset } = require("dset");
// A tiny (194B) utility for safely writing deep Object values
// const dset = (obj, a, b) => (obj[a] = b);

function createReadStream(
  db,
  from,
  to,
  { sep = ":", returnArray = false } = {}
) {
  // console.log(`- createReadStream: ${from} - ${to}`);

  const obj = returnArray ? [] : {};
  return new Promise((resolve, reject) => {
    db.createReadStream({
      gte: from,
      lt: to,
    })
      .on("data", (data) =>
        returnArray
          ? obj.push(data)
          : dset(
              obj,
              data.key.replace(from + sep, "").replaceAll("/", "."),
              data.value
            )
      )
      .on("error", reject)
      .on("close", () => resolve(obj));
  });
}

exports.createReadStream = createReadStream;
