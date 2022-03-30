import {
  ButtonBase,
  CircularProgress,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";
import { ChangeEvent, memo, useCallback, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAppDispatch } from "store";
import { showErrorSnackbar } from "store/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";
import { file2urlStr } from "lib/imageOptimaze";

const ControlledVideoFileInput = ({
  name,
  isLoading,
  setIsUpLoading,
  isEmpty,
  isFull,
  limit,
  addFiles,
  addPreviews,
  ...rest
}: IControlledVideoFileInputProps) => {
  const dispatch = useAppDispatch();
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

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
          addFiles(uploaded);
          const previews = await Promise.all(
            uploaded?.map((file) => file2urlStr(file)) || []
          );
          addPreviews(previews);
          e.target.value = "";
        }
        setIsUpLoading(false);
      } catch (e) {
        setIsUpLoading(false);
        dispatch(showErrorSnackbar("Ошибка загрузки видео"));
      }
    },
    [addFiles, addPreviews, dispatch, limit, setIsUpLoading]
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
            accept="video/mp4,video/x-m4v,video/*"
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
              {isEmpty ? t`from1to12videos` : t`loadMore`}
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

export default memo(ControlledVideoFileInput);
