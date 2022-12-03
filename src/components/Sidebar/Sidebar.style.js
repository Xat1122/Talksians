import styled from "styled-components";

export const SidebarNews=styled.div`
padding: 10px 20px 10px 25px;

border-radius: 10px;
background-color: white;
margin-bottom: 20px;
box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
p{
    font-size: 12px;
    font-family: "Montserrat";
    color:#808191;
}
.Avatar-container{
    margin-top: 10px;
    display:flex;
    flex-direction: column;
    gap:20px
}
`
export const FriendReqeustContainer=styled.div`
padding: 20px 10px 20px 10px;

border-radius: 10px;
background-color: white;
margin-bottom: 20px;
box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
.Request-header{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
  
   a{
    text-decoration: underline;
    font-family: "Montserrat";
    color: #A020F0;
    font-size: 12px;
    font-weight: bold;
   }
   p{
    margin-bottom: 0px;
   }
}
p{
    font-size: 12px;
    font-family: "Montserrat";
    color:#808191;
}
.Avatar-container{
    margin-top: 10px;
    display:flex;
    flex-direction: column;
    gap:20px
}
.Group-pages-container{
    .img-container{
        overflow-x: hidden;
        border-radius: 5px;
        img{
        width:100%;
        height:auto
    }
    }
    p{
        font-size: 14px;
    font-family: "Montserrat";
    color:#808191;
    margin-top: 10px;
    }
    .button-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 10px;
        button{
            background-color: ${({theme})=>theme.colors.light};
            color:white;
            padding: 7px 0px;
            width: 100%;
            border-radius: 20px;
            border: none;
            font-size: 14px;
    font-family: "Montserrat";
        }
    }
    
}

`
export const SidebarSetting=styled.div`
padding: 10px 10px 10px 25px;

border-radius: 10px;
background-color: white;

box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
p{
    font-size: 12px;
    font-family: "Montserrat";
    color:#808191;
}
.Setting-container{
    margin-top: 10px;
    display:flex;
    flex-direction: column;
    gap:20px;
    div{
        gap:10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        &:hover a{
             color:#A020F0 ;
        }
        a{
            text-decoration: none;
            font-size: 14px;
    font-family: "Montserrat";
    color:#808191;
    font-weight: 600;
        }
    }
}
`