import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store";

const ProfileButton = () => {
  const nav = useNavigate();
  const { first_name } = useAppSelector((st) => st.user.data);

  return (
    <ListItemButton
      onClick={() => nav("profile")}
      sx={styles.root}
      disableGutters
    >
      <ListItemIcon>
        <Avatar sx={styles.avatar} />
      </ListItemIcon>
      <ListItemText sx={{ ml: "5px" }}>{first_name}</ListItemText>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "5px 10px 5px 5px",
    borderRadius: 1,
    whiteSpace: "nowrap",
    color: "common.black",
  },
  avatar: {
    width: "34px",
    height: "34px",
    bgcolor: "#FFC107",
    color: "#fff",
  },
};

export default memo(ProfileButton);
