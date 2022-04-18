import { PASSPORT_URL } from "../../../configuration/baseUrls";
import GoogleAuthButtonLayout from "./GoogleAuthButtonLayout";

export const GoogleAuthButton = (): JSX.Element => {
  return (
    <GoogleAuthButtonLayout
      href={`${PASSPORT_URL}/api/auth/google`}
      variant="contained"
      fullWidth
    />
  );
};
