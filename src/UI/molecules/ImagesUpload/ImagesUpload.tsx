import { Box, FormHelperText, SxProps, Typography } from "@mui/material";
import ControlledImagesFileInput from "./ControlledImagesFileInput";
import { useState, useCallback, useEffect, useMemo, memo } from "react";
import { useFormContext } from "react-hook-form";
import ImagePreviewCard from "./ImagePreviewCard";
import { useTranslation } from "react-i18next";

const maxPhotoes = 30;

const ImagesUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const { setValue, formState, setError, clearErrors } =
    useFormContext<INewCardFormFields>();
  const { errors, isSubmitting } = formState;

  const isEmpty = useMemo(() => files.length === 0, [files.length]);
  const isFull = useMemo(() => files.length === maxPhotoes, [files.length]);
  const limit = useMemo(
    () => (maxPhotoes - files.length < 0 ? 0 : maxPhotoes - files.length),
    [files.length]
  );

  const remove = useCallback((n: number) => {
    setFiles((p) => p?.filter((_, i) => i !== n));
    setPreviews((p) => p?.filter((_, i) => i !== n));
  }, []);

  const toFirstPlace = useCallback((n: number) => {
    setFiles((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return p;
    });
    setPreviews((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return JSON.parse(JSON.stringify(p));
    });
  }, []);

  const addFiles = useCallback(
    (files: File[]) => setFiles((p) => p.concat(files)),
    []
  );

  const addPreviews = useCallback(
    (previews: string[]) => setPreviews((p) => p.concat(previews)),
    []
  );

  const setIsUpLoading = useCallback(
    (condition: boolean) => setUpLoading(condition),
    []
  );

  const { t } = useTranslation("newCard");

  useEffect(() => {
    if (files.length > 0) {
      setValue("images", files);
      clearErrors("images");
    } else if (isSubmitting && files.length === 0) {
      setValue("images", []);
      setError("images", {
        type: "required",
        message: t`photoErr`,
      });
    }
  }, [clearErrors, files, isSubmitting, setError, setValue, t]);

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{t`photoes`}</Typography>
      <Box sx={styles.images}>
        {previews.map((src, i) => (
          <ImagePreviewCard
            key={i}
            index={i}
            src={src}
            remove={remove}
            toFirstPlace={toFirstPlace}
          />
        ))}
        <ControlledImagesFileInput
          name="images"
          isLoading={upLoading}
          addFiles={addFiles}
          addPreviews={addPreviews}
          setIsUpLoading={setIsUpLoading}
          isEmpty={isEmpty}
          limit={limit}
          isFull={isFull}
        />
      </Box>
      <FormHelperText sx={{ height: "20px" }} error>
        {errors.images
          ? (errors.images as unknown as { message: string; type: string })
              .message
          : ""}
      </FormHelperText>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "16px",
    fontWeight: 500,
    m: "16px 0",
  },
  images: {
    width: "100%",
    p: "6px",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    borderRadius: 1,
    border: "1px dashed #90CAF9",
  },
};

export default memo(ImagesUpload);
