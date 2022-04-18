import { useMemo, useState } from "react";
import { Box, SxProps } from "@mui/material";
import AddFavorite from "../../molecules/AddFavorite/AddFavorite";
import DarksideTasksList from "../../molecules/DarksideTasksList/DarksideTaskList";
import Loading from "../../atoms/Loading/Loading";
import { getUserDataSelector } from "../../../store/User/User.selectors";
import { useGetFavoritesQuery } from "../../../store/DarkSide/DarkSide.service";
import { useAppSelector } from "../../../store";

const Favorite = (): JSX.Element => {
  const { id } = useAppSelector(getUserDataSelector);
  const { data, isLoading } = useGetFavoritesQuery(id);

  const [reverseData, setReverseData] = useState<boolean>(true);

  const tasks = useMemo(() => {
    return data != null ? data : [];
  }, [data]);

  return (
    <Box sx={styles.wrap}>
      <Box sx={styles.content}>
        <AddFavorite
          reverse={reverseData}
          changeReverse={() => setReverseData((prev) => !prev)}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <DarksideTasksList data={tasks} reverse={reverseData} />
        )}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    maxWidth: "800px",
  },
};

export default Favorite;
