import { useAppDispatch } from "store";
import { authAPI } from "../../store/Auth";
import Loading from "../../UI/atoms/Loading/Loading";

const CheckAuthPage = () => {
  const dispatch = useAppDispatch();

  dispatch(
    authAPI.endpoints.checkAuth.initiate(`${new Date().getTime()}`, {
      subscriptionOptions: {
        pollingInterval: 30 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    })
  );

  return <Loading fullscreen />;
};

export default CheckAuthPage;
