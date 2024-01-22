const desktopNavbar = [
  {
    title: 'Flowers',
    icon: 'tile',
    style: {
      width: 20,
      height: 20
    },
    hasSubLevel: true
  },
  {
    title: 'Letterbox flowers',
    icon: 'envelope',
    style: {
      width: 16,
      height: 16
    },
    hasSubLevel: false,
    to: '/category/letterbox-flowers'
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
    hasSubLevel: true
  },
  {
    title: 'Occasions',
    icon: 'organizer',
    style: {
      width: 16,
      height: 16
    },
    hasSubLevel: true
  },
  {
    title: 'Roses',
    icon: 'rose',
    style: {
      width: 10.31,
      height: 16
    },
    hasSubLevel: true
  },
  {
    title: 'Gifts',
    icon: 'gift',
    style: {
      width: 16,
      height: 16
    },
    hasSubLevel: true
  }
  // {
  //   title: 'Sales',
  //   icon: 'percent-sale',
  //   style: {
  //     width: 14,
  //     height: 14
  //   },
  //   color: 'pink',
  //   hasSubLevel: true
  // },
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
    type: 'letterbox',
    title: 'Letterbox flowers',
    icon: 'envelope',
    hasSubLevel: false,
    to: '/category/letterbox-flowers'
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
    hasSubLevel: true
  }
  // {
  //   type: 'sales',
  //   title: 'Sales',
  //   icon: 'percent-sale',
  //   hasSubLevel: true
  // },
];

export { desktopNavbar, mobileNavbar };
