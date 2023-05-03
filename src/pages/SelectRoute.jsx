import Buttons from "assets/Buttons";
import Deco from "assets/Deco";
import React from "react";
import styled from "styled-components";
import { BackIcon } from "assets/Icons";
import { useNavigate } from "react-router-dom";
import { StBookWrapper } from "components/StBookWrapper";

function SelectRoute() {
    const navigate = useNavigate();
    const CategoryHandler = (e) => {
        navigate(`/${e.target.name}`);
    };

    return (
        <StBookWrapper>
            <BackIcon />
            <StCategoryContainer>
                <Buttons
                    noMargin={true}
                    size="large"
                    iconOption={true}
                    name="goal"
                    radius="20"
                    onClick={CategoryHandler}
                >
                    할 일 기록하기
                </Buttons>
                <Buttons
                    noMargin={true}
                    size="large"
                    iconOption={true}
                    name="todolist"
                    radius="20"
                    onClick={CategoryHandler}
                >
                    Todo List
                </Buttons>
            </StCategoryContainer>
            <Deco />
        </StBookWrapper>
    );
}

const StCategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    padding-top: 120px;
`;

export default SelectRoute;
