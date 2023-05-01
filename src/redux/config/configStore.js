import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import todo from "redux/modules/todoSlice";

const store = configureStore({
    reducer: {
        todo,
    },
    enhancers: [composeWithDevTools()],
});

export default store;
