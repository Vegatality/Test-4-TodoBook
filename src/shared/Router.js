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

    // enabled(boolean) : 쿼리가 자동으로 실행되지 않게 설정하는 옵션.
    // checkCookie가 존재할 때만 쿼리 요청을 한다는 의미의 코드.
    // !! 를 두 번 써준 이유는 일반 문자type을 boolean 형으로 변환하기 위함임.

    // staleTime 옵션(number|Infinity) : 데이터가 refresh 상태로 유지되는 시간. 해당 시간이 지나면 stale 상태가 된다.
    // default stale은 0이다. fresh 상태에서는 쿼리가 다시 mount 되어도 fetch가 실행되지 않는다.

    // refetchOnWindowFocus: 데이터가 stale 상태일 경우 마운트 시마다 refetch 실행하는 옵션.
    // default는 true
    // 예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 해당한다.
    // 심지어 F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 놀다가 페이지 내부를 다시 클릭했을 때도 이 경우에 해당한다.
    // always 로 설정하면 항상 윈도우 포커싱 될 때 마다 refetch를 실행한다는 의미이다.

    // QueryClient defaultOptions 설정으로 refetch 기능들을 다 false로 꺼버렸을 경우에는 refetch 기능이 실행되지 않는다.
    // 그럴 경우엔 refetchOnWindowFocus 옵션이 실행되게끔 true로 설정하면 된다.
    // fresh 상태인 1분 동안은 아무리 다른 탭을 왔다갔다해도 fetch 요청을 하지 않는다.(이게 제일 좋음)

    // useQuery는 비동기 함수!!!
    const { isLoading, isError, data, error } = useQuery("auth", checkAuth, {
        enabled: !!checkCookie,
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 60 * 1000,
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

    // console.log(data);

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
