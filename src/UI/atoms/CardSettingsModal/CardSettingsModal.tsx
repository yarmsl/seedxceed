import { SxProps, ListItemText, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useDeleteShopMutation } from "store/Dashboard";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";
import { UpdateCardForm } from "../../organisms/UpdateCardForm/UpdateCardForm";
import { memo, useCallback } from "react";
import { openModal } from "store/ModalStack";

interface IProps {
  open: boolean;
  id: number;
  shopTitle: string;
  phone: string;
  clientId: string;
  companyTitle: string;
  mp: string;
  token: string;
  anchor: null | HTMLElement;
  close: () => void;
}

export const CardSettingsModal = ({
  open,
  id,
  shopTitle,
  phone,
  companyTitle,
  close,
  anchor,
}: IProps) => {
  const { t } = useTranslation("apiConnection");
  const dispatch = useDispatch();

  const [deleteShop] = useDeleteShopMutation();

  const deleteStore = useCallback(async () => {
    const data = {
      id,
    };
    try {
      await deleteShop(data).unwrap();
      dispatch(showSuccessSnackbar(`Shop  deleted `));
    } catch (e) {
      dispatch(showErrorSnackbar(`Delete shop error `));
    }
  }, [deleteShop, dispatch, id]);

  return (
    <>
      <Menu variant="menu" open={open} onClose={close} anchorEl={anchor}>
        <MenuItem sx={styles.textBox}>
          <ListItemText
            onClick={() => {
              dispatch(
                openModal(
                  <UpdateCardForm
                    id={id}
                    shopTitle={shopTitle}
                    phone={phone}
                    companyTitle={companyTitle}
                  />
                )
              );
            }}
          >{t`edit`}</ListItemText>
        </MenuItem>
        <MenuItem sx={styles.textBox} onClick={deleteStore}>
          <ListItemText>{t`delete`}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const styles: Record<string, SxProps> = {
  textBox: {
    border: "1px solid #F5F5F5",
    p: "12px",
    borderRadius: "5px",
  },
};

export default memo(CardSettingsModal);
