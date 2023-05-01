import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import todo from "redux/modules/todoSlice";

const store = configureStore({
    reducer: {
        todo,
    },
    enhancers: composeWithDevTools({
        // 개발 환경에서는 항상 DevTools를 활성화
        // 배포 환경에서는 process.env.NODE_ENV가 'production'인 경우에만 활성화
        shouldCompose: process.env.NODE_ENV !== "production",
    }),
});

export default store;
