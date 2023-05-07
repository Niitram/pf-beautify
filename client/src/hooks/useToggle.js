import { useState, useCallback } from "react";

const useToggle = (initialToggleValue = false) => {
    const [value, setValue] = useState(initialToggleValue)
    const toggle = useCallback(() => {
        setValue(value => !value)
    }, [])
    return [value, toggle]
}

export default useToggle;
