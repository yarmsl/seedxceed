import {
  Box,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  SxProps,
  TextField,
} from "@mui/material";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import { setLiveTypes } from "store/UI";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useUiSelectors } from "lib/useUiSelectors";

const ableLiveTypes: LiveNotifTypes[] = [
  "orders",
  "sales",
  "returns",
  "cancellation",
];

const LiveTypesSelector = ({ isPortable }: IShopsSelectorsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("live");
  const { liveTypesSelector } = useAppSelector((st) => st.ui);

  const { liveType } = useUiSelectors();

  const setAbleLiveTypes = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (liveType === "multiple") {
        if ((e.target.value as unknown as LiveNotifTypes[]).length > 0) {
          dispatch(setLiveTypes(e.target.value as unknown as LiveNotifTypes[]));
        }
      }
    },
    [dispatch, liveType]
  );

  const [open, setOpen] = useState(false);
  const openSelect = useCallback(
    () => !open && liveType != null && setOpen(true),
    [open, liveType]
  );
  const closeSelect = useCallback(() => open && setOpen(false), [open]);

  return (
    <Box sx={liveType == null ? hide : styles.root}>
      <TextField
        name="liveTypes"
        label={t`show`}
        size="small"
        disabled={liveType == null}
        select
        value={liveTypesSelector}
        onChange={setAbleLiveTypes}
        sx={styles.tf}
        SelectProps={{
          multiple: true,
          renderValue: (selected) =>
            (selected as LiveNotifTypes[]).map((s) => t(s)).join(", "),
          open: open,
          onClick: openSelect,
          onClose: closeSelect,
        }}
      >
        {ableLiveTypes.map((type) => (
          <MenuItem key={type} value={type}>
            <Checkbox size="small" checked={liveTypesSelector.includes(type)} />
            <ListItemText>{t(type)}</ListItemText>
          </MenuItem>
        ))}
      </TextField>
      {isPortable && (
        <IconButton onClick={openSelect}>
          <TuneRoundedIcon />
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

export default memo(LiveTypesSelector);
