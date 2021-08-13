import { useCallback, useState } from "react";


export const useControlled = function useController({
    controlled,
    defaultState,
}) {
    const [state, setState] = useState(defaultState);
    const isUncontrolled = controlled === undefined || controlled === null;
    const value = isUncontrolled 
        ? state
        : controlled;

    const setStateIfUncontrolled = useCallback((newValue) => {
        isUncontrolled && setState(newValue);
    }, [isUncontrolled]);

    return [value, setStateIfUncontrolled];
}
