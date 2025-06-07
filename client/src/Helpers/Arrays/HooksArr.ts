import type { HooksArr } from "../models/Hooks";

import UseState from "../../Components/Examples/basic-state-lifecycle/useState/useState";
import useEffect from "../../Components/Examples/basic-state-lifecycle/useEffect/useEffect";
import useRef from "../../Components/Examples/basic-state-lifecycle/useRef/useRef";
import useLayoutEffect from "../../Components/Examples/basic-state-lifecycle/useLayoutEffect/useLayoutEffect";
import useMemo from "../../Components/Examples/data-optimization/useMemo/useMemo";
import useCallback from "../../Components/Examples/data-optimization/useCallback/useCallback";
import useReducer from "../../Components/Examples/data-optimization/useReducer/useReducer";
import useTransition from "../../Components/Examples/concurrent-ui/useTransition/useTransition";
import useDeferredValue from "../../Components/Examples/concurrent-ui/useDeferredValue/useDeferredValue";
import useDebugValue from "../../Components/Examples/advanced-utility/useDebugValue/useDebugValue";
import useImperativeHandle from "../../Components/Examples/advanced-utility/useImperativeHandle/useImperativeHandle";
import useId from "../../Components/Examples/advanced-utility/useId/useId";

export const Categories: string[] = [
  "Basic State & Lifecycle",
  "Data Optimization",
  "Concurrent UI",
  "Advanced Utility",
];

export const Hooks: HooksArr[] = [
  { Name: "useState", Category: Categories[0], Component: UseState },
  { Name: "useEffect", Category: Categories[0], Component: useEffect },
  { Name: "useRef", Category: Categories[0], Component: useRef },
  {
    Name: "useLayoutEffect",
    Category: Categories[0],
    Component: useLayoutEffect,
  },
  { Name: "useMemo", Category: Categories[1], Component: useMemo },
  { Name: "useCallback", Category: Categories[1], Component: useCallback },
  { Name: "useReducer", Category: Categories[1], Component: useReducer },
  { Name: "useTransition", Category: Categories[2], Component: useTransition },
  {
    Name: "useDeferredValue",
    Category: Categories[2],
    Component: useDeferredValue,
  },
  { Name: "useDebugValue", Category: Categories[3], Component: useDebugValue },
  {
    Name: "useImperativeHandle",
    Category: Categories[3],
    Component: useImperativeHandle,
  },
  { Name: "useId", Category: Categories[3], Component: useId },
];
