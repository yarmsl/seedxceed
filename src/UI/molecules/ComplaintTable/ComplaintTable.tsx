import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useCallback, useMemo, memo } from "react";
import { useAppDispatch } from "store";
import { useGetAllTasksComplaintsQuery } from "../../../store/DarkSide/DarkSide.service";
import { openModal } from "store/ModalStack";
import TaskStatusModal from "../../atoms/TaskStatusModal/TaskStatusModal";

const ComplaintTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllTasksComplaintsQuery("");
  const tasks = useMemo(
    () =>
      Array.isArray(data) ? (data.length > 0 ? [...data].reverse() : data) : [],
    [data]
  );

  const openStatusModal = useCallback(
    (task_id) => dispatch(openModal(<TaskStatusModal task_id={task_id} />)),
    [dispatch]
  );

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {tasks.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Белый список</TableCell>
              <TableCell>Что произошло</TableCell>
              <TableCell>Причина</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                onClick={() => openStatusModal(task.id)}
                sx={{ cursor: "pointer" }}
                hover
                key={task.id}
              >
                <TableCell>
                  <Tooltip title={task.task.url}>
                    <Box
                      sx={{
                        width: "120px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.task.url}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>{task.task.without_company.join(", ")}</TableCell>
                <TableCell>{task.task.reportData.what_matter}</TableCell>
                <TableCell>{task.task.reportData.reason}</TableCell>
                <TableCell>{task.task.reportData.desc_problem}</TableCell>
                <TableCell>{task.task.reportData.name}</TableCell>
                <TableCell>
                  {new Date(task.created_at).toLocaleDateString("ru-RU", {
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
      )}
    </TableContainer>
  );
};

export default memo(ComplaintTable);
