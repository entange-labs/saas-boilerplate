import { useCallback, useRef, useState } from "react";

type SetStateFn<T> = (prevState?: T) => T;
type SetStateAction<T> = T | SetStateFn<T>;

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}): [T, (nextState: SetStateAction<T>) => void] {
  const isControlled = prop !== undefined;
  const [uncontrolledState, setUncontrolledState] = useState(defaultProp);
  const state = isControlled ? prop : uncontrolledState;
  const stateRef = useRef(state);
  stateRef.current = state;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue: (nextState: SetStateAction<T>) => void = useCallback(
    (nextState) => {
      const value =
        typeof nextState === "function"
          ? (nextState as SetStateFn<T>)(stateRef.current)
          : nextState;

      if (!isControlled) {
        setUncontrolledState(value);
      }

      onChangeRef.current(value);
    },
    [isControlled],
  );

  return [state as T, setValue];
}
