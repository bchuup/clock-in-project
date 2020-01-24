import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
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
  shift: Shift
}

type EditType = 'in' | 'out' | null;

const ShiftContainer: FunctionComponent<ShiftContainerProps> = ({ shift }) => {
  const [editType, setEditType] = useState<EditType>(null);
  const [signInField, setSignInField] = useState<string>('');
  const [signOutField, setSignOutField] = useState<string>('');
  useEffect(() => {
    const now = moment().format('YYYY-MM-DDThh:mm');
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
      ? { sign_in_date: signInField }
      : { sign_out_date: signOutField }
    http.put(
      `/api/shifts/${shift.user_id}/edit/${shift.id}`,
      payload
    ).then((res) => {
      console.log('res', res.data);
    });
    console.log('sign in', signInField);
    console.log('sign out', signOutField);
    
  };
  const defaultTime = () => {
    const signInDate = shift.sign_in_date || undefined;
    const signOutDate = shift.sign_out_date || undefined;
    if (editType === 'in') {  
      return moment(signInDate).format('YYYY-MM-DDThh:mm');
    }
    if (editType === 'out') {
      return moment(signOutDate).format('YYYY-MM-DDThh:mm');
    }
    return moment().format('YYYY-MM-DDThh:mm');
  }
  return (
    <div style={{ textAlign: 'center' }} key={shift.created_at}>
      <p>{moment(shift.sign_in_date || '').format('LL')}</p>
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
    </div>
  )
}

export default ShiftContainer;