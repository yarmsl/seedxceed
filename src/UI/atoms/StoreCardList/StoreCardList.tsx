import {
  Box,
  SxProps,
  Typography,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReactComponent as SettingsSvg } from "../../../assets/icons/settings.svg";
import { useState, useCallback, useMemo, MouseEvent } from "react";
import { CardSettingsModal } from "../CardSettingsModal/CardSettingsModal";

interface IProps {
  mp: string;
  companyTitle: string;
  shopTitle: string;
  id: number;
  phone: string;
  clientId: string;
  token: string;
  SvgIcon: IconType;
}

export const StoreCardList = ({
  mp,
  companyTitle,
  shopTitle,
  id,
  phone,
  clientId,
  token,
  SvgIcon,
}: IProps) => {
  const { t } = useTranslation("apiConnection");

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = useMemo(() => !!anchor, [anchor]);
  const handleOpenMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchor(null);
  }, []);

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <ListItemIcon sx={styles.icon}>
              <SvgIcon />
            </ListItemIcon>
          </Box>
          <Box sx={styles.cardModal}>
            <CardSettingsModal
              open={open}
              anchor={anchor}
              close={handleCloseMenu}
              token={token}
              id={id}
              shopTitle={shopTitle}
              phone={phone}
              clientId={clientId}
              companyTitle={companyTitle}
              mp={mp}
            />
            <IconButton onClick={handleOpenMenu}>
              <SettingsSvg />
            </IconButton>
          </Box>
        </Box>

        <Box sx={styles.cardText}>
          <Typography sx={styles.heading}>{t`companyTitle`}</Typography>
          <Typography sx={styles.description}>{companyTitle}</Typography>
        </Box>
        <Box sx={styles.cardText}>
          <Typography sx={styles.heading}>{t`store`}</Typography>
          <Typography sx={styles.description}>{shopTitle}</Typography>
        </Box>
        <Box sx={styles.cardText}>
          <Typography sx={styles.heading}>{t`storeStatus`}</Typography>
          <Typography sx={styles.description}>{t`active`}</Typography>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: {
      xs: "100%",
      sm: "calc(50% - 12px)",
      md: "calc(33.333% - 12px)",
      lg: "342px",
    },
    bgcolor: "background.default",
    borderRadius: "12px",
    padding: "20px 16px 16px",
    m: "6px",
  },
  icon: {
    height: "30px",
    width: "30px",
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
  cardModal: {
    position: "relative",
    cursor: "pointer",
  },

  cardText: {
    border: "1px solid #F5F5F5",
    marginTop: "1rem",
    padding: "10px",
    borderRadius: "12px",
  },
  heading: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
  },
  description: {
    color: "#757575",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },
  storeTitle: {
    color: "common.black",
    fontWeight: 700,
    fontSize: "20px",
    mr: "25px",
    paddingBottom: "24px",
  },
};

export default StoreCardList;
