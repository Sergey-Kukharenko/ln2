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
    bonuses: {
      cashback: '5%',
      price: '15',
      type: 'based',
      level: '£ 10 / 29.9 pounds left to the next level',
      description: 'Make a collective purchase of £ 29.9 and upgrade your package to “Gold”.',
      title: 'Bonus account history',
      list: [
        {
          title: 'Receiving a sweet gift',
          description: null,
          decrement: null,
          increment: null,
          expirationDate: null,
          date: '12.12.24'
        },
        {
          title: 'Free shipping',
          description: null,
          decrement: null,
          increment: null,
          expirationDate: null,
          date: '11.12.24'
        },
        {
          title: 'Deduction',
          description: 'Order #123234 from 12.12.24',
          decrement: '- £ 5',
          increment: null,
          expirationDate: null,
          date: '12.12.24'
        },
        {
          title: 'Accrual',
          description: 'Order #123234 from 12.12.24',
          decrement: null,
          increment: '+ £ 3',
          expirationDate: '12.12.25',
          date: '12.12.24'
        }
      ]
    },
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
          amount_prod: null,
          status: 'PACKED',
          date: null
        },
        {
          id: 2,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          amount_prod: 2,
          status: 'DELIVERED',
          date: '10 june!'
        },
        {
          id: 3,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          amount_prod: 2,
          status: 'DELIVERED',
          statusText: 'delivered',
          date: '5 may!'
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
    },

    order: {
      object: 'Order',
      id: '2352-083',
      real_id: '2352-083',
      real_user_id: 175567,

      self_recipient: false,

      total_cost: '86',
      delivery_amount: '11.00',
      positions_cost: '128.60',
      cashback: '0.00',
      currency: 'GBP',
      shipping_address: {
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
      has_google_ads_fired: false,

      status: 'PACKED',
      recipient: {
        name: 'Maria Sazontova',
        phone: '+7 (999) 123-45-67'
      },
      delivery: {
        delivery_address: 'London, 15 Westferry Road, E14 8FQ',
        delivery_date: '2024-08-08',
        delivery_time: '12:00 pm - 3:00 pm'
      },
      payment_methods: {
        payment_type_id: 'card'
      },
      positions: [
        {
          offer_id: 'O9apoVGyLz5qNX4K',
          offer_real_id: 254,
          offer_title: 'Sparkle Bouquet',
          title: 'Small',
          slug: 'small',
          price: '66.90',
          image: {
            ord: 1,
            alt_text: 'Sparkle Bouquet - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          external_keys: {
            stripe: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Spray roses',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: 'ssa',
          old_price: null,
          discount: null
        },
        {
          offer_id: 'O9apoVGyLz5qNX41K',
          offer_real_id: 210,
          offer_title: 'Dairy Box Milk 162g',
          title: 'Small',
          slug: 'small',
          price: '9.90',
          image: {
            ord: 1,
            alt_text: 'Dairy Box Milk 162g - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          external_keys: {
            stripe: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Spray roses',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: 'ssa',
          old_price: null,
          discount: null
        },
        {
          offer_id: 'O9apoVGdyLz5qNX41K',
          offer_real_id: 144,
          offer_title: 'Lindt Chocolate',
          title: 'Small',
          slug: 'small',
          price: '14.90',
          image: {
            ord: 1,
            alt_text: 'Lindt Chocolate - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          external_keys: {
            stripe: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Spray roses',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: 'ssa',
          old_price: null,
          discount: null
        },
        {
          offer_id: 'O9aposVGdyLz5qNX41K',
          offer_real_id: 354,
          offer_title: '40 Pink Tulips',
          title: 'Small',
          slug: 'small',
          price: '55.90',
          image: {
            ord: 1,
            alt_text: '40 Pink Tulips - featured image',
            filename: '1.webp',
            bouquetHeight: null
          },
          external_keys: {
            stripe: null
          },
          is_paid: false,
          payment_id: null,
          base_category_name: 'Spray roses',
          is_bouquet: true,
          quantity: 1,
          height: null,
          package: null,
          policy_id: 1,
          gift_card_text: 'ssa',
          old_price: null,
          discount: null
        }
      ]
    }
  }
};
