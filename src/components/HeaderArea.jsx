import { checkAuth } from "api/mockData";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "redux/modules/authSlice";
import styled from "styled-components";
import { cookie } from "utils/cookie";

const IconStyle = {
    color: "white",
    margin: "20px",
    fontSize: "xx-large",
    cursor: "pointer",
};
const IconStyle2 = {
    color: "white",
    margin: "20px",
    fontSize: "larger",
    cursor: "pointer",
};

function HeaderArea() {
    const navigate = useNavigate();
    const location = useLocation();

    const userId = useSelector((state) => {
        // console.log(state.auth);
        return state.auth.userId;
    });

    const dispatch = useDispatch();

    const logOut = () => {
        cookie.remove("todos");
        dispatch(DELETE_TOKEN());
        navigate("/");
    };

    const goToHome = () => {
        navigate("/", {
            state: location,
        });
    };

    return (
        <StHeaderContainer>
            <StHeaderAdjustment>
                <div style={IconStyle} onClick={goToHome}>
                    🏠
                </div>
                <StTitle>Todo</StTitle>
                {userId ? (
                    <div style={IconStyle2} onClick={logOut}>
                        로그아웃하기
                    </div>
                ) : (
                    <div style={IconStyle}>99</div>
                )}
            </StHeaderAdjustment>
        </StHeaderContainer>
    );
}

const StHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #5292c6;
    min-width: 900px;
`;

const StHeaderAdjustment = styled.div`
    height: 100px;
    width: 1200px;
    /* min-width: 850px; */
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #5292c6;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

const StTitle = styled.div`
    color: white;
    font-size: 32px;
    font-weight: bold;
`;

export default HeaderArea;
