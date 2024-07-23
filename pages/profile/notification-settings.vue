<template>
  <div class="notification-settings-page">
    <profile-section :head="head">
      <app-list-switch>
        <app-item-switch
          v-for="item in list"
          :key="item.id"
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

  methods: {
    onChange(item) {
      console.log('-------');
      console.log(item.value, item.label);
      console.log('-------');
    }
  }
});
</script>

<style scoped lang="scss">
.notification-settings {
}
</style>
