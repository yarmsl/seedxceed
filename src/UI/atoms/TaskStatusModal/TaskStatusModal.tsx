import {
  Box,
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  SxProps
} from "@mui/material";
import { memo, useMemo } from "react";
import { useGetStatusTasksQuery } from "../../../store/DarkSide/DarkSide.service";

interface ITaskStatusModalProps {
  task_id: number;
}

const TaskStatusModal = ({ task_id }: ITaskStatusModalProps): JSX.Element => {
  const { data, isLoading } = useGetStatusTasksQuery(task_id);
  const statusData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.loader}>{isLoading && <LinearProgress />}</Box>
      {statusData.length > 0 ? (
        <TableContainer sx={styles.table}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Товар</TableCell>
                <TableCell>Юр. лицо</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statusData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Tooltip arrow title={item.data?.product || ""}>
                      <Link href={item.data?.url || ""} sx={styles.link}>
                        {item.data?.product || ""}
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box>{item.data?.ur || ""}</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{`${item.status}`}</Box>
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString("ru-RU", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={styles.nodata}>
          <Typography color="GrayText" variant="h2">
            Нет данных
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    minWidth: "500px",
    width: "100%",
    height: "350px",
    overflow: "hidden",
    backgroundColor: "background.default"
  },
  loader: {
    width: "100%",
    height: "3px",
  },
  table: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  long: {
    width: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  link: {
    display: "block",
    width: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  nodata: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default memo(TaskStatusModal);
