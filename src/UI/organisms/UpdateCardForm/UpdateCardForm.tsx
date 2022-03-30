import { memo, useEffect, useCallback, useMemo } from "react";
import { closeModalAction } from "../../../store/ModalStack";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledTextField } from "../../atoms/ControlledTextFields";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Box,
  CardContent,
  SxProps,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { I18nPhoneInput } from "../../atoms/ControlledTextFields/PhoneInputField";
import { useUpdateShopMutation } from "store/Dashboard";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";

interface IProps {
  shopTitle: string;
  phone: string;
  companyTitle: string;
  id: number;
}

interface IUpdateMarketForm {
  company_title: string;
  shop_title: string;
  phone: string;
  check: boolean;
}

export const UpdateCardForm = ({
  shopTitle,
  phone,
  companyTitle,
  id
}: IProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["apiConnection", "auth", "common"]);

  const methods = useForm<IUpdateMarketForm>({
    defaultValues: useMemo(
      () => ({
        company_title: companyTitle,
        shop_title: shopTitle,
        phone: phone,
        check: false,
      }),
      [companyTitle, phone, shopTitle]
    ),
  });
  const { handleSubmit, reset } = methods;

  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const updateStore = useCallback(
    async (data: IUpdateMarketForm) => {
      const { company_title, shop_title, phone } = data;
      try {
        await updateShop({
          company_title,
          shop_title,
          phone,
          id
        }).unwrap();
        dispatch(showSuccessSnackbar(`Shop updated`));
        dispatch(closeModalAction());
      } catch (e) {
        dispatch(showErrorSnackbar(`Update shop error `));
      }
    },
    [updateShop, id, dispatch]
  );

  useEffect(() => {
    reset({
      company_title: companyTitle,
      shop_title: shopTitle,
      phone: phone,
    });
  }, [ companyTitle, phone, reset, shopTitle]);

  return (
    <>
      <Box sx={styles.root}>
        <FormProvider {...methods}>
          <Box component="form">
            <CardContent sx={styles.content}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ paddingBottom: "10px" }}
                >{t`common:editShop`}</Typography>
                <IconButton
                  onClick={() => dispatch(closeModalAction())}
                  sx={styles.iconClose}
                >
                  <CloseIcon sx={{ color: "#9E9E9E" }} />
                </IconButton>
              </Box>

              <Box>
                <ControlledTextField
                  name="company_title"
                  label={t`apiConnection:companyTitle`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              </Box>

              <Box>
                <ControlledTextField
                  name="shop_title"
                  label={t`apiConnection:storeTitle`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              </Box>

              <I18nPhoneInput
                name="phone"
                label={t`auth:phone`}
                type="tel"
                required
                fullWidth
                autoComplete="tel"
                sx={styles.inputPhone}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => dispatch(closeModalAction())}
                  variant="outlined"
                >
                  {t`common:close`}
                </Button>

                <Button
                  onClick={handleSubmit(updateStore)}
                  endIcon={
                    isLoading && <CircularProgress size={18} color="inherit" />
                  }
                  type="submit"
                  variant="contained"
                >
                  {t`common:save`}
                </Button>
              </Box>
            </CardContent>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    bgcolor: "background.default",
    p: { xs: "12px", sm: "24px" },
    width: { xs: "100%", sm: "480px" },
  },
  content: {
    width: "100%",
  },
  iconClose: {
    position: "absolute",
    right: "6px",
    top: "6px",
  },
  divider: {
    marginTop: "12px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
  },

  input: {
    marginBottom: "10px",
    marginTop: "10px",
  },
  linkStyle: {
    cursor: "pointer",
  },
  select: {
    marginBottom: "10px",
    marginTop: "10px",
  },
  inputPhone: {
    height: "64px",
    mb: "10px",
    marginBottom: "10px",
    marginTop: "10px",
  },
};

export default memo(UpdateCardForm);
