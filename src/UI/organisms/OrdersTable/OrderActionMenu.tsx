import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

const OrderActionMenu: FC<IOrderActionMenuProps> = ({
  anchor,
  handleClose,
  isBarcode,
  isLoading,
  getBarcode,
}) => {
  const { t } = useTranslation("live");
  return (
    <Menu open={!!anchor} onClose={handleClose} anchorEl={anchor}>
      <MenuItem
        disabled={!isBarcode}
        onClick={() => {
          getBarcode();
          handleClose();
        }}
      >
        <ListItemText>{t`generateBarcode`}</ListItemText>
        <ListItemIcon>
          {isLoading && <CircularProgress color="primary" size={20} />}
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
};

export default memo(OrderActionMenu);
