import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // ⭐ 여기 total 에서 todos로 수정했음. 나중에 적용하세요 ⭐
    todos: [
        {
            user: "홍길동",
            title: "리액트 공부하기0",
            desc: "리액트 기초를 공부해봅시다.",
            id: 0,
        },
        {
            user: "스파르타",
            title: "리액트 공부하기1",
            desc: "리액트 기초를 공부해봅시다.",
            id: 1,
        },
    ],
    detail: {
        user: "",
        title: "",
        desc: "",
        id: 0,
    },
};

const todosSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addContent: (state, action) => {
            const id = state.total.length
                ? state.total[state.total.length - 1].id + 1
                : 0;
            const { title, desc } = action.payload;
            const newCard = {
                title,
                desc,
                id,
                done: false,
            };
            state.total.push(newCard);
        },
        switchContent: (state, action) => {
            state.total.map((ele) => {
                if (ele.id === action.payload) {
                    ele.done = !ele.done;
                }
            });
        },
        deleteContent: (state, action) => {
            state.total = state.total.filter(
                (ele) => ele.id !== action.payload
            );
        },
        getContent: (state, action) => {
            state.detail = state.total.find((ele) => {
                return ele.id === action.payload;
            });
        },
    },
});

export const { addContent, switchContent, deleteContent, getContent } =
    todosSlice.actions;
export default todosSlice.reducer;
