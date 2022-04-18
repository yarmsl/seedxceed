import { useCallback, useState } from "react";
import { closeModalAction, openModal } from "../../../store/ModalStack";
import { useForm, FormProvider } from "react-hook-form";
import {
  ControlledTextField,
  LabeledCheckBox,
} from "../../atoms/ControlledTextFields";
import {
  Button,
  Box,
  CardContent,
  Divider,
  Grid,
  SxProps,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrowLeft.svg";
import { OfferModal } from "../OfferModal/offerModal";
import { ReactComponent as InfoSvg } from "../../../assets/icons/InfoPay.svg";
import { createPaymentThunkAction } from "store/Scanner/Scanner.actions";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";
import { useReculatePaymentMutation } from "store/Scanner/Scanner.service";

interface IPayForm {
  price: number;
  type: string;
  region: string;
  number_card: number;
  promocode: string;
  promo_price: number;
}

interface IProps {
  index: number;
}

export const PayModalScanner = ({ index }: IProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["publicOffer", "auth", "scanner"]);

  const rates_price = index === 1 ? 990 : 790;
  const [promo_price, setPromo_price] = useState(0);

  const methods = useForm<IPayForm>({
    defaultValues: {
      type: "scaner",
      region: "RU",
      number_card: index === 1 ? 1 : 10,
      promocode: "",
    },
  });
  const { handleSubmit, watch, setValue } = methods;

  const changeSumWatch = watch("number_card");

  const changeSum =
    index === 1
      ? +changeSumWatch === 0
        ? 1
        : +changeSumWatch
      : +changeSumWatch === 0
      ? 10
      : +changeSumWatch;

  const totalPrice = promo_price !== 0 ? promo_price : +changeSum * rates_price;

  const [createPromo, { isLoading }] = useReculatePaymentMutation();

  const handlePromo = useCallback(
    async (data: IPayForm) => {
      const { type, region, promocode } = data;
      try {
        const res = await createPromo({
          type,
          region,
          price: totalPrice,
          promocode,
          promo_price,
        }).unwrap();
        setPromo_price(res.promo_price);
        setValue("promocode", " ");
        dispatch(showSuccessSnackbar(t`scanner:promocodeSuccess`));
      } catch (e) {
        dispatch(showErrorSnackbar(t`scanner:promocodeFalied`));
      }
    },
    [createPromo, dispatch, promo_price, setValue, t, totalPrice]
  );

  const pay = useCallback(
    (data: IPayForm) => {
      const { type, region } = data;
      dispatch(
        createPaymentThunkAction({
          type,
          region,
          price: totalPrice,
        })
      );
    },
    [dispatch, totalPrice]
  );

  return (
    <>
      <Box sx={styles.root}>
        <FormProvider {...methods}>
          <Box component="form">
            <CardContent sx={styles.content}>
              <Grid
                container
                spacing={0}
                sx={{
                  "& .Mui-checked + span": {
                    textDecoration: "line-through",
                  },
                }}
              >
                <Grid item xs={12} sx={styles.title}>
                  {t`publicOffer:order`}
                </Grid>
              </Grid>
              <Divider sx={styles.divider} />
              <Box>
                <Typography> {t`scanner:numberCards`} </Typography>
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: " 14px",
                    paddingBottom: "14px",
                  }}
                >
                  <InfoSvg />

                  <Typography>
                    {index === 1
                      ? t`scanner:maxCardProduct`
                      : t`scanner:maxCardBrand`}
                  </Typography>
                </Box>

                <ControlledTextField
                  name="number_card"
                  fullWidth
                  sx={styles.promo}
                  size="small"
                  min={index === 1 ? 1 : 10}
                  max={index === 1 ? 10 : 50}
                  integerWithoutSpace
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "12px",
                  paddingTop: "12px",
                }}
              >
                <Typography sx={styles.tariffs}>
                  {index === 1
                    ? t`scanner:productAnalysis`
                    : t`scanner:brandAnalysis`}
                </Typography>
                <Typography sx={styles.infoText}>
                  {index === 1
                    ? t`scanner:priceCardProduct`
                    : t`scanner:priceCardBrand`}
                </Typography>
              </Box>

              <Divider sx={styles.divider} />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <ControlledTextField
                  name="promocode"
                  label={t`publicOffer:promo` + ":"}
                  fullWidth
                  id="promoInput"
                  autoComplete="promocode"
                  sx={styles.promo}
                  size="small"
                />
                <Grid item>
                  <Button
                    onClick={handleSubmit(handlePromo)}
                    variant="text"
                    href="#contained-buttons"
                    id="promoBtn"
                    type="submit"
                  >
                    {t`publicOffer:accept`}
                  </Button>
                </Grid>
              </Grid>

              <Divider sx={styles.divider} />
              <Grid
                container
                justifyContent="space-between"
                spacing={0}
                sx={{
                  "& .Mui-checked + span": {
                    textDecoration: "line-through",
                  },
                }}
              >
                <Grid sx={styles.title}>{t`publicOffer:payTotal`}</Grid>
                <Grid sx={styles.title}>
                  {totalPrice <= 0 ? 1 : totalPrice} ₽
                </Grid>
              </Grid>
            </CardContent>

            <Box sx={{ height: "68px" }}>
              <LabeledCheckBox
                name="agreement"
                required
                uncontrolled
                sx={{ left: "-11px" }}
                label={
                  <>
                    {`${t`auth:agree`} `}
                    <Link
                      sx={styles.linkStyle}
                      onClick={() => dispatch(openModal(<OfferModal />))}
                      underline="hover"
                    >{t`auth:offer`}</Link>
                  </>
                }
              />
            </Box>

            <Grid
              container
              justifyContent="space-between"
              sx={{ marginTop: "48px" }}
            >
              <Grid>
                <Button
                  variant="text"
                  href="#contained-buttons"
                  onClick={() => dispatch(closeModalAction())}
                >
                  <Grid container alignItems="center">
                    <ArrowLeft />
                    {t`publicOffer:goBack`}
                  </Grid>
                </Button>
              </Grid>
              <Grid>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  id="btnSend"
                  endIcon={
                    isLoading && <CircularProgress size={18} color="inherit" />
                  }
                  onClick={handleSubmit(pay)}
                >
                  {t`publicOffer:pay`}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { md: "600px", xs: "300px" },
    bgcolor: "background.default",
    p: 4,
  },
  divider: {
    marginTop: "12px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
  },
  content: {
    borderRadius: "12px",
    border: "1px solid  #F5F5F5",
  },

  promo: {
    width: "150px",
  },
  linkStyle: {
    cursor: "pointer",
  },
  tariffs: {
    color: "#2196F3",
    fontSize: "14px",
  },
  infoText: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "common.black",
  },
};
