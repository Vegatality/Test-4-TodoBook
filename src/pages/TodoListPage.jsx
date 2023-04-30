import { deleteTodo, getTodos } from "api/todos";
import { BackIcon, StTrashCan } from "assets/Icons";
import { StScrollOnWrapper } from "components/StBookWrapper";
import { darken, lighten } from "polished";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StListWrapper = styled.div`
    padding: 50px 10px;
`;

const StCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    margin-block: 10px;
`;

const StCardContainer = styled.div`
    border-radius: 10px;
    background-color: white;

    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    cursor: pointer;

    /* 아니면 이거 박스 그림자로 해야겠다 눌리느 것처럼 */
    &:hover {
        background: ${lighten(0.1, "#5292c6")};
    }
    &:active {
        background: ${darken(0.1, "#5292c6")};
    }
`;
const StTitleIconBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

function TodoListPage() {
    const navigate = useNavigate();

    // 나중에 카드 번호에 맞게 디테일 찾아가도록 수정해야 함!!
    const moveToCardDetail = (ele, event) => {
        navigate(`/todocard/${ele.id}`, {
            state: ele,
        });
        event.stopPropagation();
    };

    // 카드 삭제하는 부분에서 event.propagation 해야 함. 카드 안에 쓰레기통도 있어서.
    // 알게된 점: invalidate하면 그 쿼리 Get이 있는 컴포넌트는 바로 업데이트 된다.
    // (지우거나 업데이트 등을 하면 state조작 없이도 알아서 재렌더링 해준다.)

    // 그 쿼리를 이용하여 카드를 하나 뿌려주는 자식 컴포넌트에서 mutation을 할 시 그 쿼리 key를 가진 쿼리가 업데이트가 되지만,
    // 자식 컴포넌트가 이전에 받아서(페이지 넘어갈 때 useLocation state 옵션으로 들고 왔음.) 들고 들어온 쿼리 데이터까지는 업데이트 되지 않는다.
    // (쿼리는 갱신[무효화 업데이트] 됐지만,  자식 컴포넌트는 이전에 들고 들어온 쿼리 값을 기억하여 그대로 가지고 있는 것임)
    // 이 말을 확인할 수 있는 방법은 자식 컴포넌트에서 새로고침을 하면 그제서야 갱신된 쿼리 데이터를 가지고 오는 것을 볼 수 있다.
    // 이 경우에 자식 컴포넌트는 State로 쿼리 데이터를 저장해놓고 State로 자식 컴포넌트 안에서 굴려야 한다.
    // 페이지가 넘어가면서 연결이 끊어진 상태라서 업데이트가 안 되는 것인지 아니면 그냥 props로 받아서 넘어가는 경우에도 업데이트가 안되는 것인지 궁금하다. 실험해보자.
    // 근데 내 예상으로는 자식컴포넌트에서 새로고침하면 화면이 바뀌는 걸 확인했었으니까 연결이 끊어진 건 아닌 듯. 아마 도?
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });
    const removeCardHandler = (id, event) => {
        mutation.mutate(id);
        event.stopPropagation();
    };

    // json 서버에서 리스트 불러오기. 이거 최적화 고려해보자.
    const { isLoading, isError, data } = useQuery("todos", getTodos);
    // const { isLoading, isError, data } = useQuery("todos", getTodos, {
    //     cacheTime: Infinity,
    // });

    // const {isLoading, isError, data} = useQuery(`task${params.id}`, ()=>getTaskById(+params.id))

    if (isLoading) {
        return <h1>로딩중입니다...!</h1>;
    }
    if (isError) {
        return <h1>오류가 발생하였습니다...!</h1>;
    }
    // console.log(isLoading, isError, data);
    return (
        <StScrollOnWrapper scrollOption={data.length}>
            <StListWrapper>
                <BackIcon />
                <StCardWrapper>
                    {data.map((ele) => {
                        return (
                            <StCardContainer
                                key={ele.id}
                                onClick={(event) =>
                                    moveToCardDetail(ele, event)
                                }
                            >
                                <div>
                                    <StTitleIconBox>
                                        <div>{ele.title}</div>
                                        <StTrashCan
                                            onClick={(event) => {
                                                removeCardHandler(
                                                    ele.id,
                                                    event
                                                );
                                            }}
                                        />
                                    </StTitleIconBox>
                                    <div>
                                        <div>작성자 : {ele.user}</div>
                                    </div>
                                </div>
                            </StCardContainer>
                        );
                    })}
                </StCardWrapper>
            </StListWrapper>
        </StScrollOnWrapper>
    );
}

export default TodoListPage;

// 높이 이렇게 줄 수 있음.
// height: calc((100% - 45px) - 48px);
