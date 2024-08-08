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

    order: {
      object: 'Order',
      id: '58xJBM9RWRDn71jl',
      real_id: '2352-083',
      real_user_id: 175567,
      status: 'PAYMENT',
      recipient: {
        name: 'Maria Sazontova',
        phone: '+7 (999) 123-45-67'
      },
      self_recipient: false,
      user: {
        name: 'Alex',
        phone: '21122121',
        email: 'alex@gmail.com'
      },
      total_cost: '139.60',
      deliveryAmount: '11.00',
      positions_cost: '128.60',
      cashback: '0.00',
      currency: 'GBP',
      positions: [
        {
          offer_id: 'LPOR04bNl5MGaQgy',
          offer_real_id: 254,
          offer_title: 'Sparkle Bouquet',
          title: 'Small',
          slug: 'small',
          price: '47.90',
          external_keys: {
            stripe: null
          },
          image: {
            ord: 1,
            alt_text: 'Sparkle Bouquet - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Birthday flowers',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: null,
          old_price: null,
          discount: null
        },
        {
          offer_id: 'LPOR04bNO5XGaQgy',
          offer_real_id: 210,
          offer_title: 'Dairy Box Milk 162g',
          title: 'Small',
          slug: 'small',
          price: '9.90',
          external_keys: {
            stripe: null
          },
          image: {
            ord: 1,
            alt_text: 'Dairy Box Milk 162g - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Chocolate',
          is_bouquet: false,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: null,
          old_price: null,
          discount: null
        },
        {
          offer_id: 'VYZ5elMJN6MxQN40',
          offer_real_id: 144,
          offer_title: 'Lindt Chocolate',
          title: 'Small',
          slug: 'small',
          price: '14.90',
          external_keys: {
            stripe: null
          },
          image: {
            ord: 1,
            alt_text: 'Lindt Chocolate - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Chocolate',
          is_bouquet: false,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: null,
          old_price: null,
          discount: null
        },
        {
          offer_id: 'LPOR04bNKDXGaQgy',
          offer_real_id: 354,
          offer_title: '40 Pink Tulips',
          title: 'Small',
          slug: 'small',
          price: '55.90',
          external_keys: {
            stripe: null
          },
          image: {
            ord: 1,
            alt_text: '40 Pink Tulips - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Tulips',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: null,
          old_price: null,
          discount: null
        }
      ],
      shippingAddress: {
        full_address: 'London, 15 Westferry Road, E14 8FQ',
        id: null,
        address1: 'London',
        address2: '15 Westferry Road',
        city: 'London',
        full_name: null,
        formatted: null,
        postal_code: 'E14 8FQ',
        latitude: 51.5026399,
        longitude: -0.02559,
        comment: null
      },
      comment: null,
      fast_delivery: 0,
      interval: {
        date: '2024-08-08',
        time: '12:00 pm - 3:00 pm'
      },
      clarify_address: false,
      promo_code: {
        code: '',
        discount: '0.00'
      },
      is_paid: false,
      payment_id: null,
      gift: null,
      delivery_type: 'COURIER',
      has_google_ads_fired: false
    }
  }
};
