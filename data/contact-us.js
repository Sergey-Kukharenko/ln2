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
      text: 'We offer round-the-clock services, 7 days a week, and accept orders via phone. You can contact us at +44 20 4577 0088'
    },
    {
      link: {
        url: 'mailto:support@myflowers.co.uk',
        text: 'support@myflowers.co.uk'
      },
      title: 'Email',
      text: 'However, you can also contact us via email by sending us a message or query at support@myflowers.co.uk.'
    },
    {
      social: [
        {
          url: 'https://www.facebook.com/myflowers.co.uk/',
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
      title: 'Our Social Media',
      text: 'You can follow us on Facebook and Instagram. Be sure to keep an eye out for MyFlowers discounts and promo deals.'
    }
  ]
};

export { PROMO, TEXT_INFO, SOMETHING_IMPORTANT };
