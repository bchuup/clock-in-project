import React, { useState, useEffect, FunctionComponent } from 'react';
import SubPageLayout from '../layouts/SubPageLayout';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import moment from 'moment';
import http from '../http';
import { useParams } from 'react-router-dom';
import { Shift } from '../models';
import orderBy from 'lodash/orderBy';
import { sign } from 'crypto';

const NewShiftBox = styled.div`
  max-width: 400px;
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  margin-bottom: 2em;
`

const ShiftBox = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  margin: auto;
`

const ShiftButton = styled(Button)`
  && {
    color: #54494B;
    text-transform: lowercase;
    margin-bottom: 1em;
  }
`
interface ShiftSignInButtonProps {
  signDate?: string | null, 
  signOut?: boolean
}

const ShiftSignInButtonText: FunctionComponent<ShiftSignInButtonProps> = ({ signDate, signOut }) => {
  if (signDate) {
    return (
      <div>
        <p>{signOut ? 'signed out' : 'signed in'}</p>
        <p>{signDate && moment(signDate || '').format('LT')}</p>
      </div>
    )
  }
  return signOut 
    ? <p>set sign out date</p>
    : <p>set sign in date</p>;
} 

const ClockInPage: React.FunctionComponent = () => {
  const [isShiftDialogOpen, setShiftDialogOpen] = useState(false);
  const params = useParams() as unknown as { userId: number };
  const [shifts, setShifts] = useState<Shift[]>([]);
  useEffect(() => {
    const userId = params.userId;
    http.get(`/api/shifts/${userId}`).then((res) => {
      const orderedShifts = orderBy(res.data, ['sign_in_date'], ['desc'])
      setShifts(orderedShifts);
    });
  }, []);
  const submitForNewShift = () => {
    const userId = params.userId;
    const newShift = {
      sign_in_date: moment().toISOString(),
      user_id: userId
    }
    http.post(`/api/shifts/${userId}/new-shift`, newShift).then((res) => {
      const updatedShifts = shifts.concat(res.data);
      setShifts(updatedShifts);
    });
  }
  return (
    <div> 
      <NewShiftBox>
        <ShiftButton onClick={() => setShiftDialogOpen(true)} size="large" color="primary"> sign in now </ShiftButton>
      </NewShiftBox>
      {shifts.map((s: Shift) => (
        <div style={{textAlign: 'center'}} key={s.created_at}>
          <p>{moment(s.sign_in_date || '').format('LL')}</p>
          <ShiftBox>
            <ShiftButton>
              <ShiftSignInButtonText signDate={s.sign_in_date}/>
            </ShiftButton>
            <ShiftButton>
              <ShiftSignInButtonText signDate={s.sign_out_date} signOut={true} />
            </ShiftButton>
          </ShiftBox>
        </div>
      ))}
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