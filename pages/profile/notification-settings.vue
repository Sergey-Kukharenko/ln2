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
      list,

      dataFromBackend: {
        email_subscription: false,
        sms_subscription: true
      },
      transformedList: {}
    };
  },

  // todo перенести логику в store notification, как будет готов backend
  created() {
    this.onTransformList();
  },

  methods: {
    onChange(item) {
      console.log(item.value, item.label);
    },

    onTransformList() {
      this.transformedList = Object.entries(this.dataFromBackend).map(([key, value]) => ({
        ...list[key],
        value
      }));
    }
  }
});
</script>
