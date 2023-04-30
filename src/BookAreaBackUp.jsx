import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetGoalPage from "pages/SetGoalPage";
import BookCover from "./BookCover";

function BookArea() {
    // const [bookCover, setBookCover] = useState(true);
    // const [recordPage, setRecordPage] = useState(false);
    // const [isTurnPage, setIsTurnPage] = useState(false);

    const navigate = useNavigate();
    // const { pathname } = useLocation();
    // console.log(pathname);

    // const bookRef = useRef(null);

    // const pageHandler = (e) => {
    //     // bookRef.current.classList.replace()
    //     if (pathname !== `/${e.target.name}`) {
    //         // setBookCover(!bookCover)
    //         setIsTurnPage((state) => !state);
    //         setTimeout(() => {
    //             navigate(`/${e.target.name}`);
    //             setIsTurnPage((state) => !state);
    //         }, 390);
    //     }
    // };

    // const todoRecordTransfer = () => {
    //     navigate(`/goal`);
    // };

    // const todoWatchTransfer = () => {
    //     navigate(`/todolist`);
    // };

    return (
        // <StBookWrapper visible={isTurnPage}>
        <StBookWrapper />

        // <StBookWrapper>
        //     <>
        //         <StCategoryContainer>
        //             <StButton name="goal" onClick={todoRecordTransfer}>
        //                 할 일 기록하기
        //             </StButton>
        //             <StButton name="todolist" onClick={todoWatchTransfer}>
        //                 Todo List
        //             </StButton>
        //         </StCategoryContainer>
        //         <StDecoWrapper>
        //             {RepeatLine(3).map((_, idx) => (
        //                 <StDecoLine key={idx} />
        //             ))}
        //         </StDecoWrapper>
        //     </>
        // </StBookWrapper>
    );
}

const StBookWrapper = styled.div`
    width: 900px;
    height: 900px;
    background-color: #5292c6;
    margin: auto;
    margin-top: 50px;
    border-radius: 20px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

// const StCategoryContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 80px;
//     padding-top: 120px;
// `;

// const StButton = styled.button`
//     background-color: white;
//     width: 600px;
//     padding-block: 40px;
//     border: none;
//     border-radius: 20px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: larger;
//     font-weight: bold;

//     &::after {
//         content: "⭐";
//         display: block;
//         width: 10px;
//         color: black;
//     }
// `;
// const StDecoWrapper = styled.div`
//     background-color: #5a8d5a;
//     margin-top: 120px;
//     height: 220px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
// `;

// const StDecoLine = styled.div`
//     border-radius: 10px;
//     height: 20px;
//     background-color: white;
//     /* margin-top: 65px; */
//     margin-inline: 100px;
// `;

export default BookArea;
