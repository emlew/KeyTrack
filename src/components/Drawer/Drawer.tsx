import { ReactNode } from "react";
import { Title } from "../Title";
import { Box, Drawer as MuiDrawer } from "@mui/material";
import {
  StyledButton,
  StyledButtonBox,
  StyledDrawerContent,
  StyledDrawerLayout,
} from "./Drawer.styles";
import { useDrawer } from "@/hooks";

type DrawerProps = {
  title: string;
  confirmButtonText?: string;
  onConfirm: () => void;
  children: ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  title,
  confirmButtonText = "Save",
  onConfirm,
  children,
}) => {
  const { closeDrawer } = useDrawer();

  return (
    <MuiDrawer open={true} anchor={"right"}>
      <StyledDrawerLayout>
        <Box>
          <Title title={title} />
          <StyledDrawerContent>{children}</StyledDrawerContent>
        </Box>
        <StyledButtonBox>
          <StyledButton onClick={closeDrawer}>Cancel</StyledButton>
          <StyledButton variant={"contained"} onClick={onConfirm}>
            {confirmButtonText}
          </StyledButton>
        </StyledButtonBox>
      </StyledDrawerLayout>
    </MuiDrawer>
  );
};

export default Drawer;
