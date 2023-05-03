const { useState } = require("react");

const useSignUp = (init) => {
    const [inputs, setInputs] = useState(init);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const onClearHandler = () => {
        setInputs(init);
    };

    return [inputs, onChange, onClearHandler];
};

const useInputs = (initVal) => {
    const [inputs, setInputs] = useState(initVal);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const onClearHandler = () => {
        setInputs(initVal);
    };
    return [inputs, onChange, onClearHandler];
};

export { useSignUp, useInputs };
