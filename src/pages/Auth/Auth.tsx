import logo from "/LogoWithText.svg";
import {
  ContentWrapper,
  StyledDivider,
  StyledPage,
} from "./Auth.styles";
import { Login } from "@/components";

export const Auth: React.FC = () => {
  return (
    <StyledPage>
      <ContentWrapper>
        <img src={logo} alt="KeyTrack logo" />
        <StyledDivider />
        <Login />
      </ContentWrapper>
    </StyledPage>
  );
};

export default Auth;
