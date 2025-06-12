import type { HooksArr } from "../models/Hooks";

import UseStatePage from "../../Components/Examples/basic-state-lifecycle/useState/useState";
import useEffectPage from "../../Components/Examples/basic-state-lifecycle/useEffect/useEffect";
import useRefPage from "../../Components/Examples/basic-state-lifecycle/useRef/useRef";
import useLayoutEffectPage from "../../Components/Examples/basic-state-lifecycle/useLayoutEffect/useLayoutEffect";
import useMemoPage from "../../Components/Examples/data-optimization/useMemo/useMemo";
import useCallbackPage from "../../Components/Examples/data-optimization/useCallback/useCallback";
import useReducerPage from "../../Components/Examples/data-optimization/useReducer/useReducer";
import useTransitionPage from "../../Components/Examples/concurrent-ui/useTransition/useTransition";
import useDeferredValuePage from "../../Components/Examples/concurrent-ui/useDeferredValue/useDeferredValue";
import useImperativeHandlePage from "../../Components/Examples/advanced-utility/useImperativeHandle/useImperativeHandle";
import useIdPage from "../../Components/Examples/advanced-utility/useId/useId";

export const Categories: string[] = [
  "Basic State & Lifecycle",
  "Data Optimization",
  "Concurrent UI",
  "Advanced Utility",
];

export const Hooks: HooksArr[] = [
  { Name: "useState", Category: Categories[0], Component: UseStatePage },
  { Name: "useEffect", Category: Categories[0], Component: useEffectPage },
  { Name: "useRef", Category: Categories[0], Component: useRefPage },
  {
    Name: "useLayoutEffect",
    Category: Categories[0],
    Component: useLayoutEffectPage,
  },
  { Name: "useMemo", Category: Categories[1], Component: useMemoPage },
  { Name: "useCallback", Category: Categories[1], Component: useCallbackPage },
  { Name: "useReducer", Category: Categories[1], Component: useReducerPage },
  {
    Name: "useTransition",
    Category: Categories[2],
    Component: useTransitionPage,
  },
  {
    Name: "useDeferredValue",
    Category: Categories[2],
    Component: useDeferredValuePage,
  },
  {
    Name: "useImperativeHandle",
    Category: Categories[3],
    Component: useImperativeHandlePage,
  },
  { Name: "useId", Category: Categories[3], Component: useIdPage },
];
