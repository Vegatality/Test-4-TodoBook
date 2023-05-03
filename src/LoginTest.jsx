import { getJWT, signUpDb } from "api/mockData";
import Buttons from "assets/Buttons";
import { BackIcon } from "assets/Icons";
import { StMessage } from "assets/Message";
import { StBookWrapper } from "components/StBookWrapper";
import { useInputs, useSignUp } from "hooks/useSignUp";
import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

function LoginTest() {
    // const [user, setUserChange, setUserClear] = useInputs("");
    // const [title, setTitleChange, setTitleClear] = useInputs("");
    // const [desc, setDescChange, setDescClear] = useInputs("");

    // const [inputs, setInputs] = useState({
    //     user: "",
    //     title: "",
    //     desc: "",
    //     errorMessage: null,
    // });

    // ------------------------------------------------------------

    // const [id, onChangeId, onClearId] = useSignUp({ id: "", password: "" });
    // const [password, onChangePassWord, onClearPassWord] = useSignUp({
    //     id: "",
    //     password: "",
    // });

    const [info, onChangeInfo, onClearInfo] = useSignUp({
        id: "",
        password: "",
    });
    // ------------------------------------------------------------

    const queryClient = useQueryClient();
    const mutation = useMutation(signUpDb, {
        onSuccess: (data) => {
            // queryClient.invalidateQueries("todoTest")
            console.log(data);
            console.log("회원가입 성공!");
        },
        onError: (error) => {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        },
    });

    // const { isLoading, isError, data } = useQuery("jwtCheck", getJWT);

    const onSubmitHandler = (event) => {
        mutation.mutate(info);
        onClearInfo();
        event.preventDefault();
    };

    return (
        <div>
            {/* <form onSubmit={(event)=>}>
              <input value={user} onChange={setUserChange} />
              <input value={title} onChange={setTitleChange} />
              <input value={desc} onChange={setDescChange} />
              <button type="submit">제출하기</button>
            </form> */}
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    name="id"
                    value={info.id}
                    onChange={onChangeInfo}
                />
                <input
                    name="password"
                    type="password"
                    value={info.password}
                    onChange={onChangeInfo}
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
export default LoginTest;
