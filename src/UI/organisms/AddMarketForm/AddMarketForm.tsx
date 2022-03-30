import { memo, useCallback, useMemo } from "react";
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
  SxProps,
  Link,
  Typography,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { I18nPhoneInput } from "../../atoms/ControlledTextFields/PhoneInputField";
import CloseIcon from "@mui/icons-material/Close";
import { PolicyModal } from "../PolicyModal/policyModal";
import { useCreateShopMutation } from "store/Dashboard";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";
import { LANG } from "configuration/baseUrls";

interface IAddedMarketForm {
  company_title: string;
  shop_title: string;
  marketplace_id: string;
  phone: string;
  client_id: string;
  check: boolean;
  token: string;
  token2: string;
}

const mps: { value: supportedMarketTypes; label: string }[] = [
  { value: "oz", label: "Ozon" },
  { value: "wb", label: "Wildberries" },
  { value: "ym", label: "Yandex Market" },
  { value: "ml", label: "Mercado Libre" },
];

export const AddMarketForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["apiConnection", "auth", "common"]);
  const [createShop, { isLoading }] = useCreateShopMutation();

  const filteredMPs = useMemo(
    () =>
      mps.filter((mp) =>
        LANG === "ru"
          ? mp.value !== "ml"
          : !(mp.value === "oz" || mp.value === "wb" || mp.value === "ym")
      ),
    []
  );

  const methods = useForm<IAddedMarketForm>({
    defaultValues: {
      company_title: "",
      shop_title: "",
      marketplace_id: "",
      phone: "",
      client_id: "",
      check: false,
      token: "",
      token2: "",
    },
  });
  const { handleSubmit, watch } = methods;
  const send = useCallback(
    async (data: IAddedMarketForm) => {
      const {
        company_title,
        shop_title,
        marketplace_id,
        phone,
        client_id,
        token,
        token2,
      } = data;
      try {
        const res = await createShop({
          company_title,
          shop_title,
          marketplace_id,
          phone,
          token,
          client_id,
          token2,
        }).unwrap();
        dispatch(showSuccessSnackbar(`Shop ${res.shop_title} created `));
        dispatch(closeModalAction());
      } catch (e) {
        dispatch(showErrorSnackbar(`Create shop error `));
      }
    },
    [createShop, dispatch]
  );

  return (
    <>
      <Box sx={styles.root}>
        <FormProvider {...methods}>
          <Box component="form">
            <CardContent sx={styles.content}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ paddingBottom: "10px" }}
                >{t`apiConnection:addingStore`}</Typography>

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

              <Box>
                <ControlledTextField
                  id="marketplace_id"
                  name="marketplace_id"
                  required
                  fullWidth
                  select
                  sx={styles.select}
                >
                  {filteredMPs.map((mp) => (
                    <MenuItem key={mp.value} value={mp.value}>
                      {mp.label}
                    </MenuItem>
                  ))}
                </ControlledTextField>
              </Box>

              {watch("marketplace_id") === "oz" ? (
                <ControlledTextField
                  name="client_id"
                  label={t`common:idClient`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              ) : null}

              {watch("marketplace_id") === "oz" ||
              watch("marketplace_id") === "wb" ||
              watch("marketplace_id") === "ml" ? (
                <ControlledTextField
                  name="token"
                  label={t`common:key64`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              ) : null}

              {watch("marketplace_id") === "ym" ? (
                <ControlledTextField
                  name="client_id"
                  label={t`apiConnection:companyNumber`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              ) : null}

              {watch("marketplace_id") === "ym" ? (
                <ControlledTextField
                  name="token"
                  label={t`apiConnection:token`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              ) : null}

              {watch("marketplace_id") === "wb" ? (
                <ControlledTextField
                  name="token2"
                  label={t`apiConnection:token`}
                  fullWidth
                  required
                  sx={styles.input}
                />
              ) : null}

              <I18nPhoneInput
                name="phone"
                label={t`auth:phone`}
                type="tel"
                required
                fullWidth
                autoComplete="tel"
                sx={styles.inputPhone}
              />
              <Box sx={{ height: "68px" }}>
                <LabeledCheckBox
                  name="agreement"
                  required
                  sx={{ left: "-11px" }}
                  label={
                    <>
                      {`${t`auth:accept`} `}
                      <Link
                        sx={styles.linkStyle}
                        onClick={() => dispatch(openModal(<PolicyModal />))}
                        underline="hover"
                      >{t`auth:privacyPolicy`}</Link>
                    </>
                  }
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => dispatch(closeModalAction())}
                  variant="outlined"
                >
                  {t`common:close`}
                </Button>

                <Button
                  onClick={handleSubmit(send)}
                  type="submit"
                  endIcon={
                    isLoading && <CircularProgress size={18} color="inherit" />
                  }
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

export default memo(AddMarketForm);
