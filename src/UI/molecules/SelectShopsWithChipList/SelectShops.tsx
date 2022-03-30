import {
  Box,
  Checkbox,
  FormHelperText,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SxProps,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SelectShops = ({
  toggleSelectAll,
  isIndeterminate,
  isSelectedAll,
  isSelected,
  linkedShops,
  toggleValue,
}: ISelectShopsProps) => {
  const { control } = useFormContext();
  const { t } = useTranslation("newCard");
  return (
    <Box sx={styles.root}>
      <Typography variant="h6" gutterBottom>
        {t`selectShop`}
      </Typography>
      <Box sx={styles.wrapper}>
        <Controller
          name="shops"
          control={control}
          render={({ fieldState: { error } }) => (
            <>
              <MenuItem
                sx={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  overflow: "hidden",
                }}
                onClick={toggleSelectAll}
                divider
              >
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isSelectedAll}
                />
                <ListItemText primary={t`shops`} secondary={t`selectAll`} />
              </MenuItem>
              <List sx={styles.list}>
                {linkedShops.map((shop) => (
                  <MenuItem
                    key={shop.id}
                    selected={isSelected(shop.token)}
                    onClick={() => toggleValue(shop.mp, shop.token)}
                  >
                    <Checkbox checked={isSelected(shop.token)} />
                    <ListItemText>{shop.title}</ListItemText>
                    <ListItemIcon>
                      <img src={shop.icon} alt={shop.mp} />
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </List>
              <FormHelperText error>{error && error.message}</FormHelperText>
            </>
          )}
          rules={{
            required: `${t`requiredShop`}`,
          }}
        />
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "100%", md: "50%" },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    pr: "12px",
  },
  wrapper: {
    width: "100%",
    height: "calc(100% - 62px)",
    boxShadow: 3,
    borderRadius: 1,
  },
  list: {
    height: "calc(100% - 57px)",
    overflowY: "auto",
    bgcolor: "common.white",
  },
};

export default memo(SelectShops);
