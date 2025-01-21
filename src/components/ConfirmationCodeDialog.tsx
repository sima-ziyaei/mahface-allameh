import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function ConfirmationCodeDialog({
  open,
  handleClose,
  onSubmit,
  confirmationInput,
  setConfirmationCode,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>لطفا کد ارسال شده به ایمیل خود را وارد نمایید</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          variant="outlined"
          value={confirmationInput}
          onChange={(e) => setConfirmationCode(e.target.value)}
          sx={{ width: 1 }}
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          بستن
        </Button>
        <Button onClick={onSubmit} variant="contained" color="success">
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationCodeDialog;
