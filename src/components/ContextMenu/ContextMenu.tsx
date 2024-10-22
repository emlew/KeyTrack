import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { ReactNode, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import { theme } from "@/styles";

type MenuItem = {
  title: string;
  icon: ReactNode;
  isDestructive?: boolean;
  callback: (param: string) => Promise<void>;
};

export const ContextMenu: React.FC<{
  items: MenuItem[];
  id: string;
}> = ({ items, id }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem
            key={item.title}
            onClick={() => {
              item.callback(id);
              handleClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              sx={
                item.isDestructive
                  ? { color: theme.palette.warning.main }
                  : undefined
              }
            >
              {item.title}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ContextMenu;
