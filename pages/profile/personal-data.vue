<template>
  <div class="personal-data">
    <profile-personal-section title="Personal data">
      <app-input
        v-model="form.name.value"
        :error="form.name.errorMsg"
        placeholder="Name"
        pattern="[a-zA-Z]*"
        size="x-large"
      />
      <profile-button-list :selected="selectedGender" :list="gender" @set-item="onSetGender" />
    </profile-personal-section>
    <profile-personal-section title="Date of birth">
      <app-input placeholder="Select" value="" size="x-large" />
    </profile-personal-section>
    <profile-personal-section title="Contacts">
      <app-input placeholder="+7 (995) 905-48-02" size="x-large" value="">
        <template #right>
          <svg-icon name="profile-pencil" />
        </template>
      </app-input>
      <app-input placeholder="Email" value="" size="x-large" />
      <div class="form group">
        <app-button :disabled="fieldsNotFilled" @click="onSubmit">Save</app-button>
        <profile-delete-account />
      </div>
      <div class="text">
        By clicking on the button, you agree to the <a href="" class="text-link">Terms of personal data processing</a>
      </div>
    </profile-personal-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileButtonList from '~/components/profile/profile-button-list.vue';
import ProfileDeleteAccount from '~/components/profile/profile-delete-account.vue';
import ProfilePersonalSection from '~/components/profile/profile-personal-section.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppInput from '~/components/shared/AppInput.vue';
import profile from '~/data/profile';
import { accessorMapper } from '~/store';

const { gender } = profile;
export default Vue.extend({
  name: 'PersonalDataPage',
  components: { ProfileDeleteAccount, AppButton, ProfilePersonalSection, ProfileButtonList, AppInput },

  layout: 'profile',

  data() {
    return {
      gender,
      selectedGender: 'prefer_not_say',
      fieldsNotFilled: false,
      form: {
        name: {
          value: '',
          errorMsg: ''
        },
        phone: {
          errorMsg: '',
          value: ''
        },

        errorMsg: ''
      }
    };
  },

  fetch() {
    this.fetchPersonal();
    const { user } = this.personal;
    this.form.name.value = user.name;
  },

  computed: {
    ...accessorMapper('profile-personal', ['personal']),

    getUser() {
      return this.personal.user;
    }
  },

  methods: {
    ...accessorMapper('profile-personal', ['fetchPersonal', 'updatePersonal']),

    onSetGender(payload) {
      this.selectedGender = payload;
    },

    onSubmit() {
      if (!this.form.name.value) {
        this.form.name.errorMsg = 'field is empty';
      } else {
        this.form.name.errorMsg = '';
      }
    }
  }
});
</script>

<style scoped lang="scss">
.personal-data {
  @include lt-md {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

.icon {
  width: 24px;
  height: 24px;
}

.group {
  & button {
    width: 100%;
  }

  @include gt-sm {
    margin: 26px 0 12px;
  }

  @include lt-md {
    gap: 8px;
    margin: 37px 0 12px;
  }
}

.text {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;

  color: $color-white-grey;

  @include gt-sm {
    text-align: center;
  }

  @include lt-md {
    text-align: left;
  }
}

.text-link {
  color: $color-green;
}
</style>
