import styled from "styled-components";

export const PostContainer=styled.div`
width: 100%;
border-radius: 10px;
background-color: #fff;
height: auto;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
padding-bottom: 20px;
`
export const PostHeader=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
.post-avatar{
display: flex;
flex-direction: row;
gap:10px;
.post-header-content{
    display:flex;
    flex-direction: column;
    gap:2px;
    .person{
        margin-bottom: 0px;
        font-size: 14px;
        font-weight:600;
        font-family: "Montserrat";
    }
    .hours{
        font-size: 14px;
        font-weight:500;
        margin-bottom: 0px;
        font-family: "Montserrat";
        color:#adb5bd;
    }
}
}
.post-setting{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #f5f5f5;
    color:black;
    font-size: 14px;
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    
}
`
export const PostBody=styled.div`
margin-top: 15px;
.post-description{
    font-size: 12px;
        font-weight:bold;
        margin-bottom: 0px;
        font-family: "Montserrat";
        color:#adb5bd;
        line-height: 25px;
        letter-spacing: 1px;
       
}
.postTitle{
    font-size: 16px;
        font-weight:bold;
        margin-bottom: 0px;
        font-family: "Montserrat";
       
        line-height: 25px;
        letter-spacing: 1px; 
}
.post-photo{
    position: relative;
    overflow-x:hidden ;
    border-radius: 10px;
    margin-top: 20px;
    img{
        width: 100%;
        height: auto;
    }
}
`
export const PostFooter=styled.div`
display:flex;
flex-direction: row;
gap:20px;
margin-top: 20px;
.Like-container{
display:flex;
flex-direction: row;
align-items: center;
gap:10px;
p{
    font-size: 16px;
        font-weight:bold;
        margin-bottom: 0px;
        font-family: "Montserrat";
        color:#A020F0;
        letter-spacing: 2px;
}
}
`
export const PostComment=styled.div`
margin-top: 10px;

padding:20px 15px;
background-color:white;
border-radius: 5px;
box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
border: none;
transition: all .1s ease-in;
display:none;
overflow-y: auto;
.post-comment{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
   .commnet-left{
    display:flex;
    flex-direction: row;
    gap:5px;
 .post-header-content{
    display:flex;
    flex-direction: column;
    gap:2px;
    margin-bottom: 15px;
 
    .person{
        margin-bottom: 0px;
        font-size: 14px;
        font-weight:600;
        font-family: "Montserrat";
    }
    .hours{
        font-size: 14px;
        font-weight:500;
        margin-bottom: 0px;
        font-family: "Montserrat";
        color:black;
    }
}
   }
   
}
`