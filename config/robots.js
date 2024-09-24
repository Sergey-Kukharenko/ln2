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
    Disallow: '/filter*',
    Allow: ['/.png', '/.jpg'],
    Sitemap: 'https://myflowers.co.uk/sitemap.xml'
  }
];
