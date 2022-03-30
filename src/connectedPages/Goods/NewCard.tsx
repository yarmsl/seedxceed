import { memo } from "react";
import NewCardForm from "UI/organisms/NewCardForm/NewCardForm";
import HelmetTitle from "../../UI/atoms/Helmet";

const NewCardPage = () => {
  return (
    <>
      <HelmetTitle title="newCard" />
      <NewCardForm />
    </>
  );
};

export default memo(NewCardPage);
