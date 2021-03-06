import { Box, Button, CircularProgress, SxProps } from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";
import {
  usePostProductCardOzMutation,
  usePostProductCardYmMutation,
} from "store/Products";
import CommonFields from "UI/molecules/CommonFields/CommonFields";
import NewCardFilesUpload from "UI/molecules/NewCardFilesUpload/NewCardFilesUpload";
import SelectShopsWithChipList from "UI/molecules/SelectShopsWithChipList/SelectShopsWithChipList";
import OzonSpecialFields from "UI/molecules/SpecialFields/OzonSpecialFields";
import { ozAttributes } from "./attributes.transform";
import WildberriesSpecialFields from "UI/molecules/SpecialFields/WildberriesSpecialFields";
import YandexSpecialFields from "UI/molecules/SpecialFields/YandexSpecialFields";

const NewCardForm = () => {
  const dispatch = useAppDispatch();
  const tokensByMp = useCallback(
    (shops: ISelectShopField[], mp: supportedMarketTypes) =>
      shops.filter((shop) => shop.mp === mp).map((shop) => shop.token),
    []
  );

  const [sendNewCardOz, { isLoading: isOzLoading }] =
    usePostProductCardOzMutation();

  const [sendNewCardYm, { isLoading: isYmLoading }] =
    usePostProductCardYmMutation();

  const isLoading = useMemo(
    () => isOzLoading || isYmLoading,
    [isOzLoading, isYmLoading]
  );

  const methods = useForm<INewCardFormFields>({
    defaultValues: {
      barcode: "",
      brand: "",
      country: "",
      depth: "",
      description: "",
      height: "",
      old_price: "",
      premium_price: "",
      weight: "",
      width: "",
      shops: [],
      title: "",
      price: "",
      oz_category: null,
      wb_category: null,
      ym_category: [],
      images: [],
      videos: [],
      // stereos: [],
      vat: "0.2",
      oz: undefined,
      ym: undefined,
      certificate: "",
      vendor: "",
      vendorCode: "",
      boxCount: "",
    },
  });
  const { handleSubmit, watch } = methods;

  const sendForm = useCallback(
    async (data: INewCardFormFields) => {
      // console.log(data);
      if (data.oz && data.oz_category) {
        const ozData: IPostProductCardOzReqData = {
          barcode: data.barcode,
          premium_price: data.premium_price,
          older_price: data.old_price,
          category_id: data.oz_category.category_id,
          depth: +data.depth.replace(/[^0-9]/g, ""),
          height: +data.height.replace(/[^0-9]/g, ""),
          weight: +data.weight.replace(/[^0-9]/g, ""),
          width: +data.width.replace(/[^0-9]/g, ""),
          price: data.price.replace(/[^0-9]/g, ""),
          vat: data.vat,
          name: data.title,
          offer_id: `ozon_offer_${new Date().getTime()}`,
          images: [],
          primary_image: "",
          attributes: ozAttributes(data.oz),
        };

        const ozSendData = new FormData();
        ozSendData.append(
          "user_id",
          JSON.stringify(tokensByMp(data.shops, "oz"))
        );
        ozSendData.append("m", "oz");
        ozSendData.append("data", JSON.stringify(ozData));
        data.images.forEach((img) => ozSendData.append("images", img));
        data.videos.forEach((video) => ozSendData.append("videos", video));
        try {
          const res = await sendNewCardOz(ozSendData).unwrap();
          dispatch(showSuccessSnackbar(res.message));
        } catch (e) {
          dispatch(
            showErrorSnackbar(
              `???????????? ???????????????? ???????????????? Ozon ${JSON.stringify(e)}`
            )
          );
        }
      }
      if (data.ym_category && data.ym) {
        const ymData: IPostProductCardYmReq = {
          shopSku: data.barcode,
          name: data.title,
          category: data.ym_category?.filter((d) => d !== "").join("/") || "",
          manufacturerCountries: data.country ? [data.country] : ["????????????"],
          pictures: [],
          price: data.price.replace(/[^0-9]/g, ""),
          description: data.description,
          certificate: data.certificate,
          boxCount:
            data != null && data.boxCount != null
              ? +data.boxCount.replace(/[^0-9]/g, "")
              : undefined,
          vendor: data.vendor,
          vendorCode: data.vendorCode,
        };
        const ymSendData = new FormData();
        ymSendData.append(
          "user_id",
          JSON.stringify(tokensByMp(data.shops, "ym"))
        );
        ymSendData.append("m", "ym");
        ymSendData.append("data", JSON.stringify(ymData));
        data.images.forEach((img) => ymSendData.append("images", img));
        data.videos.forEach((video) => ymSendData.append("videos", video));
        // console.log(ymData);
        try {
          const res = await sendNewCardYm(ymSendData).unwrap();
          dispatch(showSuccessSnackbar(res.message));
        } catch (e) {
          dispatch(
            showErrorSnackbar(
              `???????????? ???????????????? ???????????????? Yandex ${JSON.stringify(e)}`
            )
          );
        }
      }
    },
    [dispatch, sendNewCardOz, sendNewCardYm, tokensByMp]
  );

  const isMp = useCallback(
    (mp: supportedMarketTypes) =>
      watch("shops")?.find((shop) => shop.mp === mp) ? true : false,
    [watch]
  );

  const { t } = useTranslation("newCard");

  return (
    <FormProvider {...methods}>
      <Box sx={styles.root} component="form">
        <SelectShopsWithChipList />
        <CommonFields />
        <Box sx={styles.fields}>
          {isMp("oz") && <OzonSpecialFields />}
          {isMp("wb") && <WildberriesSpecialFields />}
          {isMp("ym") && <YandexSpecialFields />}
        </Box>
        <NewCardFilesUpload />
        <Button
          onClick={handleSubmit(sendForm)}
          sx={{ alignSelf: "flex-end" }}
          variant="contained"
          type="submit"
          startIcon={
            isLoading && <CircularProgress color="inherit" size={18} />
          }
        >
          {t`send`}
        </Button>
      </Box>
    </FormProvider>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  fields: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    mb: "0px!important",
    "&>*": {
      width: { xs: "100%", md: "calc(50% - 6px)" },
      mb: "12px",
    },
    "&>*:nth-of-type(2n-1)": {
      mr: "12px",
    },
  },
};

export default memo(NewCardForm);
