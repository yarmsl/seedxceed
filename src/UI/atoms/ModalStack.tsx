import { Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeModalAction } from "../../store/ModalStack";

const ModalStack = (): JSX.Element => {
  const { modalStack } = useAppSelector((st) => st);
  const dispatch = useAppDispatch();
  return (
    <>
      {modalStack.length > 0 &&
        modalStack?.map((modal, i) => {
          return (
            <Dialog
              PaperProps={{ sx: { bgcolor: "transparent", boxShadow: 5 } }}
              key={i}
              open={modal.open}
              onClose={() => dispatch(closeModalAction())}
            >
              {modal.window}
            </Dialog>
          );
        })}
    </>
  );
};

export default ModalStack;
