import styled from "styled-components";

export const HeaderContainer=styled.header`
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width:100%;
height: 100px;
background-color: white;
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
overflow-x: hidden;
padding-left: 20px;
padding-right: 20px;
margin-left:0px;
margin-right:0px;
z-index: 2;

`
export const IconContainer=styled.div`
display:flex;
flex-direction: row;
gap: 23px;
align-items: center;
position: relative;
`
export const SearchContainer=styled.div`
border: 1px solid ${({theme})=>theme.colors.gray} ;
padding: 10px 10px;
border-radius: 40px;
background-color:${({theme})=>theme.colors.gray} ;
cursor: pointer;
width: 20rem;
display: flex;
align-items: center;
`
export const SearchInput = styled.input`
border: none;
outline: none;
background-color: transparent;
padding-bottom: 6px;
padding-left: 4px;
::placeholder{
    color:#696969;
    font-size: 12px;
    font-family: "Montserrat";
    letter-spacing: 1px;
    font-weight: 100;
    
}
&:focus{
    outline: none;
}
`
export const MyBadge=styled.div`
position: relative;
cursor: pointer;
`  
export const Roundbox=styled.div`
position: absolute;
width: 7px;
height: 7px;
background-color: ${({theme})=>theme.colors.notficationColor};
border-radius: 50px;
right: 0px;
`
export const HeaderMiddle=styled.div`
display:flex;
flex-direction: row;
gap:20px;
align-items: center;
`
export const IconOuterContainer=styled.div`
width: 50px;
height: 50px;
border-radius: 50px;
background-color:${({active,theme})=>active?theme.colors.gray:''} ;
display: flex;
align-items: center;
justify-content: center;
cursor:pointer;
`
export const NotificationContainer=styled.div`
width: 350px;
height:250px;
background-color: white;
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
position: absolute;
top:80px;
right:180px;
padding: 10px 10px;
border-radius: 10px;
overflow-y: auto;
transition: all .2s ease-in-out;
display:none;
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
  border-radius: 10px;
}
`