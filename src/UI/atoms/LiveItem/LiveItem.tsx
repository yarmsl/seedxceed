import { Box, SxProps, Typography, Tooltip, Divider } from "@mui/material";
import { memo, useMemo } from "react";
import { ReactComponent as OrdersIcon } from "../../../assets/icons/orders.svg";
import { ReactComponent as SalesIcon } from "../../../assets/icons/sales.svg";
import { ReactComponent as ReturnsIcon } from "../../../assets/icons/returns.svg";
import { ReactComponent as CancellationIcon } from "../../../assets/icons/cancellation.svg";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { useTranslation } from "react-i18next";
import Image from "../Image/Image";
import { currency, dateWithTime } from "lib/helpers";
import { useNavigate } from "react-router-dom";

const LiveItem = ({ data, type }: ILiveItemProps) => {
  const { t } = useTranslation("live");
  const TypeLogo = useMemo(() => {
    switch (type) {
      case "sales":
        return SalesIcon;
      case "orders":
        return OrdersIcon;
      case "returns":
        return ReturnsIcon;
      case "cancellation":
        return CancellationIcon;
      default:
        return SalesIcon;
    }
  }, [type]);

  const typeColor = useMemo(() => {
    switch (type) {
      case "sales":
        return "#00C853";
      case "orders":
        return "#2196F3";
      case "returns":
        return "#ED6C02";
      case "cancellation":
        return "#D84315";
      default:
        return "#00C853";
    }
  }, [type]);

  const MpLogo = useMemo(
    () =>
      marketPlaceConf.find((conf) => conf.mp === data[0].marketplace)?.SvgIcon,
    [data]
  );

  const isMany = useMemo(() => data.length > 1, [data.length]);

  const total = useMemo(
    () => currency(data.reduce((a, c) => a + c.total_price, 0)),
    [data]
  );

  const nav = useNavigate();

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.root}>
        <Box sx={{ ...styles.typeBox, color: typeColor }}>
          <Box sx={{ ...styles.type, borderColor: typeColor }}>
            <TypeLogo />
            <Typography>{t(type)}</Typography>
          </Box>
        </Box>
        <Box sx={styles.lives}>
          {data.map((live, i) => (
            <Box sx={styles.live} key={`${type}-${i}-${live.date}`}>
              <Box sx={styles.wrap}>
                <Box
                  onClick={() =>
                    nav(
                      `/product/${live.nm_id}/${live.user_id}/${live.marketplace}`
                    )
                  }
                  sx={styles.main}
                >
                  <Image img={live.photo} />
                  <Tooltip title={live.name}>
                    <Typography sx={styles.name}>{live.name}</Typography>
                  </Tooltip>
                </Box>
                <Box sx={styles.mpLogo}>
                  <Tooltip title={live.brand}>
                    <Typography sx={styles.brand}>{live.brand}</Typography>
                  </Tooltip>
                  {MpLogo && <MpLogo />}
                </Box>
              </Box>
              <Typography sx={styles.price}>
                {currency(live.total_price)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={styles.date}>{dateWithTime(data[0].date)}</Typography>
      </Box>
      {isMany && (
        <>
          <Divider />
          <Box sx={styles.total}>
            <Typography>{`${t`total`}: ${total}`}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 1,
    bgcolor: "background.default",
  },
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    p: { xs: "12px", md: "12px 6%" },
    flexWrap: { xs: "wrap", md: "nowrap" },
  },
  typeBox: {
    width: "150px",
    display: "flex",
    alignItems: "flex-start",
    mr: "12px",
    mb: { xs: "12px", md: "0px" },
    pt: { xs: "0px", md: "16px" },
    order: 1,
    "& svg": {
      width: "24px",
      height: "24px",
      mr: "6px",
    },
  },
  type: {
    p: "4px 8px",
    display: "flex",
    borderWidth: "1px",
    borderColor: "common.black",
    borderStyle: "solid",
    borderRadius: 2,
  },
  lives: {
    flexGrow: 1,
    order: { xs: 3, md: 2 },
    display: "flex",
    flexDirection: "column",
    "&>*:not(:last-of-type)": {
      mb: "12px",
    },
  },
  live: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& p": {
      fontSize: { xs: "14px", md: "16px" },
    },
  },
  wrap: {
    display: "flex",
    flexGrow: 1,
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-evenly",
    alignItems: { xs: "flex-start", sm: "center" },
  },
  main: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  name: {
    width: { xs: "130px", sm: "200px", lg: "340px" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ml: "12px",
    mr: "6px",
  },
  mpLogo: {
    display: "flex",
    "& svg": {
      width: "24px",
      height: "24px",
    },
  },
  brand: {
    width: { md: "100px", lg: "130px" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ml: { xs: "72px", sm: "6px" },
    mr: "6px",
  },
  price: {
    width: { xs: "70px", sm: "100px" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    m: { xs: "0 6px", md: "0 32px 0 6px" },
    textAlign: "right",
  },
  total: {
    alignSelf: "flex-end",
    mr: { xs: "6px", md: "165px" },
    p: { xs: "12px", md: "12px 6%" },
  },
  date: {
    width: { xs: "30%", md: "132px" },
    pt: { xs: "0px", md: "18px" },
    textAlign: "right",
    order: { xs: 2, md: 3 },
    minWidth: "132px",
  },
};

export default memo(LiveItem);
