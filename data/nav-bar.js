const desktopNavbar = [
  {
    title: 'Flowers',
    icon: 'tile',
    style: {
      width: 20,
      height: 20
    },
    color: '',
    hasSubLevel: true
  },
  {
    title: 'Trending',
    icon: 'fire',
    style: {
      width: 16,
      height: 16
    },
    prefix: 'filter',
    slug: 'trendy-bouquets',
    hasSubLevel: false
  },
  {
    title: 'Recipient',
    icon: 'user-hart',
    style: {
      width: 17.33,
      height: 16.67
    },
    color: '',
    hasSubLevel: true
  },
  {
    title: 'Occasions',
    icon: 'organizer',
    style: {
      width: 16,
      height: 16
    },
    color: '',
    hasSubLevel: true
  },
  {
    title: 'Roses',
    icon: 'rose',
    style: {
      width: 10.31,
      height: 16
    },
    color: '',
    hasSubLevel: true
  },
  {
    title: 'Gifts',
    icon: 'gift',
    style: {
      width: 16,
      height: 16
    },
    to: '/gifts',
    hasSubLevel: false
  },
  {
    title: 'Sales',
    icon: 'percent-sale',
    style: {
      width: 14,
      height: 14
    },
    color: 'pink',
    hasSubLevel: true
  }
];

const mobileNavbar = [
  {
    type: 'all',
    title: 'Flowers',
    icon: 'flowers',
    hasSubLevel: true,
    list: [],
    link: {
      url: 'some url',
      text: 'Show all bouquets MyFlowers'
    }
  },
  {
    title: 'Trending',
    type: 'trending',
    icon: 'fire',
    hasSubLevel: false,
    prefix: 'filter',
    slug: 'trendy-bouquets'
  },
  {
    type: 'recipient',
    title: 'Recipient',
    icon: 'user-hart',
    hasSubLevel: true
  },
  {
    type: 'occassions',
    title: 'Occasions',
    icon: 'organizer',
    hasSubLevel: true
  },
  {
    type: 'roses',
    title: 'Roses',
    icon: 'rose',
    hasSubLevel: true
  },
  {
    title: 'Gifts',
    type: 'gifts',
    icon: 'gift',
    hasSubLevel: false,
    to: '/gifts'
  },
  {
    type: 'sales',
    title: 'Sales',
    icon: 'percent-sale',
    hasSubLevel: true
  }
];

export { desktopNavbar, mobileNavbar };
