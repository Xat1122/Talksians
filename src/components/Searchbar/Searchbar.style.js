import styled from "styled-components"

export const SearchContainer=styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border: 1px solid ${({theme})=>theme.colors.gray} ;
padding: 10px 10px;
border-radius: 10px;
background-color:${({theme})=>theme.colors.gray} ;
cursor: pointer;
width: 15rem;
display: flex;
align-items: center;
input{
    border:none;
    outline:none;
    font-size: 13px;
        font-weight:500;
        font-family: "Montserrat",sans-serif;
        color:#696969;
        background-color: transparent;
padding-bottom: 6px;
padding-left: 10px;
    &:focus{
        outline:none
    }
}
`