import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { colors } from "styles/theme";

const queryClient = new QueryClient();
function App() {
    // QueryClientProvider 주입.
    // QueryClientProvider : 데이터를 읽어오는 기능(QueryClient)을 애플리케이션 전체에 주입하도록 하는 API
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={colors}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
