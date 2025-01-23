import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

function TeacherDialog({teacherDialogState,setTeacherDialogState,userInfo}) {
  return (
    <Dialog
        fullScreen
        open={teacherDialogState.open}
        onClose={() => setTeacherDialogState({ open: false })}
      >
        <DialogTitle color='primary'>پنل استاد</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={()=>}>ثبت تغییرات</Button>
          <Button
            color="warning"
            onClick={() => {
              setTeacherDialogState({ open: false });
            }}
          >
            بستن
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default TeacherDialog