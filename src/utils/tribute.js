import { getFileUrl } from './upload';
import { getUserUrl } from './user';
import UserHTML from '../components/Icons/UserHTML.html';
import api from '../api';

export const MENTION_LIST_ITEMS_LIMIT = 20;

const remoteSearch = (text, cb) => {
  api.searchUsers(text).then((data) => {
    // console.log(data); TODO: mismatch of names with capital literal
    cb(data.slice(0, MENTION_LIST_ITEMS_LIMIT));
  });
};

export const tributeConfig = {
  values: (text, cb) => remoteSearch(text, users => cb(users)),
  lookup: 'accountName',
  fillAttr: 'accountName',
  menuItemTemplate:
  item => (`
    <div class="tribute-container__item" contenteditable="false">
      ${item.original.avatarFilename ?
      `<img class="tribute-container__avatar" src="${getFileUrl(item.original.avatarFilename)}"/>` :
      `<div class="tribute-container__avatar">${UserHTML}</div>`}
      <a class="tribute-container__link" onclick="e => e.stopPropagation()" href="${getUserUrl(item.original.id)}" target="_blank" >${item.original.accountName}</a>
    </div>
  `),
};
