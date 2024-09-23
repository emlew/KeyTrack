import { ReactNode } from "react";
import { StyledCard } from "./Card.styles";

export const Card: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
