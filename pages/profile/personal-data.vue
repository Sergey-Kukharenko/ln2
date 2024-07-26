<template>
  <div class="personal-data">
    <div class="section">
      <div class="column">
        <div class="title">{{ personal.title }}</div>
      </div>
      <div class="column">
        <div class="form">
          <app-input :placeholder="personal.form.name.placeholder" value="" size="x-large" />
          <profile-button-list :buttons="personal.form.buttons" />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="column">
        <div class="title">{{ birth.title }}</div>
      </div>
      <div class="column">
        <div class="form">
          <app-input :placeholder="birth.form.select.placeholder" value="" size="x-large" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileButtonList from '~/components/profile/profile-button-list.vue';
import AppInput from '~/components/shared/AppInput.vue';
import profile from '~/data/profile';

const { personal, birth } = profile.pages.personal;
export default Vue.extend({
  name: 'PersonalDataPage',
  components: { ProfileButtonList, AppInput },

  layout: 'profile',

  data() {
    return {
      personal,
      birth
    };
  }
});
</script>

<style scoped lang="scss">
.personal-data {
}

.section {
  display: flex;
  padding: 32px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
}

.column {
  width: 50%;
}

.title {
  font-family: $Literata;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
}

.icon {
  width: 24px;
  height: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
