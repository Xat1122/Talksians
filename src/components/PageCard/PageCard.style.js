import styled from "styled-components"

export const GroupPageContainer =styled.div`
background-color: white;
box-shadow: 0 8px 30px rgba(0,0,0,.05)!important;
border-radius: 5px;
overflow-x: hidden;
padding-bottom: 30px;
.background-img{
    width: 460px;
    height: 100px;
    background-repeat:no-repeat !important;
    background-size: cover !important;
    background-position: center !important;
}
.card-body{
 padding:0px 20px ;
 display: flex;
 flex-direction: row;

 justify-content: space-between;
 .avatar-container{
    background-color: white;
   padding: 4px;
    margin-top: -30px;
    width: 78px;
   
    border-radius: 50px;
 }
 .group-content{
    display:flex;
    flex-direction: column;
    gap:2px;
    margin-left: 10px;
    margin-top: 10px;
    h1{
        font-size: 14px;
    font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:black;
        margin-bottom: 0px;
    }
    p{
        font-size: 12px;
    font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:#adb5bd;
        margin-bottom: 0px;
    }
   
 } .group-button-container{
       
       margin-top: 10px;
        .follow-btn{
            background-color:${({theme})=>theme.colors.light};
        color:white;
        font-weight:bold;
        font-family: "Montserrat",sans-serif;
        font-size: 12px;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        letter-spacing: 1px;
            
        }
    }
}
`