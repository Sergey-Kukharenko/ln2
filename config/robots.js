module.exports = [
  {
    UserAgent: 'Googlebot',
    Disallow: ''
  },
  {
    UserAgent: 'Googlebot-image',
    Disallow: ''
  },
  {
    UserAgent: '*',
    Disallow: '',
    Sitemap: `${process.env.DOMAIN_NAME}/sitemap.xml`
  }
];
