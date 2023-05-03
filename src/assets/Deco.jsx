import React from "react";
import styled from "styled-components";

function Deco() {
    return (
        <StDecoWrapper>
            {Array(3)
                .fill()
                .map((_, idx) => (
                    <StDecoLine key={idx} />
                ))}
        </StDecoWrapper>
    );
}

const StDecoWrapper = styled.div`
    background-color: #5a8d5a;
    margin-top: 120px;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const StDecoLine = styled.div`
    border-radius: 10px;
    height: 20px;
    background-color: white;
    margin-inline: 100px;
`;

export const StDeco = styled.div`
    height: 20px;
    /* border-radius: 10px; */
    background-color: white;
    width: 100%;
`;

export default Deco;
