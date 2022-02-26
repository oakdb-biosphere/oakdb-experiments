import { useState, useEffect } from "react";
import SplitPane from "react-split-pane";

import { DebugPane } from "./panes/DebugPane";
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
        <div className="boxWithoutScroll">
          <EditorPane isReady={isReady} />
        </div>
        <SplitPane split="vertical" defaultSize={"50%"}>
          <SplitPane split="horizontal" defaultSize={"50%"}>
            <div className="box">
              <OPVMapPane />
            </div>
            <div className="box">
              <BiMapPane />
            </div>
          </SplitPane>
          <SplitPane split="horizontal" defaultSize={"50%"}>
            <SplitPane split="horizontal" defaultSize={"75%"}>
              <div className="box">
                <OpLogPane />
              </div>
              <div className="box">
                <DebugPane isReady={isReady} />
              </div>
            </SplitPane>
            <SplitPane split="horizontal" defaultSize={"50%"}>
              <div className="box">
                <QueryResultPane />
              </div>
              <div className="boxWithoutScroll">
                <StatePane />
              </div>
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </>
  );
}
