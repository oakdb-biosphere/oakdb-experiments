import { processMsg } from "../src/utils/processMsg";
import messages from "./__fixture__/messages";

describe("processMsg", () => {
  const mockDb = {
    getPathById(id) {
      if (id === "uuid" || id === "<uuid>" || id === "foo")
        return "/path/to/docs/";
      else return null;
    },
  };

  const messagesAfterTransformation = [];

  const title = (msg, index) =>
    [
      `[${index}]`,
      `${msg.op}`,
      `${msg.path || msg.id || "<no-path-or-id>"}:${msg.prop || "*"}`,
    ].join(" ");

  describe("Messages", () => {
    messages.forEach((msg, index) => {
      it(title(msg, index), async () => {
        const messageTransformed = await processMsg(mockDb, msg, {
          $log: () => {},
        });
        expect(typeof messageTransformed).toBe("object");
        expect(messageTransformed.op).toBe(msg.op);
        if (!messageTransformed.pathNotFound) {
          expect(messageTransformed.path).toBeDefined();
          expect(typeof messageTransformed.path).toBe("string");
        }
        expect(messageTransformed.path).not.toMatch(/(\/){2,}/g);
        expect(messageTransformed.id).toBeDefined();
        messagesAfterTransformation.push(messageTransformed);
      });
    });
  });

  it("Check all (snapshot)", () => {
    // console.log(JSON.stringify(messagesAfterTransformation, null, 2));
    expect(messagesAfterTransformation).toMatchSnapshot();
  });
});
