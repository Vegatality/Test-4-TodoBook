import styled, { css } from "styled-components";

// message(alert) detail position

const position = {
    user: {
        top: "85px",
        right: "40px",
    },
    title: {
        top: "240px",
        right: "40px",
    },
    desc: {
        top: "400px",
        right: "40px",
    },
    success: {
        top: "50px",
        right: "50px",
    },
    card: {
        top: "60px",
        right: "40px",
        fontSize: "large",
    },
};

const messageSpot = css`
    ${({ messagePosition }) => {
        return css`
            top: ${position[messagePosition].top};
            right: ${position[messagePosition].right};
            /* font-size default 값 줘서 에러 방지 */
            font-size: ${position[messagePosition].fontSize};
        `;
    }}
`;

export const StMessage = styled.div`
    position: absolute;
    background-color: yellow;
    padding: 10px;
    border-radius: 10px;
    /* font-size default 값 줘서 에러 방지 */
    font-size: initial;

    ${messageSpot}
`;
