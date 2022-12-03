import styled from "styled-components";

export const AvatarContainer = styled.div`
display: flex;
flex-direction: row;
gap:10px;
align-items: center !important;

a{
    color:black;
    font-size:14px;
    text-decoration: none;
    font-family: "Montserrat";
    font-weight: 600;
    &:hover{
        color:#A020F0
    }
}
`
export const Avatar=styled.div`
display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background: orange;
    background: ${(props) => props.gradient};
`