import React, { useState } from "react";

export const useInput = (init) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
        const { name, value } = e.target;
        setValue((pre) => ({ ...pre, [name]: value }));
    };

    const onClearHandle = () => {
        setValue(init);
    };

    return [value, onChange, onClearHandle];
};
