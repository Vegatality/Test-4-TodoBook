import axios from "axios";
import { cookie } from "utils/cookie";

// axios 전역 설정
// axios.defaults.withCredentials = true;

// const getJWT = async () => {
//     const response = await axios.get(
//         `${process.env.REACT_APP_TEST_SERVER_URL}/user`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// };

// JWT 토큰을 가져오는 함수 ( JWT 토큰을 로컬 스토리지에서 가져오는게 맞나? 쿠키에 저장되지 않나?)

// 매 페이지마다 확인
const checkAuth = async () => {
    const authToken = cookie.get("todos");
    const config = {
        headers: {
            authorization: `Bearer ${authToken}`,
        },
    };

    const response = await axios.get(
        `${process.env.REACT_APP_TEST_SERVER_URL}/user`,
        config
    );
    // console.log(response);
    return response;
    // return Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(response);
    //     }, 3000);
    // });
};

// axios 옵션 객체로 넣기
const signUpDb = async (inputs) => {
    await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/register`,
        inputs,
        {
            headers: {
                withCredentials: true, // 쿠키 cors 통신 설정
            },
        }
    );
};

const signInDb = async (inputs) => {
    const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/login`,
        inputs,
        {
            headers: {
                withCredentials: true, // 쿠키 cors 통신 설정
            },
        }
    );
    return response;
};

export { signUpDb, signInDb, checkAuth };
