import Buttons from "assets/Buttons";
import React from "react";
import styled from "styled-components";

function SaveCard({ setEditCardMode, card }) {
    return (
        <>
            <StSavedTextArea>{card.desc}</StSavedTextArea>
            <StButtonContainer>
                <Buttons
                    size="small"
                    color="blue"
                    bgcolor="white"
                    radius="10"
                    onClick={() => setEditCardMode((state) => !state)}
                >
                    수정
                </Buttons>
            </StButtonContainer>
        </>
    );
}
const StSavedTextArea = styled.div`
    height: 500px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
`;

const StButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    margin-top: 20px;
`;

export default SaveCard;
