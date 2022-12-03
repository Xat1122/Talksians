import styled from "styled-components"

export const CardContainer=styled.div`
display: flex;
flex-direction: column;
background-color: white;
justify-content: center;
align-items: center;
padding: 20px 30px;
width: 300px;
border-radius: 5px;
gap:15px;
box-shadow: 0 8px 30px rgba(0,0,0,.05)!important;
h1{
    font-size: 16px;
    font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:black;
}
.button-container{
    display: flex;
    flex-direction: row;
    gap:10px;
    button{
        
        padding:7px 20px ;
        border-radius: 20px;
        background-color:#e50202 ;
        color:white;
        font-weight:bold;
        font-family: "Montserrat",sans-serif;
        font-size: 14px;
        border: none;
        letter-spacing: 1px;
    }
    .confirm-button{
        background-color: #10d876;
    }
}
`