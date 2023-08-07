import { Backdrop, CircularProgress } from "@mui/material";
import { FC, MouseEventHandler } from "react";

interface Props {
  open: boolean;
  handleClose?: MouseEventHandler<HTMLElement> | (() => void);
}

const BackdropLoading: FC<Props> = ({ open, handleClose }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
