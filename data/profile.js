export default {
  sidebar: {
    // name: 'John Doe',
    name: 'Alexander',
    nav: [
      {
        label: 'Dashboard',
        type: 'dashboard',
        to: '/profile/dashboard',
        icon: 'profile-dashboard',
        arrow: 'profile-arrow'
      },
      {
        label: 'Orders',
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
        type: 'personal-data',
        to: '/profile/personal-data',
        icon: 'profile-personal'
      },
      {
        label: 'Notification settings',
        type: 'notification-settings',
        to: '/profile/notification-settings',
        icon: 'profile-notification'
      }
    ]
  },
  alert: {
    icon: 'profile-check',
    label: 'Your account was successfully registered with us.'
  },
  gender: [
    {
      icon: '/icons/genders/female.png',
      value: 'FEMALE',
      label: 'Female'
    },
    {
      icon: '/icons/genders/male.png',
      value: 'MALE',
      label: 'Male'
    },
    {
      value: 'DO_NOT_SPECIFY',
      label: 'Prefer not to say'
    }
  ],
  pages: {
    orders: {
      head: {
        title: 'Orders',
        view: {
          to: '/profile/orders',
          label: 'View all'
        }
      },
      empty: {
        img: {
          src: '/images/orders/profile-empty.jpg',
          alt: 'profiles-empty'
        },
        title: "It's still empty here",
        description: 'The dashboard will fill up when you start shopping'
      }
    },
    favorites: {
      head: {
        title: 'Favorites',
        view: {
          to: '/profile/favorites',
          label: 'View all'
        }
      },
      empty: {
        img: {
          src: '/images/favorites/favorites-empty.jpg',
          alt: 'favorites-empty'
        },
        figcaption: "You don't have any products in your Favorites. Add products and they will appear here"
      }
    },
    notifications: {
      head: {
        title: 'Notification settings',
        view: null
      },
      list: {
        email_subscription: {
          name: 'email_subscription',
          value: false,
          label: 'Receive emails with promotions by e-mail'
        },
        sms_subscription: {
          name: 'sms_subscription',
          value: false,
          label: 'Receive SMS notifications'
        }
      }
    },
    empty: {
      title: "It's empty here :(",
      texts: [
        'You do not have active orders and products you like!',
        'You can use the search to find everything you need.'
      ],
      button: {
        to: '/',
        label: 'Go to shopping'
      }
    }
  }
};
