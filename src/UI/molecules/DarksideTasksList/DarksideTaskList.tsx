import { memo, useState, useEffect, useMemo, Fragment } from "react";
import { Box, Typography, SxProps, Collapse } from "@mui/material";
import DarksideTaskCard from "../../atoms/DarksideTaskCard/DarksideTaskCard";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const DarksideTasksList = ({
  data,
  reverse,
}: IDarksideTasksListProps): JSX.Element => {
  const [showTasks, setShowTasks] = useState<boolean[]>([]);

  const showTask = (idx: number) => {
    const arr = showTasks.map((item, i) => {
      if (i === idx) item = !showTasks[idx];
      return item;
    });
    setShowTasks(arr);
  };

  const tasks = useMemo(() => {
    return Array.isArray(data)
      ? reverse
        ? [...data].reverse()
        : [...data]
      : [];
  }, [reverse, data]);

  useEffect(() => {
    setShowTasks(data.map(() => false));
  }, [data]);

  return (
    <>
      {tasks.map((item, idx) => {
        return (
          <Fragment key={`item_${idx + 1}`}>
            <Box sx={styles.wrapCard} onClick={() => showTask(idx)}>
              <Typography sx={styles.textCard}>
                Задача ID: {item.task.id}
              </Typography>
              <ExpandMoreRoundedIcon
                sx={{
                  ...styles.arrow,
                  transform: showTasks[idx] ? "rotate(-180deg)" : "",
                }}
              />
            </Box>
            <Collapse in={showTasks[idx]}>
              {item.products.map((product: ProductFavorite, i: number) => {
                return (
                  <DarksideTaskCard data={product} key={`product_${i + 1}`} />
                );
              })}
            </Collapse>
          </Fragment>
        );
      })}
    </>
  );
};

const styles: Record<string, SxProps> = {
  wrapCard: {
    backgroundColor: "secondary.main",
    p: "15px",
    borderRadius: "12px",
    mt: "15px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  textCard: {
    color: "common.black",
    fontWeight: 500,
  },
  arrow: {
    color: "#00C853",
    transition: "transform 0.3s",
  },
};

export default memo(DarksideTasksList);
