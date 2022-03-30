import {
  Box,
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SxProps,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import { shopsSelector, tokensSelector } from "store/Dashboard";
import { setShops } from "store/UI";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { useUiSelectors } from "lib/useUiSelectors";

const ShopsSelectors = ({ isPortable }: IShopsSelectorsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("date");
  const { shopSelector } = useAppSelector((st) => st.ui);
  const linkedShops = useAppSelector(shopsSelector);
  const shops = useAppSelector(tokensSelector);
  const { ssType } = useUiSelectors();

  const allAvailableTokens = useMemo(
    () => linkedShops.map((ls) => ls.token),
    [linkedShops]
  );

  const setLinkedShops = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (ssType === "multiple") {
        const value = e.target.value as unknown as string[];
        const filteredValue = value.filter((val) => val !== "select_all_01ab2");
        if ((e.target.value as unknown as string[]).length > 0) {
          if (value.includes("select_all_01ab2")) {
            dispatch(setShops(allAvailableTokens));
          } else {
            dispatch(setShops(filteredValue));
          }
        }
      } else {
        dispatch(setShops([e.target.value as unknown as string]));
      }
    },
    [allAvailableTokens, dispatch, ssType]
  );

  const [open, setOpen] = useState(false);
  const openSelect = useCallback(
    () => !open && ssType != null && setOpen(true),
    [open, ssType]
  );
  const closeSelect = useCallback(() => open && setOpen(false), [open]);

  useEffect(() => {
    const isShops = Array.isArray(shops) && shops.length > 0;
    if (isShops && ssType === "multiple") {
      dispatch(setShops(shops));
    } else if (isShops && ssType === "mono") {
      dispatch(setShops([shops[0]]));
    }
  }, [dispatch, shops, ssType]);

  const renderValue = useCallback(
    (selected: string[]) =>
      linkedShops
        .filter((shop) => (selected as string[]).includes(shop.token))
        .map((shop) => shop.title)
        .join(", "),
    [linkedShops]
  );

  const isManyShops = useMemo(
    () => linkedShops.length > 1,
    [linkedShops.length]
  );

  const isAllSelected = useMemo(
    () => linkedShops.length === shopSelector.length,
    [linkedShops.length, shopSelector.length]
  );

  const isShopChecked = useCallback(
    (token: string) => shopSelector.includes(token),
    [shopSelector]
  );

  return (
    <Box sx={ssType === null ? hide : styles.root}>
      <TextField
        name={ssType === "multiple" ? "linkedShops" : "linkedShop"}
        label={t`shops`}
        size="small"
        disabled={ssType == null}
        select
        value={
          ssType === "multiple" ? shopSelector : shopSelector.slice(0, 1).join()
        }
        onChange={setLinkedShops}
        sx={styles.tf}
        SelectProps={{
          multiple: ssType === "multiple",
          renderValue: (selected) => renderValue(selected as string[]),
          open: open,
          onClick: openSelect,
          onClose: closeSelect,
        }}
      >
        {ssType === "multiple" && isManyShops && (
          <MenuItem value="select_all_01ab2">
            <Checkbox
              size="small"
              checked={isAllSelected}
              indeterminate={!isAllSelected}
            />
            <ListItemText>{t`selectAll`}</ListItemText>
          </MenuItem>
        )}
        {linkedShops.map(({ id, token, title, SvgIcon }) => (
          <MenuItem key={id} value={token}>
            <Checkbox size="small" checked={isShopChecked(token)} />
            <ListItemText>{title}</ListItemText>
            <ListItemIcon sx={styles.icon}>
              {SvgIcon && <SvgIcon />}
            </ListItemIcon>
          </MenuItem>
        ))}
      </TextField>
      {isPortable && (
        <IconButton onClick={openSelect}>
          <StoreOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "40px", md: "auto" },
    maxWidth: "160px",
    minWidth: { xs: "auto", md: "160px" },
    transform: "scale(1)",
    transition: "all 250ms ease-in-out",
    mr: { xs: "0px", md: "12px" },
  },
  tf: {
    width: { xs: "0px", md: "100%" },
    height: { xs: "0px", md: "auto" },
    minWidth: { xs: "0px", md: "130px" },
    overflow: { xs: "hidden", md: "visible" },
  },
  unroot: {
    transform: "scale(0)",
    width: "0px",
    minWidth: "0px",
    mr: "0px!important",
  },
  icon: {
    ml: "12px",
    "& svg": {
      width: "18px",
      height: "18px",
    },
  },
};

const hide = { ...styles.root, ...styles.unroot };

export default memo(ShopsSelectors);
