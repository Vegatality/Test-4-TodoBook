import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetGoalPage from "../pages/SetGoalPage";
import TodoCard from "../pages/TodoCard";
import TodoListPage from "../pages/TodoListPage";
import HeaderArea from "components/HeaderArea";
import BookCover from "pages/BookCover";
import SelectRoute from "pages/SelectRoute";

function Router() {
    return (
        <BrowserRouter>
            <HeaderArea />
            <Routes>
                <Route path="/" element={<BookCover />} />
                <Route path="/category" element={<SelectRoute />} />
                <Route path="/goal" element={<SetGoalPage />} />
                <Route path="/todolist" element={<TodoListPage />} />
                <Route path="/todocard/:id" element={<TodoCard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
