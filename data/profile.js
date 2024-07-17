export default {
  sidebar: {
    // name: 'John Doe',
    name: 'Alexander',
    nav: [
      {
        label: 'Dashboard',
        to: '/profile/dashboard',
        icon: 'profile-dashboard'
      },
      {
        label: 'My orders',
        to: '/profile/orders',
        icon: 'profile-orders',
        count: 1
      },
      {
        label: 'Favorites',
        to: '/profile/favorites',
        icon: 'profile-favorites',
        count: 6
      },
      {
        label: 'Personal data',
        to: '/profile/personal',
        icon: 'profile-personal'
      },
      {
        label: 'Notification settings',
        to: '/profile/notification',
        icon: 'profile-notification'
      }
    ]
  },
  pages: {
    orders: {
      head: {
        title: 'My orders',
        view: {
          to: '/profile/orders',
          label: 'View all'
        }
      },
      list: [
        {
          id: 1,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 3,
          orderNumber: 'No. 2352-083',
          status: 'is being collected',
          date: null,
          title: 'some'
        },
        {
          id: 2,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 2,
          orderNumber: 'No. 2352-083',
          status: 'is being collected',
          date: '10 june!',
          title: 'some'
        },
        {
          id: 3,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 2,
          orderNumber: 'No. 2352-083',
          status: 'is being collected',
          date: '5 may!',
          title: 'some'
        }
      ]
    }
  }
};
