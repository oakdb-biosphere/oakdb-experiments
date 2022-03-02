import { atom, SetStateAction } from "jotai";
import { splitAtom } from "jotai/utils";
import { initialCode } from "../demo";
import { getOak } from "./oak";

type TCmd = {
  op: string;
  path?: string;
  prop?: string;
  value?: unknown;
};

export const editorTextAtom = atom(initialCode);
export const queryResultAtom = atom({});
export const opLogAtom = atom([]);
export const opAtomsAtom = splitAtom(opLogAtom);
export const stateAtom = atom({});
export const opvMapAtom = atom([]);
export const biMapAtom = atom([]);
export const subTabAtom = atom([]);

function connectAtoms() {
  const setters: Record<string, SetStateAction<any>> = {};

  opLogAtom.onMount = (set) => (setters["setOpLog"] = set);
  opvMapAtom.onMount = (set) => (setters["setOpvMap"] = set);
  biMapAtom.onMount = (set) => (setters["setBiMap"] = set);
  subTabAtom.onMount = (set) => (setters["setSubTab"] = set);
  stateAtom.onMount = (set) => (setters["setState"] = set);
  queryResultAtom.onMount = (set) => (setters["setResult"] = set);

  getOak().on("log", (event) =>
    setters["setOpLog"]((opLog) => [...opLog, event]),
  );

  const sendCmd = async (cmd: TCmd) => {
    const { setOpLog, setBiMap, setOpvMap, setSubTab, setResult, setState } =
      setters;

    setOpLog((oplog) => [...oplog, cmd]);

    const { opvmap, bimap, subtab, state, result } = await getOak().exec(cmd);

    setBiMap(bimap);
    setOpvMap(opvmap);
    setSubTab(subtab);
    setResult(result);
    state().then(setState);

    return result;
  };

  return sendCmd;
}

export const dispatchCmd = connectAtoms();
