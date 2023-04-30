import { addTodo } from "api/todos";
import Buttons from "assets/Buttons";
import { BackIcon } from "assets/Icons";
import { StMessage } from "assets/Message";
import { StBookWrapper } from "components/StBookWrapper";
// import useValidate from "hooks/useValidate";
import { darken, lighten } from "polished";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";

function SetGoalPage() {
    // id는 db.json에서 알아서 안겹치게 생성해주는 듯.
    const [inputs, setInputs] = useState({
        user: "",
        title: "",
        desc: "",
        errorMessage: null,
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(addTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });

    // message alert position
    const [messagePosition, setMessagePosition] = useState("");

    // focus input after submit validation
    const userFocus = useRef();
    const titleFocus = useRef();
    const descFocus = useRef();

    // input logic
    const { user, title, desc, errorMessage } = inputs;
    const onChangeHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // success message
    // const [success, setSuccess] = useState(null);

    // submit validation check
    const onSubmitHandler = (e) => {
        if (user.length > 5 || user.trim() === "") {
            setInputs({
                ...inputs,
                errorMessage: "작성자 이름 1자 이상, 5자 이내!",
            });
            userFocus.current.focus();
            setMessagePosition("user");
        } else if (title.length > 50 || title.trim() === "") {
            setInputs({ ...inputs, errorMessage: "제목 1자 이상, 50자 이내!" });
            titleFocus.current.focus();
            setMessagePosition("title");
        } else if (desc.length > 200 || desc.trim() === "") {
            setInputs({
                ...inputs,
                errorMessage: "내용 1자 이상, 200자 이내!",
            });
            descFocus.current.focus();
            setMessagePosition("desc");
        } else {
            mutation.mutate({ user, title, desc });
            setInputs({
                user: "",
                title: "",
                desc: "",
                errorMessage: "저장완료!",
            });
            setMessagePosition("success");
            setTimeout(() => {
                setInputs((state) => ({ ...state, errorMessage: null }));
                // 얘는 굳이 없어도 될 듯.
                // setMessagePosition(() => "");
            }, 2000);
        }
        e.preventDefault();
    };

    return (
        <StBookWrapper>
            <BackIcon />
            {errorMessage && (
                <StMessage messagePosition={messagePosition}>
                    {errorMessage}
                </StMessage>
            )}
            <StForm onSubmit={onSubmitHandler}>
                <StLabel>작성자</StLabel>
                <StInput
                    ref={userFocus}
                    placeholder="작성자의 이름을 입력해주세요.(5자 이내)"
                    name="user"
                    value={user}
                    onChange={onChangeHandler}
                />
                <StLabel>제목</StLabel>
                <StInput
                    ref={titleFocus}
                    placeholder="제목을 입력해주세요.(50자 이내)"
                    name="title"
                    value={title}
                    onChange={onChangeHandler}
                />
                <StLabel>내용</StLabel>
                <StTextArea
                    ref={descFocus}
                    placeholder="내용을 입력해주세요.(200자 이내)"
                    name="desc"
                    value={desc}
                    onChange={onChangeHandler}
                />
                <Buttons
                    color="blue"
                    bgColor="white"
                    size="medium"
                    radius="10"
                    position
                    type="submit"
                >
                    추가하기
                </Buttons>
            </StForm>
        </StBookWrapper>
    );
}

const StForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 24px;
    /* background-color: green; */
    height: 100%;
`;

const StLabel = styled.label`
    margin: 30px;
    font-size: xx-large;
    font-weight: bolder;
    color: #f5f5f5;
`;

const StInput = styled.input`
    /* outline 속성 reset 속성으로 넣자. */
    /* outline: none; */
    padding: 20px 10px;
    border-radius: 10px;
    border: none;
`;

export const StTextArea = styled.textarea`
    /* outline 속성 reset 속성으로 넣자. */
    /* outline: none; */
    /* resize 속성은 global 속성으로 넣자. */
    /* resize: none; */
    padding: 20px 10px;
    border-radius: 10px;
    height: 300px;
    margin-bottom: 30px;
`;

export default SetGoalPage;
