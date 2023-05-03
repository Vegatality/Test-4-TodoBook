import { signInDb, signUpDb } from "api/mockData";
import Buttons from "assets/Buttons";
import { StDeco } from "assets/Deco";
import { useSignUp } from "hooks/useSignUp";
import jwtDecode from "jwt-decode";
import { StForm, StLabel } from "pages/SetGoalPage";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { SET_TOKEN } from "redux/modules/authSlice";
import styled from "styled-components";
import { cookie } from "utils/cookie";

function InputForm({ loginComplete }) {
    // isMember 는 로그인 모드냐 회원가입모드냐
    const [isMember, setIsMember] = useState(true);
    // const [isRegistering, setIsRegistering] = useState(false);
    const [inputs, setInputChange, onClearInput] = useSignUp({
        id: "",
        password: "",
    });
    const [isError, setIsError] = useState({
        error: false,
        message: "",
    });

    // ------------------------SignUP---------------------------
    // const queryClient = useQueryClient();
    const mutation = useMutation(signUpDb, {
        onSuccess: (data) => {
            console.log("회원가입 성공!"); // 등록되면 true
            // setIsError({ error: false, message: "" });
            onClearInput();
            setIsMember((s) => !s);
        },
        onError: (error) => {
            // console.log(error.response.data.message);
            // alert(error.response.data.message);

            console.log(error.response.data.message);
            // setIsError({ error: true, message: error.response.data.message });
            alert(error.response.data.message);
        },
    });

    const onResisterHandler = () => {
        // 회원가입 버튼은 항상 떠 있으니까 눌렀을 때 회원으로 등록되는 상황인지, 아니면
        // 회원가입 버튼 눌러서 회원가입 페이지로 진입을 하려는 상황인지 구분해야 함.
        if (isMember) {
            // isMember가 true이면 회원가입 버튼 눌렀을 때 그냥 회원가입으로 글자만 바뀌게끔 설정.
            // isMember가 true면 로그인 모드임.
            setIsMember((s) => !s);
        } else {
            if (inputs.id === "" || inputs.password === "") {
                alert("공백은 만들 수 없습니다.");
                return;
            } else {
                mutation.mutate(inputs); // onSuccess 로 옮김.
            }
        }
    };

    // -------------------------------------------SignIn---------------------------

    const dispatch = useDispatch();

    const mutate2 = useMutation(signInDb, {
        onSuccess: (data) => {
            console.log("로그인 성공:", data); // 등록되면 true
            console.log("토큰 : ", data.data.token);
            const { token } = data.data;
            console.log(jwtDecode(token)); // {id: 'gkdgo99', iat: 1683075561, exp: 1683079161}  두 번째는 발급시간, 세 번째는 유효기간
            const decodedToken = jwtDecode(token);
            const { id, exp } = decodedToken;
            // Cookies().set 쿠키에 저장.
            // path (string) : 쿠키 경로, / 모든 경로 페이지에서 쿠키에 액세스할 수 있도록 하려면 경로로 사용
            // expires (Date) : 쿠키의 절대 만료 날짜
            // maxAge (number) : 클라이언트가 쿠키를 수신한 시점부터 쿠키의 상대적인 최대 수명(초)
            // secure (boolean) : HTTPS를 통해서만 액세스할 수 있습니까?

            const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.

            cookie.set("todos", token, {
                path: "/",
                // secure: "/",
                expires: expireDate,
                // expires: 3000,
                // maxAge: 500, // maxAge는 숫자 1이 1초
                // expires: new Date().getMinutes() + 1,
            });
            // setIsError({ error: false, message: "" });
            dispatch(SET_TOKEN({ authenticated: true, userId: id }));
            loginComplete();
        },
        onError: (error) => {
            // console.log(error.response.data.message);
            // alert(error.response.data.message);

            console.log(error.response.data.message);
            // setIsError({ error: true, message: error.response.data.message });
            alert(error.response.data.message);
        },
    });

    const onLoginHandler = () => {
        // 아이디 비밀번호 일치하는지 따지는 조건 넣어야 함. 아직 안 넣었음.
        // 회원가입이 true일 때 로그인 이라는 글자를 가지고 있고,
        if (isMember && inputs.id !== "" && inputs.password !== "") {
            mutate2.mutate(inputs);
            //  누르면 유효 아이디인지 검사하고 다음 페이지 넘어가게 고칠 것!
            // 유효 아이디가 아니라면 조건문으로 걸러야 함.
        } else if (isMember && (inputs.id === "" || inputs.password === "")) {
            alert("공백은 불가능합니다!");
            // isMember가 false일 때는 회원가입 페이지임.
            // 누르면 단순 취소 버튼에서 로그인 버튼으로 글자만 바꾸는 역할 해야 함.
        } else {
            setIsMember((s) => !s);
        }
    };

    return (
        <>
            {Array(1)
                .fill()
                .map((_, idx) => (
                    <StDeco key={idx} />
                ))}
            <StLoginFormContainer>
                <StRenewForm>
                    <StRenewLabel>
                        {isMember ? "로그인하기" : "회원 가입하기"}
                    </StRenewLabel>
                    <StInputContainer>
                        <StTextContainer>아이디</StTextContainer>
                        <StRenewInput
                            name="id"
                            type="text"
                            value={inputs.id}
                            onChange={setInputChange}
                            placeholder="아이디를 입력하세요!"
                        />
                    </StInputContainer>
                    <StInputContainer>
                        <StTextContainer>비밀번호</StTextContainer>
                        <StRenewInput
                            name="password"
                            type="password"
                            value={inputs.password}
                            onChange={setInputChange}
                            placeholder="비밀번호를 입력하세요!"
                        />
                    </StInputContainer>
                </StRenewForm>
                <StButtonContainer>
                    <Buttons
                        size="small"
                        color="blue"
                        bgcolor="white"
                        radius="10"
                        onClick={onLoginHandler}
                    >
                        {isMember ? "로그인" : "취소"}
                    </Buttons>
                    <Buttons
                        size="small"
                        color="blue"
                        bgcolor="white"
                        radius="10"
                        onClick={onResisterHandler}
                    >
                        회원가입
                    </Buttons>
                </StButtonContainer>
            </StLoginFormContainer>
            {Array(1)
                .fill()
                .map((_, idx) => (
                    <StDeco key={idx} />
                ))}
        </>
    );
}

const StLoginFormContainer = styled.div`
    /* background: green; */
    width: 100%;
`;

const StRenewForm = styled(StForm)`
    /* width: 100%; */
    /* background: red; */
    height: 380px;
`;

const StInputContainer = styled.div`
    /* background: white; */
    /* height: 100px; */
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
`;

const StTextContainer = styled.div`
    /* background-color: white; */
    padding-left: 30px;
    display: flex;
    font-size: xx-large;
    color: white;
    font-weight: bolder;
`;

const StButtonContainer = styled.div`
    /* background: yellow; */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 24px;
    margin-block: 15px;
`;

const StRenewInput = styled.input`
    /* background: yellow; */
    padding: 10px 20px;
    height: 50px;
    border-radius: 10px;
    font-size: larger;
`;

const StRenewLabel = styled(StLabel)`
    margin-top: 0px;
`;

export default InputForm;
