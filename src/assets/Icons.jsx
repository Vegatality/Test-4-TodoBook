import { RiArrowGoBackFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "api/todos";
import { darken, lighten } from "polished";

const IconWrap = styled.div`
    svg {
        font-size: 30px;
    }
`;

const StBackIcon = styled(RiArrowGoBackFill)`
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: x-large;
    cursor: pointer;
`;

// 이거 나중에 delete reducer랑 엮어서 함수 컴포넌트로 만들어줘야 함.
export const StTrashCan = styled(RiDeleteBin6Line)`
    font-size: xx-large;
    color: red;
    cursor: pointer;
    &:hover {
        background: ${lighten(0.3, "red")};
    }
    &:active {
        background: ${darken(0.3, "red")};
    }
`;

const StHomeIcon = styled(IoIosHome)``;

function HomeIcon() {
    const navigate = useNavigate();
    return <StHomeIcon onClick={() => navigate("/")} />;
}

function BackIcon() {
    const navigate = useNavigate();
    return <StBackIcon onClick={() => navigate(-1)} />;
}

// function TrashCan() {
//     // 근데 뭔가 지우는 기능을 여기서 붙이는 건 좀 위험한 것 같음.
//     // 나중에는 그렇게 하지 말자!
//     const queryClient = useQueryClient();
//     const mutation = useMutation(deleteTodo, {
//         onSuccess: () => {
//             queryClient.invalidateQueries("todos")
//         }
//     })
// }

export { BackIcon, HomeIcon };
