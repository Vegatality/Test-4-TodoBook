// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회 REACT_APP_SERVER_URL
// .env 환경변수 만들 때는 REACT_APP 를 식별자 명 앞에 꼭 붙여줘야 한다.

// get todo
const getTodos = async () => {
    // 환경정보 바꾸면 재시작해야 함.
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos`
    );
    // console.log(response);
    // console.log(response.data);
    return response.data;
};

const getCard = async (id) => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos/${+id}`
    );
    return response.data;
};

// add todo
// 이 함수는 어떤 투두를 추가해야 하는지 알아야 하기 때문에 newTodo를 인자로 받음.
// 숫자 문자형 숫자형 다시 고려해서 짜야함.
const addTodo = async (newTodo) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
    // await getTodos();
};

// delete todo
const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${+id}`);
    // validate 알아서 해줬나? 지우고 나서 확인해보자.
    // await getTodos();
};

// patch todo
const updateTodo = async (reNewTodo) => {
    await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${+reNewTodo.id}`,
        reNewTodo
    );
    // await getTodos();
};

// CORS Cross Origin Resource Sharing : 다른 출처에 리소스 요청하는 것을 허용하는 정책
//  // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
//  withCredentials: false, // 기본값
// withCredentials 옵션이 클라이언트 쪽에 없으면 서버쪽에서 세션ID를 쿠키에 담아서 주더라도
// 브라우저에서는, 즉, 클라이언트에서는 쿠키에 자동으로 담을 수 없다.

// JWT
// const getData = async () => {
//     const accessToken = cookies.get("accessToken");
//     console.log("accessToken:", accessToken)
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product-list`, {
//         headers {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     console.log("response:", response)
//     setData(response.data.data);
// }

export { getTodos, addTodo, deleteTodo, updateTodo, getCard };
