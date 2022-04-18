import { FC, memo, useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  styled,
  SxProps,
  TextField,
} from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { useTranslation } from "react-i18next";
import { ru, ptBR } from "date-fns/locale";
import { LANG } from "configuration/baseUrls";
import { useAppDispatch, useAppSelector } from "store";
import { useUiSelectors } from "lib/useUiSelectors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay, { PickersDayProps } from "@mui/lab/PickersDay";
import {
  addYears,
  endOfWeek,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import { setWeek } from "store/UI";
import { toLocDate } from "lib/helpers";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...{ backgroundColor: theme.palette.background.default },
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const WeekSelector: FC<ICalendarSelectorProps> = ({ isPortable }) => {
  const dispatch = useAppDispatch();
  const { darkMode, jhonWeekSelector } = useAppSelector((st) => st.ui);
  const { d, dd } = jhonWeekSelector;
  const { t } = useTranslation("date");
  const styles = useMemo(() => stylesByMode(darkMode), [darkMode]);
  const hide = useMemo(
    () => ({ ...styles.root, ...styles.unroot }),
    [styles.root, styles.unroot]
  );
  const { tsType } = useUiSelectors();
  const [value, setValue] = useState<Date>(new Date(d));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const start = useCallback(
    (curr: Date) =>
      startOfWeek(curr, {
        locale: LANG === "ru" ? ru : ptBR,
      }),
    []
  );

  const end = useCallback(
    (curr: Date) =>
      endOfWeek(curr, {
        locale: LANG === "ru" ? ru : ptBR,
      }),
    []
  );

  const dayIsBetween = useCallback(
    (date: Date, curr: Date) =>
      isWithinInterval(date, { start: start(curr), end: end(curr) }),
    [end, start]
  );
  const isFirstDay = useCallback(
    (date: Date, curr: Date) => isSameDay(date, start(curr)),
    [start]
  );
  const isLastDay = useCallback(
    (date: Date, curr: Date) => isSameDay(date, end(curr)),
    [end]
  );
  const printVal = useMemo(() => `${toLocDate(d)} - ${toLocDate(dd)}`, [d, dd]);

  const handleWeek = useCallback(
    (newDate: Date | null) => {
      const date = newDate || new Date();
      setValue(date);
      dispatch(setWeek({ d: start(date), dd: end(date) }));
    },
    [dispatch, end, start]
  );

  const renderWeekPickerDay = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      (
        date: Date,
        _: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
      ) => {
        if (!value) {
          return <PickersDay {...pickersDayProps} />;
        }
        return (
          <CustomPickersDay
            {...pickersDayProps}
            disableMargin
            dayIsBetween={dayIsBetween(date, value)}
            isFirstDay={isFirstDay(date, value)}
            isLastDay={isLastDay(date, value)}
          />
        );
      },
    [dayIsBetween, isFirstDay, isLastDay, value]
  );

  return (
    <>
      <Box sx={tsType === "week" ? styles.root : hide}>
        <TextField
          autoComplete="off"
          size="small"
          label={t`weekOf`}
          name="week"
          sx={styles.tf}
          onClick={handleClick}
          value={printVal}
        />
        {isPortable && (
          <IconButton onClick={handleClick}>
            <DateRangeRoundedIcon />
          </IconButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={styles.menu}
      >
        <Box sx={styles.week}>
          <LocalizationProvider
            locale={LANG === "ru" ? ru : ptBR}
            dateAdapter={AdapterDateFns}
          >
            <StaticDatePicker
              label={t`weekOf`}
              displayStaticWrapperAs="desktop"
              value={value}
              onChange={handleWeek}
              renderDay={renderWeekPickerDay}
              renderInput={(params) => <TextField {...params} />}
              minDate={addYears(new Date(), -20)}
              maxDate={new Date()}
            />
          </LocalizationProvider>
          <Button
            endIcon={<CloseIcon />}
            sx={{ m: "0 12px" }}
            onClick={handleClose}
          >{t`shut`}</Button>
        </Box>
      </Menu>
    </>
  );
};

const stylesByMode = (darkMode: boolean): Record<string, SxProps> => ({
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
    "& input": {
      color: "transparent",
      textShadow: darkMode ? "0 0 0 #fff" : "0 0 0 #000",
      cursor: "pointer",
    },
  },
  unroot: {
    transform: "scale(0)",
    width: "0px",
    minWidth: "0px",
    mr: "0px!important",
  },
  menu: {
    "& .MuiPickerStaticWrapper-root": {
      bgcolor: "background.default",
    },
  },
  week: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

export default memo(WeekSelector);
