import React, { useEffect, useState } from 'react';
import { ButtonBase, Input, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import http from '../http';
import { User } from '../models';
import { useHistory } from 'react-router-dom';

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
}

const Home: React.FunctionComponent<Props> = ({ users }) => {
  const [newName, setNewName] = useState('');
  const [homeUsers, setHomeUsers] = useState<User[]>([]);
  const [dialogIsOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setHomeUsers(users);
  }, [users]) 

  const handleClose = () => {
    setDialogOpen(false); 
  }
  const openNameEntryDialog = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) {
      setDialogOpen(true);
    }
  }

  const submitNewUser = () => {
    history.push('/clock-in-page');
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
          placeholder="new user"

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
      <Dialog onClose={handleClose} open={dialogIsOpen}>
        <DialogTitle> Would you like to enter as a new user? </DialogTitle>
        <DialogContent style={{textAlign: 'center'}}>
          {newName}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <UserButton onClick={submitNewUser}> OK </UserButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Home;