import { Link } from 'react-router-dom';
import React from 'react';
import IconEdit from './Icons/Edit';

const ButtonEdit = props => (
  <Link className="button-icon button-icon_edit button-icon_edit_bordered" to={props.url}>
    <IconEdit />
  </Link>
);

export default ButtonEdit;
