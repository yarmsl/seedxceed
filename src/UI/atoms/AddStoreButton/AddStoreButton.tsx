import { Button, IconButton, SxProps } from "@mui/material";
import { memo, useMemo } from "react";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStoreButton = ({ isPortable }: IAddStoreButtonProps) => {
  const nav = useNavigate();
  const loc = useLocation();
  const isTargetPage = useMemo(
    () => loc.pathname === "/mp_connect",
    [loc.pathname]
  );
  const { t } = useTranslation("apiConnection");
  if (!isPortable) {
    return (
      <Button
        startIcon={<AddBusinessOutlinedIcon />}
        variant="contained"
        onClick={() => nav("mp_connect")}
        sx={isTargetPage ? hide : styles.root}
        disabled={isTargetPage}
      >{t`addStore`}</Button>
    );
  } else {
    return (
      <IconButton
        sx={isTargetPage ? hide : styles.root}
        color="primary"
        onClick={() => nav("mp_connect")}
        disabled={isTargetPage}
      >
        <AddBusinessOutlinedIcon />
      </IconButton>
    );
  }
};

const styles: Record<string, SxProps> = {
  root: {
    whiteSpace: "nowrap",
    opacity: 1,
    transition: "opacity 250ms ease-in-out",
  },
  unroot: {
    opacity: 0,
  },
};

const hide = { ...styles.root, ...styles.unroot };

export default memo(AddStoreButton);
