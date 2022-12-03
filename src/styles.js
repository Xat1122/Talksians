import styled from "styled-components";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
export const Logo = styled.h1`
  font-weight: 500;
  display: inline-block;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;
export const LeftContainer = styled.div`
  background-image: url(${({ bgImg }) => bgImg});
  height: ${({ height }) => (height ? "100%" : "100vh")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    height: 20vh;
    background: none;
  }
`;
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding-top: ${({ paddingTop }) => (paddingTop ? "50px" : "0px")};
  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;
export const Heading1 = styled.h1`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.headingColor};
  @media (max-width: 340px) {
    font-size: 1em;
  }
`;
export const TextFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 70%;

  gap: 20px;
`;
export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
`;
export const InputField = styled(TextField)`
  width: 80%;
  background-color: white;
  border-color: ${({ theme }) => theme.colors.light} !important;

  font-family: "Montserrat";
  ::placeholder {
    font-family: "Montserrat";
  }
  label {
    font-family: "Montserrat";
    color: ${({ theme }) => theme.colors.lightGray};
    font-weight: 100;
  }
  & label.Mui-focused {
    color: ${({ theme }) => theme.colors.light};
  }
  & .MuiOutlinedInput-root.Mui-focused {
    & fieldset {
      border-color: ${({ theme }) => theme.colors.light};
    }
  }
`;
export const MyButton = styled.button`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;
  padding: 10px 0px 10px 0px;
  color: white;
  border: none;
`;
export const PageLink = styled(Link)`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  padding-bottom: ${({ paddingBottom }) => (paddingBottom ? "20px" : "0px")};
`;
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DashboardContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  .sidebar-container {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 40px;
    position: sticky;
    top: 0;

    height: 100vh;
    z-index: 0;

    overflow-y: scroll;
    background: 0 0;
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 10px;
      margin-top: 120px;
    }
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 40px;
    position: sticky;
    top: 0;
    width: 320px !important;
    height: 100vh;
    z-index: 0;

    overflow-y: scroll;
    background: 0 0;
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 10px;
      margin-top: 120px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
      border-radius: 10px;
    }
  }
  .sidebar-right-container {
    padding-left: 10px;

    padding-top: 10px;
    padding-bottom: 40px;
    position: sticky;
    top: 0;
    width: 380px !important;
    height: 100vh;
    z-index: 0;

    overflow-y: scroll;
    background: 0 0;
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 10px;
      margin-top: 120px;
    }
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 40px;
    position: sticky;
    top: 0;
    width: 280px;
    height: 100vh;
    z-index: 0;

    overflow-y: scroll;
    background: 0 0;
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 10px;
      margin-top: 120px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
      border-radius: 10px;
    }
  }
`;
