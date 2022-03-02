import { useState, useEffect } from "react";
import SplitPane from "react-split-pane";

import { DebugPane } from "./panes/DebugPane";
import { SubscriptionTabPane } from "./panes/SubscriptionTabPane";
import { StatePane } from "./panes/StatePane";
import { OpLogPane } from "./panes/OpLogPane";
import { QueryResultPane } from "./panes/QueryResultPane";
import { OPVMapPane } from "./panes/OPVMapPane";
import { BiMapPane } from "./panes/BiMapPane";
import { EditorPane } from "./panes/EditorPane";

export default function App() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <SplitPane split="vertical" defaultSize="33%" primary="first">
        <SplitPane split="horizontal" defaultSize={"85%"}>
          <div className="boxWithoutScroll">
            <EditorPane isReady={isReady} />
          </div>
          <div className="box">
            <QueryResultPane />
          </div>
        </SplitPane>
        <SplitPane split="vertical" defaultSize={"50%"}>
          <SplitPane split="horizontal" defaultSize={"80%"}>
            <SplitPane split="horizontal" defaultSize={"50%"}>
              <div className="box">
                <OPVMapPane />
              </div>
              <div className="box">
                <BiMapPane />
              </div>
            </SplitPane>
            <div className="boxWithoutScroll">
              <SubscriptionTabPane />
            </div>
          </SplitPane>
          <SplitPane split="horizontal" defaultSize={"50%"}>
            <div className="box">
              <OpLogPane />
            </div>
            <div className="box">
              <StatePane />
            </div>
            {/* <SplitPane split="horizontal" defaultSize={"50%"}>
              <div className="boxWithoutScroll">
                <DebugPane isReady={isReady} />
              </div>
            </SplitPane> */}
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </>
  );
}
