import styled from "styled-components";

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