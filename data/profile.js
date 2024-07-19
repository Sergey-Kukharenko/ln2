export default {
  sidebar: {
    // name: 'John Doe',
    name: 'Alexander',
    nav: [
      {
        label: 'Dashboard',
        type: 'dashboard',
        to: '/profile/dashboard',
        icon: 'profile-dashboard'
      },
      {
        label: 'My orders',
        type: 'orders',
        to: '/profile/orders',
        icon: 'profile-orders',
        count: 1
      },
      {
        label: 'Favorites',
        type: 'favorites',
        to: '/profile/favorites',
        icon: 'profile-favorites',
        count: 6
      },
      {
        label: 'Personal data',
        type: 'personal',
        to: '/profile/personal',
        icon: 'profile-personal'
      },
      {
        label: 'Notification settings',
        type: 'notification',
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
          status: 'delivered',
          date: '10 june!',
          title: 'some'
        },
        {
          id: 3,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 2,
          orderNumber: 'No. 2352-083',
          status: 'delivered',
          date: '5 may!',
          title: 'some'
        }
      ]
    },
    favorites: {
      head: {
        title: 'My favorites',
        view: {
          to: '/profile/favorites',
          label: 'View all'
        }
      }
    }
  }
};
