import { Box, Chip, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const ChipList = ({ selectedShops, removeValue }: IChipListProps) => {
  const { t } = useTranslation("newCard");
  return (
    <Box sx={styles.root}>
      <Typography variant="h6" gutterBottom>
        {t`shopList`}
      </Typography>
      <Box sx={styles.wrapper}>
        {selectedShops.map((shop) => (
          <Chip
            key={shop.id}
            label={shop.title}
            variant="outlined"
            color="primary"
            onDelete={() => removeValue(shop.token)}
            icon={<img src={shop.icon} alt={shop.mp} />}
            sx={{
              pl: "6px",
              m: "0 12px 6px 0",
              "& img": {
                width: "18px",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "100%", md: "calc(50% - 1px)" },
    height: "100%",
    p: "12px",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
};

export default memo(ChipList);
