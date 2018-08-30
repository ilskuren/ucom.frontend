import crypto from 'crypto';
import { range } from 'lodash';
import wordsDict from './wordsDict';

export const BYTES_LENGTH = 16;

export const getTestPassphrase = (brainkey) => {
  if (!brainkey) {
    return null;
  }

  const words = wordsDict.en.split(',');
  const testWords = [brainkey[1], brainkey[3], brainkey[7], brainkey[11]];
  const newWords = range(0, BYTES_LENGTH - 8).map(() =>
    words[Math.floor(Math.random() * (words.length + 1))]);
  const verifyWords = [...testWords, ...newWords].sort(() => Math.random() - 0.5);

  return verifyWords;
};

export const getPassphrase = () => {
  const bytes = [];

  for (let i = 0; i < BYTES_LENGTH; i++) {
    bytes.push(crypto.randomBytes(1)[0]);
  }

  const words = wordsDict.en.split(',');
  const result = bytes.map((item) => {
    let index = Math.floor(Math.random() * words.length);

    if (index > item) {
      index -= item;
    } else {
      index = item - index;
    }

    return words[index];
  });

  result.splice(4, 4);

  return result;
};
