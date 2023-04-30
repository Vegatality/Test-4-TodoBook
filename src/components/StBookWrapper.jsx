import { darken, lighten } from "polished";
import styled, { css } from "styled-components";

export const StBookWrapper = styled.div`
    position: relative;
    width: 900px;
    height: 900px;
    /* min-height: 900px;
    max-height: 900px; */
    /* min-height: 800px; */
    background-color: #5292c6;
    margin: auto;
    /* margin-top: 50px; */
    margin-block: 50px;
    border-radius: 20px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    overflow: hidden;
    ${(props) =>
        props.entry &&
        css`
            &:hover {
                cursor: pointer;
                background: ${lighten(0.1, "#5292c6")};
            }
            &:active {
                cursor: pointer;
                background: ${darken(0.1, "#5292c6")};
            }
        `}
`;

export const StScrollOnWrapper = styled(StBookWrapper)`
    overflow-x: hidden;
    overflow-y: ${({ scrollOption }) =>
        scrollOption > 8 ? "scroll" : "hidden"};
`;
