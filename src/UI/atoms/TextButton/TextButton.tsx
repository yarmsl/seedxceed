import { memo } from "react";
import { Typography, SxProps } from "@mui/material";

const TextButton = ({ text, action }: ITextButtonProps): JSX.Element => {
  return (
    <Typography sx={styles.button} onClick={action}>
      {text}
    </Typography>
  );
};

const styles: Record<string, SxProps> = {
  button: {
    color: "#2196F3",
    fontWeight: 500,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default memo(TextButton);
