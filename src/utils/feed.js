import { getUserUrl } from './user';
import { getFileUrl } from './upload';
import UserHTML from '../components/Icons/UserHTML.html';
import api from '../api';


export const USER_NEWS_FEED_ID = 1;
export const USER_WALL_FEED_ID = 2;
export const ORGANIZATION_FEED_ID = 3;
export const ITEMS_LIMIT = 20;

const remoteSearch = (text, cb) => {
  api.searchUsers(text).then((data) => {
    cb(data.slice(0, ITEMS_LIMIT));
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
