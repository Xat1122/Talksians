import styled from "styled-components";

export const AccountInformationContainer=styled.div`
background-color: white;
border-radius:10px ;
/* padding-left: 40px;
padding-right: 20px; */
margin-left: 100px;
/* padding-top: 50px; */
margin-right: 20px;
width: 800px;
height: auto;
overflow: hidden;
margin-bottom: 20px;

`
export const AccountInformationContent=styled.div`
padding-left: 40px;
padding-right: 20px;
padding-top: 50px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
.UserImg{
 
    display: flex;
    justify-content: center;
    
    width: 150px;
    height: auto;
    img{
        width: 100%;
    }
    
}
.Username{
        font-size: 20px;
        color:black;
        font-weight: 600;
        margin-top: 10px;
        font-family: "Montserrat";
    }
    .InputContainer{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        
        width: 100%;
        justify-content: center;
        align-items: center;
        .InputGroupContainer{
            display:flex;
            flex-direction: row;
            gap:40px;
            .InputGroup{
                display:flex;
                flex-direction: column;
              
                margin-bottom: 20px;
               
                label{
                    font-size: 15px;
                    font-family: "Montserrat";
                    color:black;
                }
                .UserInputFields{
                    border-radius: 5px;
                    border: 2px #eee solid;
                    padding:15px 10px;
                    font-family: "Montserrat";
                    font-size: 15px;
                    width: 280px;
                    outline: none;
                    &:focus{
                        border: 2px solid #A020F0;
                    }
                }
            }
            .InputDropContainer{
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 4px solid #eee ;
                width: 500px;
                height: auto;
                border-style:dashed;
                padding-bottom: 20px;
                margin-bottom: 20px;
                margin-top: 50px;
                padding-top: 20px;
                p{
                    font-size: 15px;
                    margin-bottom: 5px;
                    font-family: "Montserrat";
                }
            }
        }
        
    }
`
export const AccountInformationHeader=styled.div`
padding:30px 0px 30px 40px;
background-color: #05f;
display: flex;
align-items: center;
gap:20px;
h1{
    font-size: 20px;
    font-weight: 700;
    font-family: Montserrat,sans-serif;
    width: 100%;
    color:white;
    margin-bottom: 0px;
    margin-top: 0px;
    
}
`