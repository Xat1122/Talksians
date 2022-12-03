import styled from 'styled-components';

export const PasswordInformationContent=styled.div`
display:flex;
flex-direction: column;
gap:30px;
margin-top: 50px;
.InputGroup{
    display:flex;
    flex-direction: column;
    gap:0px;
    padding-left: 40px;
padding-right: 20px;
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
    width: 100%;
    outline: none;
    &:focus{
        border: 2px solid #A020F0;
        }
    }
    .button-container .SaveButton{
            background-color: #A020F0;
            padding: 15px 40px;
            color:white;
            border: none;
            font-family: "Montserrat";
            border-radius: 5px;
            margin-bottom: 20px;
        }
}

`