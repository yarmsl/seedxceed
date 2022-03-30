import { Box, SxProps } from "@mui/material";

interface IHighlightTextProps {
  text: string;
  highlight: string;
}

export const HighlightText = ({ text, highlight }: IHighlightTextProps) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <Box
          component="span"
          key={i}
          sx={
            part.toLowerCase() === highlight.toLowerCase()
              ? styles.highlight
              : undefined
          }
        >
          {part}
        </Box>
      ))}
    </span>
  );
};

const styles: Record<string, SxProps> = {
  highlight: {
    bgcolor: "primary.main",
    color: "white"
  },
};
