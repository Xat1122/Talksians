import styled from "styled-components";

export const PageHeadeContainer=styled.div`
background-color: white;
box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
border-radius: 5px;
padding: 20px 20px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
h1{
    font-size: 20px;
        font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:${({theme})=>theme.colors.primary};
        letter-spacing: 1px;
    
}
`