const PROMO = {
  backgroundImage: {
    desktop: '/images/info/about.webp',
    mobile: '/images/info/about-mobile.webp'
  },
  backgroundColor: '#EBFAF0',
  title: 'About MyFlowers',
  text: 'Delivering flowers. Delighting with smiles.'
};

const TEXT_INFO = {
  columns: [
    // {
    //   title: '3 year',
    //   text: 'we have been giving joy to our customers'
    // },
    {
      title: 'More than 15',
      text: 'varieties of flowers'
    }
  ],
  mainText:
    'We are a new and innovative company providing high quality flowers and a unique delivery service that lets you choose when your flowers are delivered.'
};

const HERO_ITEMS = [
  {
    title: 'Quality',
    text: 'Our online store MyFlowers offers \nyou flowers and floral services \nof only the highest quality'
  },
  {
    title: 'Delivery on time',
    text: 'We carefully monitor the logistics \nand delivery time of each bouquet '
  },
  {
    title: 'Professionals in their field',
    text: 'We have a team of professional florists who will \npick up and make a bright bouquet for every \ntaste and occasion'
  }
];

const SOMETHING_IMPORTANT = {
  title: 'Our Core Focus',
  text: 'Our customers and their loved ones are at the heart of what we do. Our entire brand philosophy is to go above and beyond for our customers. And at the same time, we offer absolute perfection at affordable prices. We deliver on time, we deliver fresh, and we deliver exactly what you order.',
  columns: [
    {
      title: 'Uncompromising Quality',
      text:
        'We have a strict process \n' +
        'of monitoring the freshness \n' +
        'of all our flower collections. We make it a point to deliver top-quality bouquets, 7 days a week.',
      backgroundColor: '#FFE389'
    },
    {
      title: 'Flexible Customisation and Personalisation',
      text:
        'Choose between anonymous gifting (adding more enigma to the surprise) or have us add\n' +
        'a personalised message on the bouquet, expressing just how special your loved one is.',
      backgroundColor: '#D3F3FF'
    },
    {
      title: 'Quality Customer Service',
      text:
        'You can get in touch with one of our customer representatives to inquire about your order or delivery via phone (WhatsApp +44 20 4577 0088) or by sending\n' +
        'an email to support@myflowers.co.uk.',
      backgroundColor: '#FFC6BE'
    },
    {
      title: 'Timely Deliveries',
      text:
        'Delivering on time is the lifeblood of our business.\n' +
        'We pay special attention to the logistics of each order, ensuring each delivery is made on time. No compromises here!\n',
      backgroundColor: '#A0F5AF'
    }
  ]
};

const ADVANTAGES = [
  {
    icon: 'flower',
    color: '#FFE389',
    title: 'Freshness guarantee',
    // eslint-disable-next-line no-multi-str
    text:
      "One of the primary reasons why we're an in-demand flower business in the UK is that we deliver fresh flowers that last, and look absolutely stunning.\n" +
      "At MyFlowers, you can only expect high-quality bouquets. Moreover, we offer customers a 5-day wilting guarantee, where if your flowers do wilt within the first five days of delivery, we'll send you more for free!"
  },
  {
    icon: 'truck',
    color: '#A0F5AF',
    title: 'Speedy Delivery',
    text: "Thanks to our specialised delivery system, you can expect your bouquets to be delivered within 3 hours of placing an order. We're open 7 days a week, which means you can order flowers any time you want."
  },
  {
    icon: 'camera',
    color: '#D3F3FF',
    text:
      "Once we finish preparing your order, we'll send \n" +
      "a photo of the bouquet so that you'll know exactly what the recipient will get. We're all about preparing classy surprises here!"
  }
];

const REVIEWS = [
  {
    images: {
      desktop: 'https://via.placeholder.com/252x300',
      mobile: 'https://via.placeholder.com/144'
    },
    fullName: 'Jessica Davies',
    ratingCount: 4.6,
    text: 'Thank you so much for the bouquet delivered. He was the best. Thanks and to the courier for delivery'
  },
  {
    images: {
      desktop: 'https://via.placeholder.com/252x300',
      mobile: 'https://via.placeholder.com/144'
    },
    fullName: 'Jessica Davies',
    ratingCount: 4.6,
    text: 'Thank you so much for the bouquet delivered. He was the best. Thanks and to the courier for delivery'
  },
  {
    images: {
      desktop: 'https://via.placeholder.com/252x300',
      mobile: 'https://via.placeholder.com/144'
    },
    fullName: 'Jessica Davies',
    ratingCount: 4.6,
    text: 'Thank you so much for the bouquet delivered. He was the best. Thanks and to the courier for delivery'
  },
  {
    images: {
      desktop: 'https://via.placeholder.com/252x300',
      mobile: 'https://via.placeholder.com/144'
    },
    fullName: 'Jessica Davies',
    ratingCount: 4.6,
    text: 'Thank you so much for the bouquet delivered. He was the best. Thanks and to the courier for delivery'
  }
];

export { PROMO, TEXT_INFO, HERO_ITEMS, SOMETHING_IMPORTANT, ADVANTAGES, REVIEWS };
