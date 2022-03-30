import { memo } from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TopSalesItem from "../../atoms/TopSalesItem/TopSalesItem";
import { useAppSelector } from "../../../store";
import { useMedia } from "lib/useMedia";
import { topSalesSelector } from "../../../store/Dashboard/Dashboard.selectors";

const TopSales = ({ data }: ITopSalesProps): JSX.Element => {
  const { t } = useTranslation("cash");
  const topSales = useAppSelector(topSalesSelector);
  const { isPortable } = useMedia();

  return (
    <Box
      sx={{
        ...styles.root,
        maxWidth:
          data != null ? (isPortable ? "100%" : "calc(50% - 5px)") : "400px",
        boxShadow: data != null ? "none" : 23,
      }}
    >
      <Typography sx={styles.title}>{t`topSellings`}</Typography>
      {data != null
        ? data.map((item, idx) => {
            return (
              <TopSalesItem
                title={item?.name}
                linkPhoto={item?.photo}
                count={item?.count}
                nmId={item?.nm_id}
                userId={item?.user_id}
                mp={item?.mp}
                key={`item_${idx + 1}`}
              />
            );
          })
        : topSales.map((item, idx) => {
            return (
              <TopSalesItem
                title={item?.name}
                linkPhoto={item?.photo}
                count={item?.count}
                nmId={item?.nm_id}
                userId={item?.user_id}
                mp={item?.mp}
                key={`item_${idx + 1}`}
              />
            );
          })}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "388px",
    minWidth: "300px",
    backgroundColor: "secondary.main",
    borderRadius: "12px",
    p: "24px 16px",
    position: "relative",
    zIndex: 0,
  },
  title: {
    fontWeight: 700,
    color: "common.black",
    fontSize: "20px",
    mb: "20px",
  },
};

export default memo(TopSales);
