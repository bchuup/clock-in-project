import React, { useState } from 'react';
import SubPageLayout from '../layouts/SubPageLayout';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import moment from 'moment';
import http from '../http';

const ShiftBox = styled.div`
  max-width: 400px;
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  margin-bottom: 2em;
`

const ShiftButton = styled(Button)`
  && {
    text-transform: lowercase;
    margin-bottom: 1em;
  }
`

const ClockInPage: React.FunctionComponent = () => {
  const [isShiftDialogOpen, setShiftDialogOpen] = useState(false);
  const submitForNewShift = () => {
    console.log('run post here - it should create new shift');
  }
  return (
    <div> 
      <ShiftBox>
        <ShiftButton onClick={() => setShiftDialogOpen(true)} size="large" color="primary"> sign in now </ShiftButton>
      </ShiftBox>
      <Dialog open={isShiftDialogOpen} onClose={() => setShiftDialogOpen(false)}>
        <DialogContent>
          <h2> {moment().format('LLLL')} </h2>
        </DialogContent>
        <ShiftButton onClick={() => submitForNewShift()} size="large" color="primary"> CLOCK IN </ShiftButton>
      </Dialog>
    </div>
  )
}

export default SubPageLayout(ClockInPage);