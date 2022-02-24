import { PathTableInMemory } from "./pathtab";

const uuid = () => Math.random().toString(16).substring(2, 6);

// Demo
async function main() {
  console.clear();

  const operations = [
    { op: "subscribe", path: `/` },
    { op: "subscribe", path: `/a` },
    { op: "subscribe", path: `/a/b` },
    { op: "subscribe", path: `/a/b/c` },
    { op: "subscribe", path: `/a/d/e` },
    { op: "set", path: "/a/" },
    { op: "set", path: "/a/b" },
    { op: "set", path: "/a/b/c" },
    { op: "set", path: "/a/b/c/d" },
    { op: "set", path: "/a/d/f" },
    { op: "set", path: "/a/d/e/1" },
  ];

  const subtab = new PathTableInMemory();

  operations.forEach((example) => {
    const { op, path, ...options } = example;
    const connection = { id: uuid() };

    if (op === "subscribe") {
      subtab.add(connection.id, path, options);
    }

    if (op === "set") {
      subtab.match(path);
    }
  });

  console.log("-".repeat(process.stdout.columns));
  subtab.graph.print({ showOptions: true });
  // console.log("subtab", JSON.stringify(subtab.graph, null, 2));
}

main();
