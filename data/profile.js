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
      value: 'female',
      label: 'Female'
    },
    {
      icon: '/icons/genders/male.png',
      value: 'male',
      label: 'Male'
    },
    {
      value: 'prefer_not_say',
      label: 'Prefer not to say'
    }
  ],
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
          orderNumber: 'No. 2352-083',
          status: 'collected',
          statusText: 'is being collected',
          date: null,
          title: 'some',
          to: '/profile/order/2352-083'
        },
        {
          id: 2,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 2,
          orderNumber: 'No. 2352-083',
          status: 'delivered',
          statusText: 'delivered',
          date: '10 june!',
          title: 'some',
          to: ''
        },
        {
          id: 3,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          count: 2,
          orderNumber: 'No. 2352-083',
          status: 'delivered',
          statusText: 'delivered',
          date: '5 may!',
          title: 'some',
          to: ''
        }
      ],
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
        title: 'My favorites',
        view: {
          to: '/profile/favorites',
          label: 'View all'
        }
      },
      list: [
        {
          id: 'eWYB37nB4YXy1oPG',
          real_id: 177,
          title: 'Feelings',
          img: '1.webp',
          slug: 'feelings',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '28.90',
          position_name: 'small',
          is_new: false,
          category_name: 'Roses',
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        },
        {
          id: 'm58xJBM9j3n71jlZ',
          real_id: 289,
          title: 'Whisper',
          img: '1.webp',
          slug: 'whisper',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '39.90',
          position_name: 'small',
          is_new: false,
          category_name: null,
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        },
        {
          id: 'LPOR04bNl5MGaQgy',
          real_id: 254,
          title: 'Sparkle Bouquet',
          img: '1.webp',
          slug: 'sparkle-bouquet',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '47.90',
          position_name: 'small',
          is_new: false,
          category_name: null,
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        },
        {
          id: 'eWYB37nB4YXy1oPG1',
          real_id: 177,
          title: 'Feelings',
          img: '1.webp',
          slug: 'feelings',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '28.90',
          position_name: 'small',
          is_new: false,
          category_name: 'Roses',
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        },
        {
          id: 'm58xJBM9j3n71jlZ2',
          real_id: 289,
          title: 'Whisper',
          img: '1.webp',
          slug: 'whisper',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '39.90',
          position_name: 'small',
          is_new: false,
          category_name: null,
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        },
        {
          id: 'LPOR04bNl5MGaQgy3',
          real_id: 254,
          title: 'Sparkle Bouquet',
          img: '1.webp',
          slug: 'sparkle-bouquet',
          rating: '5.00',
          reviews: 500,
          like: true,
          price: '47.90',
          position_name: 'small',
          is_new: false,
          category_name: null,
          type_name: 'Hand-tied',
          old_price: null,
          discount: null
        }
      ],
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
      list: [
        {
          id: 1,
          value: false,
          label: 'Receive emails with promotions by e-mail'
        },
        {
          id: 2,
          value: false,
          label: 'Receive SMS notifications'
        }
      ]
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
    },
    order: {}
  }
};
