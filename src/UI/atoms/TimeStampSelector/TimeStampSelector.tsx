import { Box, IconButton, MenuItem, TextField, SxProps } from "@mui/material";
import { timeStampsConf } from "configuration/timeStamps.conf";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import { setTimeStamp } from "store/UI";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { useUiSelectors } from "lib/useUiSelectors";

const TimeStampSelector = ({ isPortable }: ITimeStampSelectorProps) => {
  const dispatch = useAppDispatch();
  const { timeStampSelector, locale } = useAppSelector((st) => st.ui);
  const { t } = useTranslation("date");
  const { tsType } = useUiSelectors();
  const timeStamps = useMemo(
    () =>
      timeStampsConf.map((ts) =>
        ts.title === "month"
          ? {
              ...ts,
              title: `${t`for`} ${new Date().toLocaleDateString(locale, {
                month: "long",
              })}`,
            }
          : { ...ts, title: t(ts.title) }
      ),
    [locale, t]
  );
  const [open, setOpen] = useState(false);

  const setTs = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch(setTimeStamp(e.target.value as timeStampTypes));
    },
    [dispatch]
  );

  const toggleSelect = useCallback(
    () => tsType != null && setOpen((p) => !p),
    [tsType]
  );

  return (
    <Box sx={tsType === null ? hide : styles.root}>
      <TextField
        label={t`period`}
        name="timeStamp"
        disabled={tsType == null}
        select
        size="small"
        value={timeStampSelector}
        onChange={setTs}
        sx={styles.tf}
        SelectProps={{
          open: open,
          onClick: toggleSelect,
        }}
      >
        {timeStamps.map((ts) => (
          <MenuItem key={ts.ts} value={ts.ts}>
            {ts.title}
          </MenuItem>
        ))}
      </TextField>
      {isPortable && (
        <IconButton onClick={toggleSelect}>
          <DateRangeRoundedIcon />
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
};

const hide = { ...styles.root, ...styles.unroot };

export default memo(TimeStampSelector);
