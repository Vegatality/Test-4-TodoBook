import { configureStore } from "@reduxjs/toolkit";
import todo from "redux/modules/todoSlice";

const store = configureStore({
    reducer: {
        todo,
    },
});

export default store;
