import {
  addDays,
  differenceInDays,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfYear,
} from "date-fns";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store";
import { ru, ptBR } from "date-fns/locale";
import { LANG } from "configuration/baseUrls";
import { Range } from "react-date-range";

interface ILabeledTimeStamp extends ICalendarSelector {
  label: string;
}

export const useDefaultRanges = () => {
  const { t } = useTranslation("date");
  const { locale } = useAppSelector((st) => st.ui);
  const fnsLocale = useMemo(() => (LANG === "ru" ? ru : ptBR), []);

  const weekStart = useMemo(
    () => startOfWeek(new Date(), { locale: fnsLocale }),
    [fnsLocale]
  );
  const weekEnd = useMemo(
    () => endOfWeek(new Date(), { locale: fnsLocale }),
    [fnsLocale]
  );
  const sevenDaysAgo = useMemo(() => addDays(new Date(), -6), []);
  const startOfToday = useMemo(() => startOfDay(new Date()), []);
  const endOfToday = useMemo(() => endOfDay(new Date()), []);
  const startOfYesterday = useMemo(
    () => startOfDay(addDays(new Date(), -1)),
    []
  );
  const monthStart = useMemo(() => startOfMonth(new Date()), []);
  const monthEnd = useMemo(() => endOfMonth(new Date()), []);
  const thrtyDaysAgo = useMemo(() => addDays(new Date(), -29), []);
  const nintyDaysAgo = useMemo(() => addDays(new Date(), -89), []);
  const eternityAgo = useMemo(
    () => startOfYear(addDays(new Date(), -3333)),
    []
  );

  const forMonth = useMemo(
    () =>
      `${t`for`} ${new Date().toLocaleDateString(locale, {
        month: "long",
      })}`,
    [locale, t]
  );

  const isEqual = useCallback(
    (st1: Date, st2: Date, end1: Date, end2: Date) =>
      isSameDay(st1, st2) && isSameDay(end1, end2),
    []
  );

  const dCount = useCallback(
    (date: Date) => Math.abs(differenceInDays(startOfDay(date), endOfToday)),
    [endOfToday]
  );

  const dateWithShortYear = useCallback(
    (date: Date) =>
      date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
    [locale]
  );

  const smartRange = useCallback(
    (range: Range[]): ILabeledTimeStamp => {
      if (!Array.isArray(range) || range.length < 1)
        return { label: t`today`, d: 1, dd: 1 };
      const { startDate, endDate } = range[0];
      if (startDate == null || endDate == null)
        return { label: t`today`, d: 1, dd: 1 };
      if (isEqual(startDate, startOfToday, endDate, startOfToday))
        return { label: t`today`, d: 1, dd: 1 };
      else if (isEqual(startDate, startOfYesterday, endDate, startOfYesterday))
        return { label: t`yesterday`, d: "yesterday", dd: 0 };
      else if (isEqual(startDate, weekStart, endDate, weekEnd))
        return { label: t`week`, d: "week", dd: 0 };
      else if (isEqual(startDate, sevenDaysAgo, endDate, startOfToday))
        return { label: t`7days`, d: 7, dd: 7 };
      else if (isEqual(startDate, monthStart, endDate, monthEnd))
        return { label: forMonth, d: "month", dd: 0 };
      else if (isEqual(startDate, thrtyDaysAgo, endDate, startOfToday))
        return { label: t`30days`, d: 30, dd: 30 };
      else if (isEqual(startDate, nintyDaysAgo, endDate, startOfToday))
        return { label: t`90days`, d: 90, dd: 90 };
      else if (isEqual(startDate, eternityAgo, endDate, startOfToday))
        return { label: t`wholePeriod`, d: "all", dd: 0 };
      else {
        return isSameDay(startDate, endDate)
          ? {
              label: dateWithShortYear(startDate),
              d: dCount(startDate) + 1,
              dd: 1,
            }
          : {
              label: `${dateWithShortYear(startDate)} - ${dateWithShortYear(
                endDate
              )}`,
              d: dCount(startDate) + 1,
              dd:
                Math.abs(
                  differenceInDays(startOfDay(startDate), endOfDay(endDate))
                ) + 1,
            };
      }
    },
    [
      dCount,
      dateWithShortYear,
      eternityAgo,
      forMonth,
      isEqual,
      monthEnd,
      monthStart,
      nintyDaysAgo,
      sevenDaysAgo,
      startOfToday,
      startOfYesterday,
      t,
      thrtyDaysAgo,
      weekEnd,
      weekStart,
    ]
  );

  const ts2DefaultDate = useCallback(
    (d: timeStampTypes, dd: number): { startDate: Date; endDate: Date } => {
      if (d === "yesterday")
        return { startDate: startOfYesterday, endDate: startOfYesterday };
      else if (d === "week") return { startDate: weekStart, endDate: weekEnd };
      else if (d === "month")
        return { startDate: monthStart, endDate: monthEnd };
      else if (d === "all")
        return { startDate: eternityAgo, endDate: startOfToday };
      else if (d === 1 && dd === 1)
        return { startDate: startOfToday, endDate: startOfToday };
      else if (d === 7 && dd === 7)
        return { startDate: sevenDaysAgo, endDate: startOfToday };
      else if (d === 30 && dd === 30)
        return { startDate: thrtyDaysAgo, endDate: startOfToday };
      else if (d === 90 && dd === 90)
        return { startDate: nintyDaysAgo, endDate: startOfToday };
      else
        return {
          startDate: addDays(new Date(), -1 * d + 1),
          endDate: addDays(addDays(new Date(), -1 * d + 1), dd - 1),
        };
    },
    [
      eternityAgo,
      monthEnd,
      monthStart,
      nintyDaysAgo,
      sevenDaysAgo,
      startOfToday,
      startOfYesterday,
      thrtyDaysAgo,
      weekEnd,
      weekStart,
    ]
  );

  const staticRangeHandler = useMemo(
    () => ({
      range: () => ({ startDate: new Date(), endDate: new Date() }),
      isSelected(range: { startDate: number | Date; endDate: number | Date }) {
        const definedRange = this.range();
        return (
          isSameDay(range.startDate, definedRange.startDate) &&
          isSameDay(range.endDate, definedRange.endDate)
        );
      },
    }),
    []
  );

  const createStaticRanges = useCallback(
    (
      ranges: {
        range: () => {
          startDate: number | Date;
          endDate: number | Date;
        };
        label: string;
      }[]
    ) => {
      return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
    },
    [staticRangeHandler]
  );

  const defaultStaticRanges = useMemo(
    () =>
      createStaticRanges([
        {
          label: t`today`,
          range: () => ({
            startDate: startOfToday,
            endDate: startOfToday,
          }),
        },
        {
          label: t`yesterday`,
          range: () => ({
            startDate: startOfYesterday,
            endDate: startOfYesterday,
          }),
        },
        {
          label: t`week`,
          range: () => ({
            startDate: weekStart,
            endDate: weekEnd,
          }),
        },
        {
          label: t`7days`,
          range: () => ({
            startDate: sevenDaysAgo,
            endDate: startOfToday,
          }),
        },
        {
          label: forMonth,
          range: () => ({
            startDate: monthStart,
            endDate: monthEnd,
          }),
        },
        {
          label: t`30days`,
          range: () => ({
            startDate: thrtyDaysAgo,
            endDate: startOfToday,
          }),
        },
        {
          label: t`90days`,
          range: () => ({
            startDate: nintyDaysAgo,
            endDate: startOfToday,
          }),
        },
        {
          label: t`wholePeriod`,
          range: () => ({
            startDate: eternityAgo,
            endDate: startOfToday,
          }),
        },
      ]),
    [
      createStaticRanges,
      eternityAgo,
      forMonth,
      monthEnd,
      monthStart,
      nintyDaysAgo,
      sevenDaysAgo,
      startOfToday,
      startOfYesterday,
      t,
      thrtyDaysAgo,
      weekEnd,
      weekStart,
    ]
  );
  return { defaultStaticRanges, smartRange, ts2DefaultDate };
};
