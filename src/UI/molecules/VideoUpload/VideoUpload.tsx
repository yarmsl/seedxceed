import { Box, SxProps, Typography } from "@mui/material";
import { memo, useState, useCallback, useMemo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ControlledVideoFileInput from "./ControlledVideoFileInput";
import VideoPreviewCard from "./VideoPreviewCard";

const maxVideos = 12;

const VideoUpload = () => {
  const { t } = useTranslation("newCard");
  const { setValue, formState } = useFormContext<INewCardFormFields>();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const isEmpty = useMemo(() => files.length === 0, [files.length]);
  const isFull = useMemo(() => files.length === maxVideos, [files.length]);
  const limit = useMemo(
    () => (maxVideos - files.length < 0 ? 0 : maxVideos - files.length),
    [files.length]
  );
  const { isSubmitting } = formState;
  const remove = useCallback((n: number) => {
    setFiles((p) => p?.filter((_, i) => i !== n));
    setPreviews((p) => p?.filter((_, i) => i !== n));
  }, []);
  const setIsUpLoading = useCallback(
    (condition: boolean) => setUpLoading(condition),
    []
  );

  const addFiles = useCallback(
    (files: File[]) => setFiles((p) => p.concat(files)),
    []
  );

  const addPreviews = useCallback(
    (previews: string[]) => setPreviews((p) => p.concat(previews)),
    []
  );

  useEffect(() => {
    if (files.length > 0) {
      setValue("videos", files);
    } else if (isSubmitting && files.length === 0) {
      setValue("videos", []);
    }
  }, [files, isSubmitting, setValue, t]);

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{t`videos`}</Typography>
      <Box sx={styles.videos}>
        {previews.map((src, i) => (
          <VideoPreviewCard key={i} index={i} src={src} remove={remove} />
        ))}
        <ControlledVideoFileInput
          name="videos"
          isEmpty={isEmpty}
          isFull={isFull}
          limit={limit}
          isLoading={upLoading}
          setIsUpLoading={setIsUpLoading}
          addFiles={addFiles}
          addPreviews={addPreviews}
        />
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
  title: {
    fontSize: "16px",
    fontWeight: 500,
    m: "16px 0",
  },
  videos: {
    width: "100%",
    p: "6px",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    borderRadius: 1,
    border: "1px dashed #90CAF9",
  },
};

export default memo(VideoUpload);
