import React, { useEffect, useState } from 'react';
import { ButtonBase, Input, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import http from '../http';
import { User } from '../models';
import { useHistory } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

const UserButton = styled(ButtonBase)`
  min-width: 300px;
  min-height: 48px;
  &&:hover {
    transform: scale(1.1);
  }
  && {
    padding: 0em 1em;
    margin: 1em;
    border-radius: 10px;
    border: 1px solid #54494B;
  }
`;

const NameInputRow = styled.div`
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 2em;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

const Home: React.FunctionComponent<Props> = ({ users, setUsers }) => {
  const [newName, setNewName] = useState('');
  const [homeUsers, setHomeUsers] = useState<User[]>([]);
  const [newUserDialogIsOpen, setNewUserDialogOpen] = useState(false);
  const [errorDialogIsOpen, setErrorDialogIsOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const orderedUsers = orderBy(users, ['created_at'], ['desc'])
    setHomeUsers(orderedUsers);
  }, [users]) 

  const handleCloseNewUserDialog = () => {
    setNewUserDialogOpen(false); 
  }
  const handleCloseErrorDialog = () => {
    setErrorDialogIsOpen(false); 
  }
  const openNameEntryDialog = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setNewUserDialogOpen(true);
    }
  }

  const submitNewUser = () => {
    http.post('/api/users', { name: newName }).then((res) => {
      const updatedUsers = users.concat(res.data);
      setUsers(updatedUsers);
      history.push(`/clock-in-page/${res.data[0].id}`);
    }).catch(e => {
      console.log('error', e);
      setNewUserDialogOpen(false);
      setErrorDialogIsOpen(true);
    })
  }

  return (
    <div> 
      <NameInputRow>
        {/* add filtering of list */}
        <Input
          onKeyDown={openNameEntryDialog}
          onChange={(e: any) => setNewName(e.currentTarget.value)}
          inputProps={{
            style: { textAlign: 'center' }
          }} 
          placeholder="Enter a new caretaker"

        />
      </NameInputRow>
      <UserList>
      {homeUsers.map((u) => {
        return (
          <UserButton key={u.id}>
            <h2>{u.full_name}</h2>
          </UserButton>
        )
      })}
      </UserList>
      <Dialog onClose={handleCloseNewUserDialog} open={newUserDialogIsOpen}>
        <DialogTitle> Would you like to enter as a new user? </DialogTitle>
        <DialogContent style={{textAlign: 'center'}}>
          {newName}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <UserButton onClick={submitNewUser}> OK </UserButton>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleCloseErrorDialog} open={errorDialogIsOpen}>
        <DialogTitle> This name is taken! try another. </DialogTitle>
        <DialogContent style={{textAlign: 'center'}}>
          {newName}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <UserButton onClick={handleCloseErrorDialog}> OK </UserButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Home;