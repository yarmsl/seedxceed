import { Box, Divider, SxProps } from "@mui/material";
import { useMedia } from "lib/useMedia";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "store";
import { linkedShopsWithMpColorAndIconSelector } from "store/Dashboard";
import ChipList from "./ChipList";
import SelectShops from "./SelectShops";

const SelectShopsWithChipList = () => {
  const linkedShops = useAppSelector(linkedShopsWithMpColorAndIconSelector);

  const filteredLinkedShops = useMemo(
    () => linkedShops.filter((ls) => ls.mp === "oz"),
    [linkedShops]
  );
  const { setValue } = useFormContext();
  const [value, setStateValue] = useState<ISelectShopField[]>([]);
  const { isPortable } = useMedia();
  const toggleValue = useCallback(
    (mp: supportedMarketTypes, token: string) => {
      if (value.find((val) => val.token === token)) {
        setStateValue((p) => p.filter((v) => v.token !== token));
      } else {
        setStateValue((p) => p.concat({ mp, token }));
      }
    },
    [value]
  );

  const toggleSelectAll = useCallback(() => {
    if (value.length === filteredLinkedShops.length) {
      setStateValue([]);
    } else {
      setStateValue(
        filteredLinkedShops.map((shop) => ({ mp: shop.mp, token: shop.token }))
      );
    }
  }, [filteredLinkedShops, value.length]);

  const setFormValue = useCallback(
    (fv: ISelectShopField[]) => setValue("shops", fv),
    [setValue]
  );

  useEffect(() => {
    setFormValue(value);
  }, [setFormValue, value]);

  const isSelected = useCallback(
    (token: string) => (value.find((v) => v.token === token) ? true : false),
    [value]
  );
  const isIndeterminate = useMemo(
    () => value.length > 0 && value.length < filteredLinkedShops.length,
    [filteredLinkedShops.length, value.length]
  );
  const isSelectedAll = useMemo(
    () => value.length === filteredLinkedShops.length,
    [filteredLinkedShops.length, value.length]
  );

  const selectedLabeledShops = useMemo(
    () =>
      filteredLinkedShops.filter((shop) =>
        value.find((v) => v.token === shop.token)
      ),
    [filteredLinkedShops, value]
  );

  const removeValue = useCallback(
    (token: string) => setStateValue((p) => p.filter((v) => v.token !== token)),
    []
  );

  return (
    <Box sx={styles.root}>
      <SelectShops
        toggleSelectAll={toggleSelectAll}
        isIndeterminate={isIndeterminate}
        isSelectedAll={isSelectedAll}
        linkedShops={filteredLinkedShops}
        isSelected={isSelected}
        toggleValue={toggleValue}
      />
      <Divider orientation={isPortable ? "horizontal" : "vertical"} />
      <ChipList
        selectedShops={selectedLabeledShops}
        removeValue={removeValue}
      />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: { xs: "700px", md: "500px" },
    p: "12px",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    bgcolor: "common.white",
    borderRadius: 1,
    userSelect: "none",
  },
};

export default SelectShopsWithChipList;
