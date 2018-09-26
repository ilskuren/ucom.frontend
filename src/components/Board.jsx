import React from 'react';
import Avatars from './Avatars';

const Board = props => (
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
);

export default Board;
