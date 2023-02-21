/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }
    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
    }
    body{
        background-color: ${({ theme }) => theme['gray-800']};
        color: ${({ theme }) => theme['gray-100']};
        --webkit-font-smoothing: antialiased;
    }
    body, input, textarea, button{
        font: 400 1rem 'Roboto', sans-serif;
        /* font-weight: 400; */
        /* font-size: 1rem; */
    }
    @media (max-width: 768px) {
      html {
        font-size: 87.5%;
      }
    }
`;
