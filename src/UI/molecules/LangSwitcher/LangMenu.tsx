import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  SxProps,
} from "@mui/material";
import { flagUrl } from "lib/helpers";
import { memo } from "react";

const LangMenu = ({
  anchor,
  handleClose,
  handleLang,
  items,
}: ILangMenuProps): JSX.Element => {
  return (
    <Menu
      sx={styles.root}
      open={!!anchor}
      onClose={handleClose}
      anchorEl={anchor}
    >
      {items.map((item) => (
        <ListItemButton
          onClick={() => {
            handleLang(item.lang);
            handleClose();
          }}
          key={item.lang}
        >
          <ListItemIcon sx={styles.icon}>
            <img
              src={flagUrl(item.icon.toUpperCase().substring(0, 2))}
              alt={item.icon}
            />
          </ListItemIcon>
          <ListItemText sx={{ ml: "28px" }}>{item.title}</ListItemText>
        </ListItemButton>
      ))}
    </Menu>
  );
};

const styles: Record<string, SxProps> = {
  icon: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: 3,
    "& img": {
      width: "100%",
      height: "100%",
      maxWidth: "34px",
      maxHeight: "34px",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default memo(LangMenu);
