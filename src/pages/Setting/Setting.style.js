import styled from 'styled-components';

export const SettingContainer = styled.div`
background-color: white;
border-radius:10px ;
padding-left: 40px;
padding-right: 20px;
margin-left: 10%;
padding-top: 50px;
margin-right: 20px;
width: 800px;
height: auto;
h1{
    font-size: 32px;
    font-weight: 700;
    font-family: Montserrat,sans-serif;
}
.setting-content-container{
    margin-top: 50px;
    .setting-content{
        
        p{
    font-size: 13px;
    font-family: "Montserrat";
    color:#808191;
}
.line{
    width: 100%;
    height: 1px;
    border-radius: 5px;
    background-color: #e1e1f0;
    margin-top: 10px;
    margin-bottom: 10px;
}
    }
}
`