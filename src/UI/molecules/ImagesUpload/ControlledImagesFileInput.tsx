import {
  ButtonBase,
  CircularProgress,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";
import { file2optiDataurl, file2optiFile } from "lib/imageOptimaze";
import { ChangeEvent, memo, useCallback, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAppDispatch } from "store";
import { showErrorSnackbar } from "store/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";

const ControlledImagesFileInput = ({
  name,
  isLoading,
  addFiles,
  addPreviews,
  setIsUpLoading,
  isEmpty,
  limit,
  isFull,
  ...rest
}: IControlledImagesFileInputProps) => {
  const dispatch = useAppDispatch();
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const f2F = useCallback(
    async (
      file: File,
      wide: number,
      quality: number,
      format: "jpg" | "png" | "webp"
    ) => await file2optiFile(file, wide, quality, format),
    []
  );
  const f2U = useCallback(
    async (
      file: File,
      wide: number,
      quality: number,
      format: "jpg" | "png" | "webp"
    ) => await file2optiDataurl(file, wide, quality, format),
    []
  );
  const filesUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setIsUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const uploaded = limit
            ? Array.from(inputRef.current.files).slice(0, limit)
            : Array.from(inputRef.current.files);
          const resBlobs = uploaded?.map((file) => {
            return f2F(file, 7680, 0.95, "jpg") || [];
          });
          const res = await Promise.all(resBlobs);
          addFiles(res);
          const resurl = uploaded?.map((file) => {
            return f2U(file, 600, 0.95, "jpg") || [];
          });
          const res2 = await Promise.all(resurl);
          addPreviews(res2);
          e.target.value = "";
        }
        setIsUpLoading(false);
      } catch (e) {
        setIsUpLoading(false);
        dispatch(showErrorSnackbar("Ошибка загрузки фото"));
      }
    },
    [addFiles, addPreviews, dispatch, f2F, f2U, limit, setIsUpLoading]
  );

  const { t } = useTranslation("newCard");

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={() => (
          <input
            style={{ display: "none" }}
            accept="image/*"
            ref={inputRef}
            {...rest}
            onChange={(e) => {
              filesUpload(e);
            }}
            type="file"
            multiple
          />
        )}
      />
      {!isFull && (
        <Paper sx={styles.root}>
          <ButtonBase
            sx={styles.button}
            onClick={() => inputRef.current?.click()}
          >
            {isLoading ? (
              <CircularProgress size={50} color="primary" />
            ) : (
              <AddCircleOutlineIcon color="primary" fontSize="inherit" />
            )}
            <Typography sx={{ mt: "12px" }} color="primary">
              {isEmpty ? t`from1to30` : t`loadMore`}
            </Typography>
          </ButtonBase>
        </Paper>
      )}
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    borderRadius: 1,
    width: "200px",
    height: "275px",
    m: "6px",
    overflow: "hidden",
  },
  button: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    fontSize: "50px",
  },
};

export default memo(ControlledImagesFileInput);
