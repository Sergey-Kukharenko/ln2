<template>
  <div class="notification-settings-page">
    <pre>{{ notifications }}</pre>
    <profile-section :head="head">
      <app-list-switch>
        <app-item-switch
          v-for="item in transformedList"
          :key="item.name"
          v-model="item.value"
          :label="item.label"
          background="grey"
          direction="reverse"
          justify-content="space-between"
          @change="onChange(item)"
        />
      </app-list-switch>
    </profile-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileSection from '~/components/profile/profile-section.vue';
import AppItemSwitch from '~/components/shared/switch/app-item-switch.vue';
import AppListSwitch from '~/components/shared/switch/app-list-switch.vue';
import profile from '~/data/profile';
import { accessorMapper } from '~/store';

const { head, list } = profile.pages.notifications;
export default Vue.extend({
  name: 'NotificationSettingsPage',
  components: { AppListSwitch, AppItemSwitch, ProfileSection },

  layout: 'profile',

  data() {
    return {
      head,
      list

      // dataFromBackend: {
      //   email_subscription: false,
      //   sms_subscription: true
      // },
      // transformedList: {}
    };
  },

  fetch() {
    this.fetchNotifications();
  },

  computed: {
    ...accessorMapper('notifications', ['notifications']),

    transformedList() {
      const res = [];
      for (const [key] of Object.entries(this.notifications)) {
        list[key] && res.push(list[key]);
      }
      return res;
    }
  },

  methods: {
    ...accessorMapper('notifications', ['fetchNotifications', 'updateNotifications']),

    onChange(item) {
      // console.log(item.name, item.value);
      const payload = {
        ...this.notifications,
        [item.name]: item.value
      };

      this.updateNotifications(payload);
    }
  }
});
</script>
