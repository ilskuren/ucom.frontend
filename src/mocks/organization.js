import flag from '../static/img/flag_ru.jpg';
import vitalik from '../static/img/vitalik.jpg';

function importAll(context) {
  const images = {};
  context.keys().forEach((item) => { images[item.replace('./', '')] = context(item); });
  return images;
}

const images = importAll(require.context('../static/img/logo', false, /\.(png|jpe?g|svg)$/));

export default [
  {
    id: '1',
    owner: {
      id: 2,
      avatarFilename: encodeURI('avatar_filename-1535446210449.jpg'),
      currentRate: 10293,
      rank: '123',
      firstName: 'Andrey Sakharidze',
      myselfData: {
        follow: false,
      },
    },
    status: 'Memento Mori – n the European Christian art context, "the expression"',
    ratePosition: 123,
    rate: '12293',
    name: 'James Franco',
    nickname: 'kames_franko',
    users: Array.from({ length: 17 }, () => (
      {
        avatarFilename: 'main_image_filename-1535704482892.jpg',
        accountName: 'Katherine Moss',
        id: 1,
        rate: 2600,
      })),
    followData: {
      followOrganization: false,
      followUserId: 1,
      joined: {
        rate: '8923',
        avatar: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
      },
      followers: {
        rate: '8923',
        avatar: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
      },
      trustedBy: {
        rate: '8923',
        avatar: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
      },
    },
    poweredBy: {
      name: 'EOS',
      avatarFilename: 'https://backend.u.community/upload/avatar_filename-1535446210449.jpg',
    },
    contentImg: '../static/img/vitalik.jpg',
    location: {
      city: 'Moscow',
      country: 'Russia',
      flag,
    },
    partners: [
      { userName: 'Apple', accountName: 'Decenralized Exchange', avatarUrl: images['apple.jpg'] },
      { userName: 'Microsoft', accountName: 'Best Partner', avatarUrl: images['micro.jpg'] },
      { userName: 'Jared Leto', accountName: 'My hommie', avatarUrl: images['leto.png'] },
      { userName: 'Alpha', accountName: 'Best of the best', avatarUrl: images['gif.jpg'] },
    ],
    communities: [
      { userName: '#1 TYDO', accountName: 'Decenralized Exchange', avatarUrl: images['gif.jpg'] },
      { userName: 'Microsoft', accountName: 'Best Partner', avatarUrl: images['book.jpg'] },
      { userName: 'Dr. Dre', accountName: 'My hommie', avatarUrl: images['dre.png'] },
      { userName: 'Beta', accountName: 'Worst', avatarUrl: images['apple.jpg'] },
    ],
    userSources: [
      { sourceUrl: 'https://ru-ru.facebook.com/zuck' },
      { sourceUrl: 'blog.tydocom.com' },
      { sourceUrl: '@tydocom' },
      { sourceUrl: 'tydocom' },
    ],
    createdAt: '2018-09-12T12:00:39.932Z',
    content: {
      media: vitalik,
      text: 'Sasha Tsoy is a freelance designer and illustrator from Kazakhstan with a rather interesting story. Even though she was born in Kazakhstan, she is only 25% Kazakh – she also is  50% Ukranian and 25% Korean and speaks Russian as her mother tongue. She finished high school and university in the UK, where she met her half Colombian, half Irish boyfriend who was born and raised in London.',
    },
    comments: [{
      user: {
        id: 1,
      },
      id: 1,
      depth: 1,
      rating: 0,
      description: 'Comment',
      avatar: 'https://backend.u.community/upload/avatar_filename-1535446210449.jpg',
    }],
    events: [
      {
        name: 'Horde',
        src: images['ev1.jpg'],
      },
      {
        name: 'Medium',
        src: images['ev2.jpg'],
      },
      {
        name: 'DTF Media',
        src: images['ev3.jpg'],
      },
      {
        name: 'Dribbble Organia...',
        src: images['ev4.jpg'],
      },
      {
        name: 'LastFM',
        src: images['ev5.jpg'],
      },
    ],
  },
];
