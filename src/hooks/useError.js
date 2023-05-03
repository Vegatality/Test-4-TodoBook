import { useState } from "react";

export const useError = (init) => {
    const [isError, setIsError] = useState({
        error: false,
        message: null,
    });

    const setMessage = () => {};
};
