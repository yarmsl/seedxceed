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
import { labeledLinkedMPSelector, linkedMPSelector } from "store/Dashboard";
import { setMPs } from "store/UI";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useUiSelectors } from "lib/useUiSelectors";

const MarketPlacesSelector = ({ isPortable }: IMarketPlacesSelectorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("date");
  const { mpSelector } = useAppSelector((st) => st.ui);
  const mps = useAppSelector(linkedMPSelector);
  const { mpsType } = useUiSelectors();
  const linkedMPs = useAppSelector(labeledLinkedMPSelector);

  const linkedMpsValues = useMemo(
    () => linkedMPs.map((lmp) => lmp.mp),
    [linkedMPs]
  );

  const setMarketPlaces = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (mpsType === "multiple") {
        const value = e.target.value as unknown as (
          | supportedMarketTypes
          | "select_all_01ab2"
        )[];
        const filteredValue = value.filter((val) => val !== "select_all_01ab2");
        if (value.length > 0) {
          if (value.includes("select_all_01ab2")) {
            dispatch(setMPs(linkedMpsValues));
          } else {
            dispatch(setMPs(filteredValue as supportedMarketTypes[]));
          }
        }
      } else {
        dispatch(setMPs([e.target.value as unknown as supportedMarketTypes]));
      }
    },
    [dispatch, linkedMpsValues, mpsType]
  );

  const [open, setOpen] = useState(false);
  const openSelect = useCallback(
    () => !open && mpsType != null && setOpen(true),
    [mpsType, open]
  );
  const closeSelect = useCallback(() => open && setOpen(false), [open]);

  const isConsistMany = useMemo(
    () => !mpSelector.map((mp) => linkedMpsValues.includes(mp)).includes(false),
    [linkedMpsValues, mpSelector]
  );

  const isConsist = useMemo(
    () => linkedMPs.map((lmp) => lmp.mp).includes(mpSelector[0]),
    [linkedMPs, mpSelector]
  );

  useEffect(() => {
    const isMps = Array.isArray(mps) && mps.length > 0;
    if (isMps && mpsType === "multiple") {
      if (mpSelector.length > 0 && isConsistMany) return;
      dispatch(setMPs(mps));
    } else if (isMps && mpsType === "mono") {
      if (mpSelector.length === 1 && isConsist) return;
      dispatch(setMPs([mps[0]]));
    }
  }, [dispatch, isConsist, isConsistMany, mpSelector.length, mps, mpsType]);

  const renderValue = useCallback(
    (selected: supportedMarketTypes[]) =>
      linkedMPs
        .filter((mp) => selected.includes(mp.mp))
        .map((mp) => mp.title)
        .join(", "),
    [linkedMPs]
  );

  const isManyMps = useMemo(() => linkedMPs.length > 1, [linkedMPs.length]);

  const isMpChecked = useCallback(
    (mp: supportedMarketTypes) => mpSelector.includes(mp),
    [mpSelector]
  );

  const isAllSelected = useMemo(
    () => linkedMPs.length === mpSelector.length,
    [linkedMPs.length, mpSelector.length]
  );

  return (
    <Box sx={mpsType === null ? hide : styles.root}>
      <TextField
        label={t`marketplace`}
        name={mpsType === "multiple" ? "marketplaces" : "marketplace"}
        size="small"
        disabled={mpsType == null}
        select
        value={
          mpsType === "multiple" ? mpSelector : mpSelector.slice(0, 1).join()
        }
        sx={styles.tf}
        SelectProps={{
          multiple: mpsType === "multiple",
          renderValue: (selected) =>
            renderValue(selected as supportedMarketTypes[]),
          open: open,
          onClick: openSelect,
          onClose: closeSelect,
        }}
        onChange={setMarketPlaces}
      >
        {mpsType === "multiple" && isManyMps && (
          <MenuItem value="select_all_01ab2">
            <Checkbox
              size="small"
              checked={isAllSelected}
              indeterminate={!isAllSelected}
            />
            <ListItemText>{t`selectAll`}</ListItemText>
          </MenuItem>
        )}
        {linkedMPs.map(({ mp, title, SvgIcon }) => (
          <MenuItem key={mp} value={mp}>
            <Checkbox size="small" checked={isMpChecked(mp)} />
            <ListItemText>{title}</ListItemText>
            <ListItemIcon sx={styles.icon}>
              <SvgIcon />
            </ListItemIcon>
          </MenuItem>
        ))}
      </TextField>
      {isPortable && (
        <IconButton onClick={openSelect}>
          <StorefrontOutlinedIcon />
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
  icon: {
    ml: "12px",
    "& svg": {
      width: "18px",
      height: "18px",
    },
  },
  unroot: {
    transform: "scale(0)",
    width: "0px",
    minWidth: "0px",
    mr: "0px!important",
  },
};

const hide = { ...styles.root, ...styles.unroot };

export default memo(MarketPlacesSelector);
