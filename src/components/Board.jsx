import React from 'react';
import Avatars from './Avatars';

const Board = props => (
  props.users && props.users.length ? (
    <div className="board">
      <div className="board__avatars">
        <Avatars
          list={props.users}
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
