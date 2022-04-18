import HelmetTitle from "../../UI/atoms/Helmet";
import Favorite from "../../UI/organisms/Favorite/Favorite";

const FavoritePage = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="favorite" />
      <Favorite />
    </>
  );
};

export default FavoritePage;
