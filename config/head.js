export default {
  title: 'MyFlowers',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
    { hid: 'description', name: 'description', content: '' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'facebook-domain-verification', content: 'l0j1vu5w4k80362s29i1t5ie24fboc' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'preconnect',
      href: 'https://cdn.myflowers.co.uk',
      crossorigin: 'anonymous'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com/',
      crossorigin: 'anonymous'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.gstatic.com/'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200;0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,200;1,7..72,300;1,7..72,400;1,7..72,500;1,7..72,600;1,7..72,700;1,7..72,800;1,7..72,900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet'
    }
  ],
  script: [
    {
      hid: 'gtm-script1',
      src: 'https://www.googletagmanager.com/gtag/js?id=AW-11072963382',
      async: true,
      defer: true
    },
    {
      hid: 'gtm-script2',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-11072963382', {'allow_enhanced_conversions': true});
      `,
      type: 'text/javascript',
      charset: 'utf-8'
    },

    {
      innerHTML: `
        mindbox = window.mindbox || function() { mindbox.queue.push(arguments); };
        mindbox.queue = mindbox.queue || [];
        mindbox('create', {
            endpointId: 'myflowers.Website'
        });
      `,
      type: 'text/javascript'
    },
    {
      src: 'https://api.mindbox.cloud/scripts/v1/tracker.js',
      async: true,
      defer: true
    },

    {
      innerHTML: `
        (function (w, d, t, r, u) {
          var f, n, i;
          (w[u] = w[u] || []),
            (f = function () {
              var o = { ti: '199007876' };
              (o.q = w[u]), (w[u] = new UET(o)), w[u].push('pageLoad');
            }),
            (n = d.createElement(t)),
            (n.src = r),
            (n.async = 1),
            (n.onload = n.onreadystatechange =
              function () {
                var s = this.readyState;
                (s && s !== 'loaded' && s !== 'complete') ||
                  (f(), (n.onload = n.onreadystatechange = null));
              }),
            (i = d.getElementsByTagName(t)[0]),
            i.parentNode.insertBefore(n, i);
        })(window, document, 'script', '//bat.bing.com/bat.js', 'uetq');
     `
    }
  ],

  __dangerouslyDisableSanitizers: ['script', 'noscript']
};
