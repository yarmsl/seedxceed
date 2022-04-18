import HelmetTitle from "../../UI/atoms/Helmet";
import Basket from "../../UI/organisms/Basket/Basket";

const BasketPage = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="basket" />
      <Basket />
    </>
  );
};

export default BasketPage;
