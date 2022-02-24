import { PathTableInMemory } from "../pathtab";
import { processSubscriptions, printLn, uuid } from "./helpers";

describe("SubTable", () => {
  global.console = require("console");

  let subtab;
  beforeEach(() => {
    subtab = new PathTableInMemory();
  });

  // ---------------------------------------------------------------------------
  it("Examples 1 (No query options)", () => {
    processSubscriptions(subtab, [
      { path: `/` },
      { path: `/a` },
      { path: `/a/b` },
      { path: `/a/b/c` },
      { path: `/a/d/e` },
    ]);

    printLn();
    subtab.graph.print({ showOptions: false });

    subtab.match("/a/");
    subtab.match("/a/b");
    subtab.match("/a/b/c");
    subtab.match("/a/b/c/d");
    subtab.match("/a/d/f");
    subtab.match("/a/d/e/1");
  });

  // ---------------------------------------------------------------------------
  it.only("Examples 2 (depth option)", () => {
    processSubscriptions(subtab, [
      { cid: "A", path: `/foo` },
      { cid: "B", path: "/foo", depth: 0 },
      { cid: "C", path: "/foo", depth: 3 },
    ]);

    printLn();
    subtab.graph.print({ showOptions: true });

    expect(subtab.match("/foo/")).toEqual(["A", "B", "C"]);
    expect(subtab.match("/foo/x")).toEqual(["A", "C"]);
    expect(subtab.match("/foo/x/a/b/c")).toEqual(["A"]);
  });

  // ---------------------------------------------------------------------------
  it("Examples 3 (Equality and inequality query)", () => {
    processSubscriptions(subtab, [
      { path: "/people/", key: "/eyes/color", value: "blue" },
      {
        op: "subscribe",
        path: "/people/",
        key: "/stats/IQ",
        from: 100,
        to: 150,
      },
    ]);
  });

  // ---------------------------------------------------------------------------
  it("Examples 4 (Offset and limit)", () => {
    processSubscriptions(subtab, [{ path: "/foo/", offset: 20, limit: 10 }]);
  });

  // ---------------------------------------------------------------------------
  it("Examples 5 (Joins)", () => {
    processSubscriptions(subtab, [
      { path: `/authors/${uuid()}`, join: ["author"] },
      { path: `/people/${uuid()}`, join: ["friend", "posts"] },
    ]);
  });

  // ---------------------------------------------------------------------------
  it("Examples 6 (Subkey selectors)", () => {
    processSubscriptions(subtab, [
      {
        op: "subscribe",
        path: "/people/",
        key: "/hobbies/*",
        value: "knitting",
      },
      {
        op: "subscribe",
        path: "/people/",
        key: "/friends/*/name",
        value: "pedro",
      },
      {
        op: "subscribe",
        path: "/people/",
        key: "/friends/*/name",
        value: "pedro",
      },
      {
        op: "subscribe",
        path: "/articles/",
        key: "/authors/*/name",
        value: "pedro",
      },
      { path: "/people/", key: "/hobbies", value: "*ball" },
    ]);
  });
});
