import { updateTodo } from "api/todos";
import Buttons from "assets/Buttons";
import { StMessage } from "assets/Message";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

function EditCard({ setEditCardMode, card, setCard }) {
    const [content, setContent] = useState(card.desc);
    const [Message, setMessage] = useState(null);
    // message alert position
    const descFocus = useRef();

    // `todos${+id}` 이 왼쪽 키를 가진 쿼리 말고, 오리지널 todos 쿼리에 반영할거임.
    // 그래서 id만 따로 맞춰서 가져온 쿼리는 캐시 무효화 업데이트 안 될거임.
    // 걔는 컴포넌트 state로 관리할 거.
    const queryClient = useQueryClient();
    const mutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });

    const descChangeHandler = (e) => {
        setContent(e.target.value);
    };

    // 취소버튼도 만들어야 함.
    const editCard = () => {
        const renewCard = { ...card, desc: content };
        if (content !== card.desc) {
            if (content.length > 200 || content.trim() === "") {
                setMessage("내용 1자 이상, 200자 이내!");
                descFocus.current.focus();
                return;
            } else {
                // setCard로 그려줄 내용 바꿔줘야 함.
                setCard(renewCard);
                mutation.mutate(renewCard);
            }
        }
        // 바뀐 내용이 없더라도 돌아갈 수는 있어야 함.
        setEditCardMode((state) => !state);
    };

    return (
        <>
            {Message && <StMessage messagePosition="card">{Message}</StMessage>}
            <StTextArea
                ref={descFocus}
                value={content}
                placeholder="내용을 적어주세요."
                onChange={descChangeHandler}
            />
            <StButtonContainer>
                <Buttons
                    size="small"
                    color="blue"
                    bgcolor="white"
                    radius="10"
                    onClick={editCard}
                >
                    저장
                </Buttons>
                <Buttons
                    size="small"
                    color="blue"
                    bgcolor="white"
                    radius="10"
                    onClick={() => setEditCardMode((state) => !state)}
                >
                    취소
                </Buttons>
            </StButtonContainer>
        </>
    );
}

const StTextArea = styled.textarea`
    height: 500px;
    border-radius: 20px;
    padding: 20px;
`;

const StButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    margin-top: 20px;
`;

export default EditCard;
