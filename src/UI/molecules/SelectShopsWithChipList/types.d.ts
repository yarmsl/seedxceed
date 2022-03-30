interface ISelectShopsProps {
  toggleSelectAll: () => void;
  isIndeterminate: boolean;
  isSelectedAll: boolean;
  linkedShops: LinkedShopsWithIconAndColor[];
  isSelected: (token: string) => boolean;
  toggleValue: (mp: supportedMarketTypes, token: string) => void;
}

interface IChipListProps {
  selectedShops: LinkedShopsWithIconAndColor[];
  removeValue: (token: string) => void;
}

type LinkedShopsWithIconAndColor = ILinkedShop & {
  icon: string;
  color: string;
};

interface ISelectShopField {
  mp: supportedMarketTypes;
  token: string;
}
