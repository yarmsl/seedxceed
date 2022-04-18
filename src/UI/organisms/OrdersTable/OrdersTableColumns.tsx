import { Box, Tooltip, Typography } from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { currency, dateWithTime } from "lib/helpers";
import Image from "UI/atoms/Image/Image";

const iconByMp = (mp: supportedMarketTypes | undefined) =>
  marketPlaceConf.find((c) => c.mp === mp)?.SvgIcon;

export const OrdersTableColumns: IOrdersTableColumns[] = [
  {
    id: "date",
    label: "dateTime",
    format: (date) => dateWithTime(date as string),
  },
  {
    id: "photo",
    label: "photo",
    format: (photo) => <Image width="54px" height="52px" img={`${photo}`} />,
  },
  {
    id: "name",
    label: "nameBrand",
    format: (name, data) => {
      const Icon = iconByMp(data?.marketplace);
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Tooltip title={name}>
              <Typography
                sx={{
                  width: { xs: "180px", md: "300px", lg: "600px" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Typography>
            </Tooltip>
            <Typography sx={{ fontSize: "14px", opacity: "0.54" }}>
              {data?.brand}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "24px",
              ml: "12px",
              "& svg": {
                width: "100%",
              },
            }}
          >
            {Icon && <Icon />}
          </Box>
        </Box>
      );
    },
  },
  {
    id: "total_price",
    label: "sum",
    format: (sum) => currency(+sum),
  },
];
