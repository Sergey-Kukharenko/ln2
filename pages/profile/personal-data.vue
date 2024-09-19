<template>
  <div class="personal-data">
    <profile-personal-section title="Personal data">
      <app-input v-model="user.name" placeholder="Name" pattern="[a-zA-Z]*" size="x-large" />
      <profile-button-list :selected="user.gender" :list="gender" @set-item="onSetGender" />
    </profile-personal-section>
    <profile-personal-section title="Date of birth">
      <app-input v-model="user.birth" placeholder="Select" size="x-large" />
    </profile-personal-section>
    <profile-personal-section title="Contacts">
      <app-input v-model="user.phone" placeholder="+7 (995) 905-48-02" size="x-large">
        <template #right>
          <svg-icon name="profile-pencil" />
        </template>
      </app-input>
      <app-input v-model="user.email" placeholder="Email" size="x-large" />
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

import ProfileButtonList from '~/components/profile/ProfileButtonList.vue';
import ProfileDeleteAccount from '~/components/profile/ProfileDeleteAccount.vue';
import ProfilePersonalSection from '~/components/profile/ProfilePersonalSection.vue';
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
      user: {
        name: '',
        phone: '',
        birth: '',
        email: '',
        gender: ''
      },
      fieldsNotFilled: false
    };
  },

  fetch() {
    this.fetchPersonal();

    this.user = { ...this.personal.user };
  },

  computed: {
    ...accessorMapper('profile-personal', ['personal'])
  },

  methods: {
    ...accessorMapper('profile-personal', ['fetchPersonal', 'updatePersonal']),

    onSetGender(gender) {
      this.user.gender = gender;
    },

    onSubmit() {
      const payload = {
        ...this.personal,
        id: this.id,
        user: { ...this.user }
      };

      this.updatePersonal(payload);
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
    margin-top: 9px;
    padding: 20px 0 12px;
    border-top: 1px solid #eaeaea;
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
