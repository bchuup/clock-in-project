import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Shift } from '../models';
import http from '../http';

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

const ShiftTitleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  && > p {
    margin:  20px;
  }
  && button {
    opacity: 20%;
  }
  &&:hover button {
    opacity: 100%;
    color: #B33951;
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
    : <p>set sign in date</p>
} 

interface ShiftContainerProps {
  shift: Shift,
  updateShifts: (s: Shift) => void
}

type EditType = 'in' | 'out' | null;

const ShiftContainer: FunctionComponent<ShiftContainerProps> = ({ shift, updateShifts }) => {
  const [editType, setEditType] = useState<EditType>(null);
  const [signInField, setSignInField] = useState<string>('');
  const [signOutField, setSignOutField] = useState<string>('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  useEffect(() => {
    const now = moment().toISOString();
    setSignInField(shift.sign_in_date || now);
    setSignOutField(shift.sign_out_date || now);
  }, [])

  const handleFieldChange = (e: any) => {
    if (editType === 'in') {
      setSignInField(e.currentTarget.value)
    }
    if (editType === 'out') {
      setSignOutField(e.currentTarget.value)
    }
  }
  const editShift = () => {
    setEditType(null);
    const payload = editType === 'in'
      ? { sign_in_date: moment(signInField).toISOString }
      : { sign_out_date: moment(signOutField).toISOString }
    http.put(
      `/api/shifts/${shift.user_id}/edit/${shift.id}`,
      payload
    ).then((res) => {
      updateShifts(res.data[0]);
    }).catch((e) => {
      console.error(e);
    });
  };
  const deleteShift = () => {
    setDeleteDialogOpen(false);
    const now = moment().toISOString();
    const payload = { deleted_at: now }
    http.put(
      `/api/shifts/${shift.user_id}/edit/${shift.id}`,
      payload
    ).then((res) => {
      updateShifts(res.data[0]);
    }).catch((e) => {
      console.error(e);
    });
  };
  const defaultTime = () => {
    const signInDate = shift.sign_in_date || undefined;
    const signOutDate = shift.sign_out_date || undefined;
    if (editType === 'in') {  
      return moment(signInDate).format('YYYY-MM-DDTHH:mm');
    }
    if (editType === 'out') {
      return moment(signOutDate).format('YYYY-MM-DDTHH:mm');
    }
    return moment().format('YYYY-MM-DDTHH:mm');
  }
  return (
    <div style={{ textAlign: 'center' }} key={shift.created_at}>
      <ShiftTitleRow>
        <p>{moment(shift.sign_in_date || '').format('LL')}</p>
        <div>
          <IconButton onClick={() => setDeleteDialogOpen(true)} size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      </ShiftTitleRow>
      <ShiftBox>
        <ShiftButton onClick={() => setEditType('in')}>
          <ShiftSignInButtonText signDate={shift.sign_in_date} />
        </ShiftButton>
        <ShiftButton onClick={() => setEditType('out')}>
          <ShiftSignInButtonText signDate={shift.sign_out_date} signOut={true} />
        </ShiftButton>
      </ShiftBox>
      <Dialog open={Boolean(editType)} onClose={() => setEditType(null)}>
        <DialogContent>
          <TextField
            type="datetime-local"
            defaultValue={defaultTime()}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <ShiftButton onClick={() => editShift()} size="large" color="primary"> 
          {editType === 'in' ? 'edit sign in date' : 'sign out'}
        </ShiftButton>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogContent>
          <h3> Are you sure you want to delete this shift? </h3>
        </DialogContent>
        <Button color="secondary" onClick={() => deleteShift()} size="large">
          DELETE
        </Button>
      </Dialog>
    </div>
  )
}

export default ShiftContainer;