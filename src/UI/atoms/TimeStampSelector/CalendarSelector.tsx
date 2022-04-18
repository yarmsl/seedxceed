import { FC, memo, MouseEvent, useCallback, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  SxProps,
  Menu,
  Button,
} from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import {
  DateRangePicker,
  Range,
  RangeKeyDict,
  StaticRange,
} from "react-date-range";
import { ru, ptBR } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { LANG } from "configuration/baseUrls";
import { useDefaultRanges } from "./useDefaultRanges";
import { useAppDispatch, useAppSelector } from "store";
import { setCalendar } from "store/UI";
import { useUiSelectors } from "lib/useUiSelectors";

const CalendarSelector: FC<ICalendarSelectorProps> = ({ isPortable }) => {
  const dispatch = useAppDispatch();
  const { darkMode, calendarSelector } = useAppSelector((st) => st.ui);
  const { d, dd } = calendarSelector;
  const { t } = useTranslation("date");
  const { defaultStaticRanges, smartRange, ts2DefaultDate } =
    useDefaultRanges();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const styles = useMemo(() => stylesByMode(darkMode), [darkMode]);
  const hide = useMemo(
    () => ({ ...styles.root, ...styles.unroot }),
    [styles.root, styles.unroot]
  );
  const { tsType } = useUiSelectors();

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const range2: Range[] = useMemo(
    () => [{ key: "selection", ...ts2DefaultDate(d, dd) }],
    [d, dd, ts2DefaultDate]
  );

  const { label } = useMemo(() => smartRange(range2), [range2, smartRange]);

  const handleCalendar = useCallback(
    (item: RangeKeyDict) => {
      const { d, dd } = smartRange([item.selection]);
      dispatch(setCalendar({ d, dd }));
    },
    [dispatch, smartRange]
  );

  return (
    <>
      <Box sx={tsType === "period" ? styles.root : hide}>
        <TextField
          autoComplete="off"
          size="small"
          label={t`period`}
          name="calendar"
          sx={styles.tf}
          onClick={handleClick}
          value={label}
        />
        {isPortable && (
          <IconButton onClick={handleClick}>
            <DateRangeRoundedIcon />
          </IconButton>
        )}
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={styles.calendar}>
          <DateRangePicker
            onChange={handleCalendar}
            moveRangeOnFirstSelection={false}
            months={1}
            maxDate={new Date()}
            ranges={range2}
            direction="horizontal"
            locale={LANG === "ru" ? ru : ptBR}
            showDateDisplay={false}
            staticRanges={defaultStaticRanges as StaticRange[]}
            inputRanges={[]}
            color="#3ab1f4"
          />
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
  calWrapper: {
    width: "800px",
    maxWidth: "800px",
    bgcolor: "transparent",
    boxShadow: 5,
  },
  calendar: {
    fontFamily: "inherit",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "& .rdrDateRangePickerWrapper": {
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
    },
    "& .rdrDefinedRangesWrapper": {
      width: "160px",
      bgcolor: "transparent",
      border: "none",
    },
    "& .rdrStaticRanges": {
      width: { xs: "300px", sm: "auto" },
      flexDirection: { xs: "row", sm: "column" },
      flexWrap: { xs: "wrap", sm: "unset" },
    },
    "& .rdrStaticRange": {
      fontFamily: "inherit",
      color: "inherit",
      bgcolor: "transparent",
      border: "none",
      "&:hover .rdrStaticRangeLabel": {
        bgcolor: "background.paper",
      },
    },
    "& .rdrInputRanges": {
      display: "none",
    },
    "& .rdrCalendarWrapper": {
      bgcolor: "transparent",
    },
    "& .rdrNextPrevButton": {
      bgcolor: "background.paper",
      "&:hover": {
        bgcolor: darkMode ? "primary.main" : "secondary.light",
      },
    },
    "& .rdrNextButton": {
      "& i": {
        borderColor: darkMode
          ? "transparent transparent transparent #fff"
          : "transparent transparent transparent #757575",
      },
    },
    "& .rdrPprevButton": {
      "& i": {
        borderColor: darkMode
          ? "transparent #fff transparent transparent"
          : "transparent #757575 transparent transparent",
      },
    },
    "& .rdrMonthAndYearPickers": {
      "& select": {
        color: "text.secondary",
        "& option": {
          bgcolor: "background.default",
        },
        "&:hover": {
          bgcolor: "background.paper",
        },
      },
    },
    "& .rdrDayNumber": {
      top: "0px",
      bottom: "0px",
      "& span": {
        color: "text.secondary",
      },
    },
    "& .rdrMonthName, .rdrWeekDay": {
      color: "text.secondary",
    },
    "& .rdrDayDisabled": {
      bgcolor: darkMode ? "grey.900" : "grey.100",
    },
    "& .rdrDayToday .rdrDayNumber span": {
      "&:after": {
        bottom: "10px",
      },
    },

    "& .rdrMonth": {
      width: "300px !important",
    },
    "& .rdrDay": {
      width: "40px !important",
      height: "40px !important",
    },
    "& .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge": {
      top: "3px",
      bottom: "3px",
    },
    "& .rdrDayHovered": {
      borderRadius: "50%",
    },
    "& .rdrInRange": {
      backgroundColor: "#2196F3",
    },
    "& .rdrEndEdge": {
      backgroundColor: "#2196F3",
      right: "3px",
      borderTopRightRadius: "50% !important",
      borderBottomRightRadius: "50% !important",
    },
    "& .rdrStartEdge": {
      backgroundColor: "#2196F3",
      borderTopLeftRadius: "50% !important",
      borderBottomLeftRadius: "50% !important",
      left: "3px",
    },
    "& .rdrDayInPreview": {
      borderTop: "1px solid #2196F3",
      borderBottom: "1px solid #2196F3",
    },
    "& .rdrDayStartPreview": {
      borderTopLeftRadius: "50% !important",
      borderBottomLeftRadius: "50% !important",
      left: "3px",
      borderLeft: "1px solid #2196F3",
      borderTop: "1px solid #2196F3",
      borderBottom: "1px solid #2196F3",
    },

    "& .rdrDayEndPreview": {
      borderTopRightRadius: "50% !important",
      borderBottomRightRadius: "50% !important",
      right: "3px",
      borderRight: " 1px solid #2196F3",
      borderTop: "1px solid #2196F3",
      borderBottom: "1px solid #2196F3",
    },
    "& .rdrDayStartPreview,.rdrDayInPreview, .rdrDayEndPreview": {
      top: "3px !important",
      bottom: "3px !important",
    },

    "& .rdrDayEndOfMonth, .rdrDayEndOfWeek": {
      "& .rdrDayInPreview, .rdrDayStartPreview": {
        right: "3px !important",
        borderTop: "1px solid #2196F3",
        borderBottom: "1px solid #2196F3",
        borderRight: "1px solid #2196F3",
        borderLeft: "1px solid #2196F3",
      },

      "& .rdrDayStartPreview": {
        left: "3px !important",
      },
      "& .rdrInRange, .rdrStartEdge": {
        borderTopRightRadius: "50% !important",
        borderBottomRightRadius: "50% !important",
        right: "3px",
      },
    },
    "& .rdrDayStartOfMonth, .rdrDayStartOfWeek": {
      "& .rdrInRange, .rdrEndEdge": {
        borderTopLeftRadius: "50% !important",
        borderBottomLeftRadius: "50% !important",
        left: "3px",
      },
      "& .rdrDayInPreview, .rdrDayEndPreview": {
        left: "3px",
        borderTop: "1px solid #2196F3",
        borderBottom: "1px solid #2196F3",
        borderLeft: "1px solid #2196F3",
      },
      "& .rdrDayEndPreview": {
        borderRight: "1px solid #2196F3",
      },
    },
  },
});

export default memo(CalendarSelector);
