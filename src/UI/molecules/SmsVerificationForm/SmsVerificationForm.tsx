import {
  Box,
  Button,
  CircularProgress,
  Link,
  SxProps,
  Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import {
  setSmsTimer,
  useCheckEnteredCodeMutation,
  useSendCodeViaSmsMutation,
} from "store/Auth";
import { closeModalAction } from "store/ModalStack";
import { showErrorSnackbar } from "store/Notifications";
import Timer from "UI/atoms/Timer/Timer";
import MiniSmsInput from "./MiniSmsInput";

const SmsVerificationForm = ({
  phone,
  toggleVerify,
  codeLength,
}: ISmsVerificationFormProps) => {
  const [sendCode, { isLoading }] = useSendCodeViaSmsMutation();
  const [confirmCode, { isLoading: isConfirmation }] =
    useCheckEnteredCodeMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("auth");
  const codeInitialValue = useMemo(
    () => Array(codeLength).fill(""),
    [codeLength]
  );
  const [code, setCode] = useState<string[]>(codeInitialValue);
  const inputsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { smsTimer } = useAppSelector((st) => st.auth);
  const [error, setError] = useState(false);
  const isTimeLeft = useMemo(() => smsTimer > 0, [smsTimer]);
  const startTimer = useCallback(
    (seconds: number) => dispatch(setSmsTimer(seconds)),
    [dispatch]
  );

  const sendMeCode = useCallback(async () => {
    try {
      const res = await sendCode({ phone }).unwrap();
      if (!res.status) {
        throw new Error("status false");
      }
      startTimer(60);
    } catch (e) {
      dispatch(showErrorSnackbar(t`smsErr`));
      dispatch(closeModalAction());
    }
  }, [dispatch, phone, sendCode, startTimer, t]);

  useEffect(() => {
    if (!isTimeLeft) {
      sendMeCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMeCode]);

  const handleInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, slot: number) => {
      const val = e.target.value;
      if (/[^0-9]/.test(val)) return;
      const newCode = [...code];
      newCode[slot] = val;
      setCode(newCode);
      if (slot !== codeLength - 1) {
        inputsRefs.current[slot + 1]?.focus();
      }
      if (newCode.every((val) => val !== "")) {
        try {
          const res = await confirmCode({ code: newCode.join("") }).unwrap();
          if (!res.status) {
            throw new Error("status false");
          }
          toggleVerify(true);
          dispatch(closeModalAction());
        } catch (err) {
          setError(true);
        }
      }
    },
    [code, codeLength, confirmCode, dispatch, toggleVerify]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
      if (e.code === "Backspace" && !code[slot] && slot !== 0) {
        e.preventDefault();
        const newCode = [...code];
        newCode[slot - 1] = "";
        setCode(newCode);
        inputsRefs.current[slot - 1]?.focus();
      }
    },
    [code]
  );

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5">{t`enterCode`}</Typography>
      <Typography
        sx={styles.subtitle}
        variant="body2"
      >{t`smsCheck`}</Typography>
      <Box sx={styles.inputs}>
        {code.map((n, i) => (
          <MiniSmsInput
            key={i}
            value={n}
            onChange={(e) => handleInput(e, i)}
            onKeyUp={(e) => handleKeyUp(e, i)}
            ref={(ref) => inputsRefs.current.push(ref)}
            autoFocus={!code[0].length && i === 0}
            maxLength={1}
            inputMode="numeric"
            type="text"
            autoComplete="new-password"
            readOnly={isConfirmation}
          />
        ))}
      </Box>
      <Typography sx={{ height: "20px" }} color="error" variant="body2">
        {error && t`wrongCode`}
      </Typography>
      <Typography sx={styles.check}>
        {t`noCode`}{" "}
        <Link
          sx={styles.link}
          onClick={() => dispatch(closeModalAction())}
        >{t`checkPhone`}</Link>{" "}
        {t`or`}
      </Typography>
      <Button
        onClick={() => sendMeCode()}
        endIcon={isLoading && <CircularProgress color="inherit" size={16} />}
        fullWidth
        variant="outlined"
        disabled={isTimeLeft}
      >
        {t`sendNewCode`}
        {isTimeLeft && (
          <>
            {" ("}
            {<Timer />}
            {") "}
          </>
        )}
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "100%", sm: "400px" },
    p: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.default",
    borderRadius: 1,
  },
  title: {
    fontWeight: 700,
    mb: "16px",
  },
  subtitle: {
    width: "70%",
    textAlign: "center",
    color: "text.secondary",
  },
  inputs: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    m: "12px",
  },
  check: {
    color: "text.secondary",
    fontSize: "14px",
    mb: "12px",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};

export default memo(SmsVerificationForm);
