import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "store";
import { marketPlaceConf } from "configuration/marketPlace.conf";

export const uiSelector = (state: TRootState): UIState => state.ui;

export const selectedMpsSelector = createSelector(
  uiSelector,
  (ui) => ui.mpSelector
);

export const selectedShopsSelector = createSelector(
  uiSelector,
  (ui) => ui.shopSelector
)

export const selectedLabeledMpsSelector = createSelector(
  selectedMpsSelector,
  (mps) => marketPlaceConf.filter((conf) => mps.includes(conf.mp))
);
