import React from 'react';
import Avatars from './Avatars';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const Board = props => (
  props.users && props.users.length ? (
    <div className="board">
      <div className="board__avatars">
        <Avatars
          list={props.users.map(user => ({
            id: user.id,
            alt: getUserName(user),
            avatarUrl: getFileUrl(user.avatarFilename),
            accountName: user.accountName,
            rate: user.currentRate,
            profileLink: getUserUrl(user.id),
            userName: getUserName(user),
          }))}
          orderStacking="fifo"
          distance="far"
          size="msmall"
          maxAvatarsAmount={8}
        />
      </div>
      <div className="board__title">BOARD</div>
    </div>
  ) : null
);

export default Board;
