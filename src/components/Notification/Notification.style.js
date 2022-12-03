import styled from "styled-components";

export const UserNotifcationContainer=styled.div`
display: flex;
flex-direction: row;
gap: 8px;
border-bottom: 1px solid ${({theme})=>theme.colors.gray};
padding-bottom: 5px;
padding-top: 5px;
border-bottom: ${({borderBottom,theme})=>borderBottom!=='yes'?`none`:`1px solid ${theme.colors.gray}`};
`
export const NotificationTextContainer=styled.div`
display: flex;
flex-direction: column;
`
export const NotificationText=styled.div`
font-size: 14px;
font-family: "Montserrat";
font-weight: 300;
`
export const NotificationButtonContainer=styled.div`
display: flex;
flex-direction: row;
gap:10px;
margin-top: 10px;
`
export const NotificationButton=styled.button`
font-family: "Montserrat";
font-weight: 300;
font-size: 13px;
border-radius: 20px;
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;
background: ${({bgcolor,theme})=>bgcolor?theme.colors.light:theme.colors.gray};
color:${({color})=>color?'white':'black'};
padding: 5px 20px;
border: none;
cursor:pointer;
`
//linear-gradient(180deg, red, yellow)     linear-gradient(135deg,'#09f','#05f') 