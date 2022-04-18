interface ISendRequestFavorite {
  links: string;
}

interface IAddFavoriteProps {
  reverse: boolean;
  changeReverse: () => void;
}
