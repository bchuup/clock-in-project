import React, { useEffect, useState } from 'react';
import { ButtonBase, Input } from '@material-ui/core';
import styled from 'styled-components';
import http from '../http';
import { User } from '../models';

const UserButton = styled(ButtonBase)`
  min-width: 400px;
  &&:hover {
    transform: scale(1.1);
  }
  && {
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
  const [homeUsers, setHomeUsers] = useState<User[]>([]);
  useEffect(() => {
    setHomeUsers(users);
  }, [users]) 

  return (
    <div> 
      <NameInputRow>
        <Input />
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
    </div>
  )
}

export default Home;