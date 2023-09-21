import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root{
    --readonly: #b1b1b1b1;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline: 0;
}

body{
    -webkit-font-smoothing: antialiased ;
}

body, input-security, text-decoration-line, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}
`;
