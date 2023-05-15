const PROMO = {
  backgroundImage: {
    desktop: '/images/info/contact.webp',
    mobile: '/images/info/contact-mobile.webp'
  },
  backgroundColor: '#EBFAF0',
  title: 'Contacts',
  text: 'Our employees are always in touch, and our offices are located in almost every city'
};

const TEXT_INFO = {
  columns: [
    {
      title: 'More 50',
      text: 'employees who will answer your questions'
    },
    {
      title: '24 hours',
      text: 'a day, we respond and help our customers'
    }
  ],
  mainText: 'We are a new innovative company providing high service and fast delivery like no other'
};

const SOMETHING_IMPORTANT = {
  title: 'Information',
  columns: [
    {
      link: {
        url: 'tel:+442045770088',
        text: '+44 20 4577 0088'
      },
      title: 'Contact phone number',
      text: 'We accept and deliver orders by phone around the clock and seven days a week'
    },
    {
      link: {
        url: 'mailto:support@myflowers.co.uk',
        text: 'support@myflowers.co.uk'
      },
      title: 'Email',
      text: 'If you hesitate to call - write us, we will be happy to answer'
    },
    {
      social: [
        {
          url: 'https://www.facebook.com/MyFlowersUK/?mibextid=ZbWKwL',
          icon: 'social-facebook'
        },
        // {
        //   url: '',
        //   icon: 'social-twitter'
        // },
        {
          url: 'https://instagram.com/myflowers.co.uk?igshid=YmMyMTA2M2Y=',
          icon: 'social-instagram'
        }
      ],
      title: 'We are in social networks',
      text: 'Follow all the news on social networks, there are a lot of interesting things there'
    }
  ]
};

export { PROMO, TEXT_INFO, SOMETHING_IMPORTANT };
