import BookArea from "components/StBookWrapper";
import HeaderArea from "components/HeaderArea";
import React from "react";
import styled, { ThemeConsumer, ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";

const colors = {
    green: "rgb(85, 239, 196)",
    red: "rgb(250, 177, 160)",
    blue: "#007bff",
};

function Home() {
    return (
        <ThemeProvider theme={colors}>
            {/* <GlobalStyle /> */}
            {/* <HeaderArea /> */}
            <BookArea />
        </ThemeProvider>
    );
}
export default Home;
