import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StBookWrapper } from "../components/StBookWrapper";
import BookTitle from "components/BookTitle";
import Deco from "assets/Deco";

function BookCover() {
    const navigate = useNavigate();

    return (
        <StBookWrapper entry onClick={() => navigate("/category")}>
            <BookTitle />
            <Deco />
        </StBookWrapper>
    );
}

export default BookCover;
