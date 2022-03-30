import { SxProps } from "@mui/material";

export const TutorialCardStyles: Record<string, SxProps> = {
  wrapCard: {
    width: { xs: "calc(100% - 50px)", sm: "calc(100% - 34px)", md: "256px" },
    height: "82px",
    borderRadius: 1,
    position: "relative",
    mb: "20px",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 200ms ease-in-out",
    transform: "scale(1)",
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
  firstCircle: {
    width: "160px",
    height: "160px",
    position: "absolute",
    top: "-70px",
    right: "-30px",
    borderRadius: "50%",
    opacity: 0.7,
    zIndex: 1,
  },
  secondCircle: {
    width: "140px",
    height: "140px",
    position: "absolute",
    top: "20px",
    right: "-50px",
    borderRadius: "50%",
    zIndex: 2,
  },
  label: {
    position: "absolute",
    top: "50%",
    left: "15px",
    transform: "translateY(-50%)",
    zIndex: 3,
    "& svg": {
      height: "18px",
    },
  },
  textTutorial: {
    fontSize: "20px",
    color: "common.white",
    fontWeight: 700,
  },
};
