import { StBookWrapper } from "components/StBookWrapper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StButton } from "./SetGoalPage";
import { BackIcon } from "assets/Icons";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCard, getTodos, updateTodo } from "api/todos";
import EditCard from "components/EditCard";
import SaveCard from "components/SaveCard";

function TodoCard() {
    const [editCardMode, setEditCardMode] = useState(false);
    // 콜백함수 형태로 두 번째 인자.
    const location = useLocation();
    // const id = location.state.id;
    const data = location.state;

    // todos${+id} 쿼리는 무효화 업데이트 안했음. 싱크 안맞췄다는 뜻. 그래서 이 쿼리는 이전 값 갖고 있음.
    // 근데 나는 location으로 state옵션 사용할 줄 아니까 그냥 처음부터 그걸로 굴릴 껄... 굳이 이거 아이디 찾아서 안불러도 된다.
    // 만약 링크로 여기로 바로 들어올 수도 있는 경우에는 여기서 get을 해줘야 하기 때문에 useQuery를 써야 한다! 넘어온 데이터가 있으면 location의 데이터를 쓰고 아니면 useQuery 쓰도록 설계.
    // const { isLoading, isError, data } = useQuery(`todos${+id}`, () =>
    //     getCard(id)
    // );

    // useState 값 공백으로 시작. 시작부터 useState(data) 해버리면 undefined 할당되어서 useEffect 조건문 통과 못함.
    const [card, setCard] = useState("");

    // useEffect는 렌더링할 때(?) data 값이 변경이 된거면 구문 실행. 조건문 안 적어주면 마지막에 undefined 담긴 채로 넘어갈 수 있음.
    // location으로 넘어온 data는 이미 넘어왔기 때문에 절대 안 바뀜. 그래서 card를 직접 바꿔도 data는 그대로이기 때문에 useEffect 문은 실행 안 함.
    // ⭐ 이말인 즉슨 의존성 배열값에 빈 배열 [] 을 줘도 상관 없다는 뜻~ ⭐
    useEffect(() => {
        if (data) {
            setCard(data);
            // setTitleLength(data.title.length)
            // setGoalLength(data.desc.length)
        }
        // setCard(data);
    }, [data]);

    // if (isLoading) {
    //     return <h1>로딩중입니다...!</h1>;
    // }
    // if (isError) {
    //     return <h1>오류가 발생하였습니다...!</h1>;
    // }

    // 조건문 오류 처리 써주니까 title, desc 읽을 수 있음! 써주기 전에는 안 됐음. undefined 상태라서 그랬나봄.
    // console.log(data);
    // console.log(data["title"]);
    // console.log(data["desc"]);

    return (
        <StBookWrapper>
            <BackIcon />
            <StCardContainer>
                <StTitleContainer>{card.title}</StTitleContainer>
                <StDescButtonContainer>
                    {editCardMode ? (
                        <EditCard
                            card={card}
                            setEditCardMode={setEditCardMode}
                            setCard={setCard}
                        />
                    ) : (
                        <SaveCard
                            card={card}
                            setEditCardMode={setEditCardMode}
                        />
                    )}
                </StDescButtonContainer>
            </StCardContainer>
        </StBookWrapper>
    );
}

const StCardContainer = styled.div`
    padding: 10px;
    /* background-color: green; */
    font-size: xx-large;
    min-height: inherit;
    margin: auto;
`;

const StTitleContainer = styled.div`
    font-size: xx-large;
    font-weight: bolder;
    margin: 30px;
    text-align: center;
    color: white;
`;

const StDescButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* vh 줄까 말까 */
    /* height: 50vh; */
    margin: auto;
`;

export default TodoCard;
