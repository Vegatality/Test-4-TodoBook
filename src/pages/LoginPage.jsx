import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StBookWrapper } from "../components/StBookWrapper";
// import Deco from "../assets/Deco";
import { BackIcon } from "assets/Icons";
// import Buttons from "assets/Buttons";
// import { StForm, StInput, StLabel } from "./SetGoalPage";
import InputForm from "components/InputForm";

function LoginPage() {
    const [isLogIn, setIsLogin] = useState(false);
    // const [isMember, setIsMember] = useState(false);

    const navigate = useNavigate();
    const movetoCategory = () => {
        navigate(`/category`, {
            replace: true,
        });
    };
    const loginComplete = () => {
        setIsLogin(true);
        movetoCategory();
    };

    return (
        <StBookWrapper>
            <BackIcon />
            <StCategoryContainer>
                <InputForm loginComplete={loginComplete} />
            </StCategoryContainer>
        </StBookWrapper>
    );
}

const StCategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: ${({ isLogIn }) => (isLogIn ? "80px" : "20px")}; */
    gap: 20px;
    padding-top: 120px;
`;
export default LoginPage;
