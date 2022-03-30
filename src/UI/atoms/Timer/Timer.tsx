import { Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setSmsTimer } from "store/Auth";

const Timer = () => {
  const dispatch = useAppDispatch();
  const { smsTimer } = useAppSelector((st) => st.auth);
  const [active, setActive] = useState(smsTimer > 0);
  const setTimer = useCallback(
    (s: number) => dispatch(setSmsTimer(s)),
    [dispatch]
  );
  useEffect(() => {
    if (smsTimer > 0 && active) {
      setTimeout(setTimer, 1000, smsTimer - 1);
    } else {
      setActive(false);
    }
  }, [active, dispatch, setTimer, smsTimer]);

  return <Typography>{smsTimer}</Typography>;
};

export default memo(Timer);
