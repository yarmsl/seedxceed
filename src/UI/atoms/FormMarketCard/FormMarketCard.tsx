import { Box, SxProps, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { linkedShopsWithMpColorAndIconSelector } from "store/Dashboard";
import { openModal } from "../../../store/ModalStack";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";

import { AddMarketForm } from "../../organisms/AddMarketForm/AddMarketForm";
import { StoreCardList } from "../StoreCardList/StoreCardList";

export const FormMarketCard = () => {
  const { t } = useTranslation("apiConnection");

  const linkedShops = useAppSelector(linkedShopsWithMpColorAndIconSelector);
  const dispatch = useDispatch();

  return (
    <Box>
      <Box sx={styles.top}>
        <Typography sx={{ mr: "12px" }} variant="h6">{t`myStores`}</Typography>
        <Button
          type="submit"
          variant="outlined"
          startIcon={<AddBusinessOutlinedIcon />}
          onClick={() => dispatch(openModal(<AddMarketForm />))}
        >
          {t`add`}
        </Button>
      </Box>
      <Box sx={styles.cards}>
        {linkedShops.map((shop) => (
          <StoreCardList
            key={shop.token}
            token={shop.token}
            companyTitle={shop.title}
            shopTitle={shop.shop_title}
            mp={shop.mp}
            id={shop.id}
            phone={shop.phone}
            clientId={shop.clientId}
            SvgIcon={shop.SvgIcon}
          />
        ))}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    m: "12px 0",
    p: "12px",
  },
  cardModal: {
    position: "relative",
  },
  cards: {
    width: "100%",
    p: "6px",
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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
};

export default FormMarketCard;
