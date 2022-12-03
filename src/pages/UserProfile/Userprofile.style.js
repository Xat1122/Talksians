import styled from "styled-components"

export const UserContainer=styled.div`
display:flex;
flex-direction: column;
gap:20px;
width: 100%;

`
export const UserProfileContainer=styled.div`
background-color: white;
box-shadow: 0 8px 30px rgba(0,0,0,.05)!important;
border-radius: 20px;
overflow-x: hidden;
height: 430px;
margin-left: 20px;
width: 97%;

padding:20px 20px ;
padding-bottom: 30px;
overflow: hidden;
.background-img{
    width: 100%;
    height:300px;    
    background-repeat:no-repeat !important;
    background-size: cover !important;
    background-position: center !important;
    border-radius: 20px;
}
.card-body{
 padding:0px 20px ;
 display: flex;
 flex-direction: row;
 .avatar-container{
    background-color: white;
   padding: 4px;
    margin-top: -30px;
    width: 110px;
   
    border-radius: 60px;
 }
 .group-content{
    display:flex;
    flex-direction: column;
    gap:2px;
    margin-left: 10px;
    margin-top: 10px;
    h1{
        font-size: 20px;
    font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:black;
        margin-bottom: 0px;
    }
    p{
        font-size: 15px;
    font-weight:bold;
        font-family: "Montserrat",sans-serif;
        color:#adb5bd;
        margin-bottom: 0px;
    }
   
 } .group-button-container{
       
       margin-top: 10px;
       justify-content: flex-end;
       
       display: flex;
       height: 45px;
       width: 100%;
       gap:10px;
        .follow-btn{
            background-color:${({theme})=>theme.colors.light};
        color:white;
        font-weight:bold;
        font-family: "Montserrat",sans-serif;
        font-size: 12px;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        letter-spacing: 1px;
            
        }
        .message{
            display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #f5f5f5;
    color:#495057;
    font-size: 14px;
    border-radius: 10px;
        }
        .setting{
            display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #f5f5f5;
    color:#495057;
    font-size: 14px;
    border-radius: 50px;
        }
    }
}
`
export const UserTabContainer=styled.div`

box-shadow: 0 8px 30px rgba(0,0,0,.05)!important;
border-radius: 20px;
overflow-x: hidden;
height: auto;
margin-left: 20px;

width: 97%;
padding:20px 20px ;
padding-bottom: 30px;
overflow: hidden;
overflow-x: hidden;

`
export const FriendsContainer=styled.div`
flex-wrap: wrap;
display: flex;
flex-direction: row;
gap:20px;
margin-top: 0px;

background-color: white;
`
export const FriendsCardContainer=styled.div`

display: flex;
flex-direction: column;
gap:20px;
margin-top: 0px;
padding-top: 20px;
padding-bottom: 20px;
padding-left: 20px;
background-color: white;
`