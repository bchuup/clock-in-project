import React, { useState, useEffect } from 'react';
import SubPageLayout from '../layouts/SubPageLayout';
import styled from 'styled-components';
import { Button, IconButton, Dialog, DialogContent } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import http from '../http';
import { useParams, useHistory } from 'react-router-dom';
import { User, Shift } from '../models';
import orderBy from 'lodash/orderBy';
import ShiftContainer from './ShiftContainer';

const Header = styled.div`
  padding: 3em;
`

const NewShiftBox = styled.div`
  max-width: 400px;
  min-height: 20vh;
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
    text-transform: lowercase;
    margin-bottom: 1em;
  }
`
interface ShiftSignInButtonProps {
  signDate?: string | null, 
  signOut?: boolean
}

const ClockInPage: React.FunctionComponent = () => {
  const [isShiftDialogOpen, setShiftDialogOpen] = useState(false);
  const params = useParams() as unknown as { userId: number };
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [user, setUser] = useState<User>({} as User)
  const history = useHistory();
  useEffect(() => {
    const userId = params.userId;
    http.get(`/api/users/${userId}`).then((res) => {
      setUser(res.data);
    }).catch((e) => {
      console.error(e);
    });
  }, []);
  useEffect(() => {
    const userId = params.userId;
    http.get(`/api/shifts/${userId}`).then((res) => {
      const orderedShifts = orderBy(res.data, ['created_at'], ['desc'])
      setShifts(orderedShifts);
    }).catch((e) => {
      console.error(e);
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
      const orderedShifts = orderBy(updatedShifts, ['created_at'], ['desc']);
      setShifts(orderedShifts);
      setShiftDialogOpen(false);
    }).catch((e) => {
      setShiftDialogOpen(false);
      console.error(e);
    });
  }
  const updateShifts = (incomingShift: Shift) => {
    const newShifts = shifts.map((s) => {
      return s.id === incomingShift.id
        ? incomingShift
        : s
    })
    const orderedShifts = orderBy(newShifts, ['created_at'], ['desc']);
    setShifts(orderedShifts);
  }
  return (
    <div> 
      <IconButton onClick={() => history.push(`/`)} style={{margin: '2em'}}> 
        <ArrowBackIcon/> 
      </IconButton>
      <Header>
        <h1 style={{textAlign: 'center'}}> Welcome { user.full_name }! </h1>
      </Header>
      <NewShiftBox>
        <ShiftButton onClick={() => setShiftDialogOpen(true)} size="large" color="primary"> sign in now </ShiftButton>
      </NewShiftBox>
      {shifts.map((s: Shift) => {
        if (!s.deleted_at) {
          return (
            <ShiftContainer 
              key={s.id} 
              shift={s} 
              updateShifts={updateShifts}
            />
          )
        } 
        return null
      })}
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