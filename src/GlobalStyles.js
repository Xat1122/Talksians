import styled,{createGlobalStyle} from "styled-components";
import FredokaOne from "./fonts/FredokaOne-Regular.ttf";
import Montserrat from "./fonts/montserrat-regular.ttf";
export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @font-face {
  font-family: "Fredoka One";
  src: url(${FredokaOne}) format('truetype');
}
@font-face {
  font-family: "Montserrat";
  src: url(${Montserrat}) format('truetype');
}
font-family: "Fredoka One", cursive;
}
body{
  background-color: rgb(230,230,250);
  overflow-x: hidden;
}


`