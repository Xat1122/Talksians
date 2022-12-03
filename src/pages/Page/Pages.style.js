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
export const DashboardMidContainer = styled.div`
margin-left: 30px;
margin-right: 10px;
width: 80%;
`
export const CreatePostContainer = styled.div`
width: 100%;
border-radius: 10px;
background-color: #fff;
height: auto;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
padding-bottom: 20px;
.create{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:15px;
    p{
        font-size: 14px;
        font-weight:600;
        font-family: "Montserrat";
        color:#adb5bd;
        margin-bottom: 0px;
    }
}
.postcontainer{
    margin-top: 20px;
.post-header{
    display: flex;
    flex-direction: row;
    align-items:center;
    gap:20px;
    margin-bottom: 10px;
    h5{
        margin-bottom: 0px;
        font-family: "Montserrat" !important;
        font-size: 17px;
        font-weight:600;
    }
    input{
        border:none;
        outline: none;
        font-family: "Montserrat" !important;
        font-size: 17px;
        font-weight:600;
    }
}
   .post-content{
    display: flex;
    flex-direction: row;
    gap:10px;
    border: 1px solid #adb5bd;
    border-radius: 10px;
    padding: 15px;
    textarea{
        border: none !important;
        font-family: "Montserrat" !important;
        font-size: 14px;
        font-weight:500;
        outline:none
    }
    textarea:focus{
        outline: none;
        overflow-y:auto;
    }
   }
   .post-footer{
    display: flex;
    flex-direction: row;
    gap:30px;
    align-items: center;
    margin-top: 20px;
    position:relative;
    div{
        display:flex;
        flex-direction: row;
        gap:10px;
        position:relative;
        input{
    opacity: 0;
    position: absolute;
    left:0px;
    top:0px;
    cursor: pointer;
   
   }
   .dropDownbox{
    width: 130px;
    position: absolute;
    border: 1px solid #adb5bd;
    border-radius: 10px;
    padding:10px;
    z-index: 2;
    background-color: white;
    display: flex;
    flex-direction: column;
    top:25px;
    left: 20px;
    
    transition:all .2s ease;
    display: none;
    p{
        font-family: "Montserrat" !important;
        font-size: 14px;
        font-weight:normal;
        margin-bottom: 0px;
        cursor: pointer !important; 
        color:#adb5bd !important;
        margin-bottom:10px;
    }
    .active{
        color:#6C0BA9 !important;
        font-weight:600 !important;
    }
   }
    }
   p{
    font-family: "Montserrat" !important;
        font-size: 14px;
        font-weight:normal !important;
        margin-bottom: 0px;
        cursor: pointer !important;
        
   }
   
   }
}
`
export const AllPostContainer=styled.div`
margin-top: 20px;
display:flex;
flex-direction: column;
gap:20px;

`