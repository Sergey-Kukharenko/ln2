<template>
  <div class="notification-settings-page">
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

import ProfileSection from '~/components/profile/ProfileSection.vue';
import AppItemSwitch from '~/components/shared/switch/AppItemSwitch.vue';
import AppListSwitch from '~/components/shared/switch/AppListSwitch.vue';
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
    };
  },

  computed: {
    ...accessorMapper('profile-notifications', ['notifications']),

    transformedList() {
      return Object.entries(this.notifications)
        .filter(([key]) => list[key])
        .map(([key, value]) => ({ ...list[key], value }));
    }
  },

  methods: {
    ...accessorMapper('profile-notifications', ['fetchNotifications', 'updateNotifications']),

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
