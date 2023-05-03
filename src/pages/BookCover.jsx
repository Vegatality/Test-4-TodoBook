import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StBookWrapper } from "../components/StBookWrapper";
import BookTitle from "components/BookTitle";
import Deco from "assets/Deco";
import { useSelector } from "react-redux";

function BookCover() {
    const { userId } = useSelector((state) => {
        return state.auth;
    });
    const navigate = useNavigate();

    const logInRouteHandler = () => {
        if (userId) {
            navigate("/category");
        } else {
            navigate("/login");
        }
    };

    return (
        <StBookWrapper entry onClick={logInRouteHandler}>
            <BookTitle />
            <Deco />
        </StBookWrapper>
    );
}

export default BookCover;
