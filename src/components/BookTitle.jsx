import React from "react";
import styled from "styled-components";

function BookTitle() {
    return (
        <StTitleContainer>
            <StBookTag>
                <div>2023</div>
                <div>Todo Book</div>
            </StBookTag>
            <StBook>TODO BOOK</StBook>
        </StTitleContainer>
    );
}

const StTitleContainer = styled.div`
    position: relative;
    height: 412px;
    cursor: pointer;
`;

const StBookTag = styled.div`
    font-size: xx-large;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    gap: 80px;
    /* border-top-left-radius: 20px; */
    width: 80px;
    height: 209px;
    margin-left: 40px;
`;

const StBook = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* top: 0; */
    /* margin: auto; */
    background-color: purple;
    font-size: 5rem;
    border-radius: 20px;
`;

export default BookTitle;
