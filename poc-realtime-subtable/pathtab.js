// TODO: Use levelDB
// export class PathTableLevelDB extends PathTableInMemory {}

import chalk from "chalk";

export class PathGraphNode {
  static Label = Symbol("label");
  constructor(label = "?") {
    this[PathGraphNode.Label] = label;
  }

  edges = {};
  subscribers = {};
}

export class PathGraph {
  constructor() {
    this.root = new PathGraphNode("root");
  }

  static pathStringToSegments(path) {
    return path.split("/").filter((s) => s);
  }

  add(path, id, queryParams) {
    const segments = PathGraph.pathStringToSegments(path);

    let node = this.root;
    let depth = 0;
    for (const segment of segments) {
      depth += 1;
      if (!node.edges[segment]) {
        node.edges[segment] = new PathGraphNode(segment);
      }
      node = node.edges[segment];
    }

    // console.log("target node", path, "->", node);

    node.subscribers = node.subscribers || {};
    node.subscribers[id] = {
      ...queryParams,
      depthAbs:
        (queryParams.depth === undefined ? 100 : queryParams.depth) + depth,
    };
  }

  checkQueryParams(clientId, queryParams, operation, depth) {
    // console.log("::checkQueryParams", clientId, queryParams, operation);
    // if (depth > queryParams.depthAbs) {
    //   return false;
    // }
    return true;
  }

  match(path, operation = null) {
    const segments = PathGraph.pathStringToSegments(path);
    const matches = [...Object.keys(this.root.subscribers)];

    let node = this.root;
    let depth = 0;
    for (const segment of segments) {
      depth += 1;
      if (node.edges[segment]) {
        node = node.edges[segment];
        Object.keys(node.subscribers)
          .filter((id) =>
            this.checkQueryParams(id, node.subscribers[id], operation)
          )
          .forEach((id) => {
            matches.push([id, depth, node.subscribers[id].depthAbs]);
          });
      } else {
        // break;
      }
    }
    // console.log("matches", depth, matches);

    return matches.filter(([_1, _2, abs]) => abs >= depth).map(([id]) => id);
  }

  print({ showOptions = false } = {}) {
    const printRecursive = (node, depth = 0) => {
      const tabs = "  ".repeat(depth);
      const label = chalk.bold(node[PathGraphNode.Label]);
      const info = showOptions
        ? JSON.stringify(node.subscribers)
        : JSON.stringify(Object.keys(node.subscribers));
      const treesymbol = chalk.grey("⌙ "); // ⌊⎿⌙⌞

      console.log(`${tabs}${treesymbol}${label}: ${info}`);

      Object.values(node.edges).forEach((edge) => {
        printRecursive(edge, depth + 1);
      });
    };

    printRecursive(this.root);
    console.log("");
  }
}

export class PathTableInMemory {
  // private  graph: PathGraph;

  constructor() {
    this.graph = new PathGraph();
  }

  add(connection, path, options) {
    // TODO: Ignore subscriptions that are redundant?
    console.log("➕add", connection, "@", chalk.bold(path), { ...options });
    this.graph.add(path, connection, { ...options });
  }

  remove(connection, path, options) {}

  match(path, options) {
    const result = this.graph.match(path);
    console.log("𝝙", path, result);
    return result;
  }

  update(path, options) {
    console.log("update", { path, options });
  }

  heartbeat() {}
  garbageCollect() {}
  save() {} // write
  load() {} // read
}

// export class SubscriptionTable extends PathTab {
//   // setHandler(handler) {
//   //   this._handler = handler;
//   // }
//   addSubscription(path, user, options) {}
//   remSubscription(path, user, options) {}
//   notifySubscribers(mutation, cb) {
//     cb(row, mutation);
//   }
//   match(path, recursive, query) {}
// }
