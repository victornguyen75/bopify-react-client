import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        background: ${(props) => props.theme.bg};
        color: ${(props) => props.theme.color};
    }
`;

export default GlobalStyles;
