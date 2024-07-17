<script>
import Vue from 'vue';

import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AddGtag',

  computed: {
    ...accessorMapper('gtag', ['getGtagAddedScript'])
  },

  methods: {
    ...accessorMapper('gtag', ['addGtagScript']),

    onAddGtagScript() {
      if (this.getGtagAddedScript) {
        return;
      }

      const head = document.head;
      const script = document.createElement('script');

      script.innerHTML = `
        gtag('consent', 'default', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
          });
      `;
      head.appendChild(script);

      this.addGtagScript(true);
    }
  }
});
</script>
