import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SetGoalPage from "../pages/SetGoalPage";
import TodoCard from "../pages/TodoCard";
import TodoListPage from "../pages/TodoListPage";
import HeaderArea from "components/HeaderArea";
import BookCover from "pages/BookCover";
import SelectRoute from "pages/SelectRoute";
import LoginPage from "pages/LoginPage";
import { QueryCache, useMutation, useQuery, useQueryClient } from "react-query";
import { checkAuth } from "api/mockData";
import { cookie } from "utils/cookie";
import { useDispatch } from "react-redux";
import { DELETE_TOKEN } from "redux/modules/authSlice";

function Router() {
    const navigate = useNavigate();
    const checkCookie = cookie.get("todos");
    const dispatch = useDispatch();

    // enabled(boolean)
    // 쿼리가 자동으로 실행되지 않게 설정하는 옵션.
    // checkCookie가 존재할 때만 쿼리 요청을 한다는 의미의 코드.
    // !! 를 두 번 써준 이유는 일반 문자type을 boolean 형으로 변환하기 위함임.

    // useQuery는 비동기 함수!!!
    const { isLoading, isError, data, error } = useQuery("auth", checkAuth, {
        enabled: !!checkCookie,
        retry: false,
        refetchOnWindowFocus: true,
        // staleTime: 1 * 1000,
        // refetchOnMount: true,
    });
    const queryClient = useQueryClient();

    if (isLoading) {
        return <h1>인증 중입니다!</h1>;
    }

    // 쿠키가 있는데 에러가 뜨는 경우는 토큰을 조작하거나 토큰 유효시간이 다 됐을 경우임.
    if (checkCookie) {
        if (isError) {
            // isError는 불린을 반환하고
            // error는 에러 메시지를 반환
            alert(error);
            cookie.remove("todos");
            // queryClient.invalidateQueries("auth");
            queryClient.removeQueries("auth");
            dispatch(DELETE_TOKEN());
            navigate("/");
        }
    }

    console.log(data);

    // Route를 감싼다.
    //

    return (
        <>
            <HeaderArea />
            <Routes>
                <Route path="/" element={<BookCover />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/category" element={<SelectRoute />} />
                <Route path="/goal" element={<SetGoalPage />} />
                <Route path="/todolist" element={<TodoListPage />} />
                <Route path="/todocard/:id" element={<TodoCard />} />
            </Routes>
        </>
    );
}

export default Router;
