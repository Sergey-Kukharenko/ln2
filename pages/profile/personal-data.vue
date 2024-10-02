<template>
  <div class="personal-data">
    <profile-personal-section title="Personal data">
      <app-input v-model="user.name" :error="errors.name" placeholder="Name" size="x-large" @keydown="onLettersOnly" />
      <profile-button-list :selected="user.gender" :list="gender" @set-item="onSetGender" />
    </profile-personal-section>
    <profile-personal-section title="Date of birth">
      <app-input v-model="user.birth" placeholder="Select" size="x-large" max="10" @keydown="onDateFormat" />
    </profile-personal-section>
    <profile-personal-section title="Contacts">
      <app-input v-model="user.phone" placeholder="+7 (995) 905-48-02" size="x-large">
        <template #right>
          <svg-icon name="profile-pencil" />
        </template>
      </app-input>
      <app-input v-model="user.email" :error="errors.email" placeholder="Email" size="x-large" />
      <div class="form group">
        <app-button :disabled="errors.fieldsNotFilled" @click="onSubmit">Save</app-button>
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
import { SUBSCRIBE_INVALID_EMAIL, SUBSCRIBE_MESSAGES } from '~/constants';
import profile from '~/data/profile';
import { isEmailValid } from '~/helpers/validators';
import { accessorMapper } from '~/store';

const { gender } = profile;
export default Vue.extend({
  name: 'PersonalDataPage',

  components: { ProfileDeleteAccount, AppButton, ProfilePersonalSection, ProfileButtonList, AppInput },

  layout: 'profile',

  middleware: 'auth',

  data() {
    return {
      gender,
      user: {
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        phone: '',
        birth: '',
        gender: ''
      },
      errors: {
        name: '',
        email: '',
        fieldsNotFilled: false
      }
    };
  },

  computed: {
    ...accessorMapper('profile-personal', ['personal'])
  },

  mounted() {
    this.user = { ...this.personal.user };
  },

  methods: {
    ...accessorMapper('profile-personal', ['fetchPersonal', 'updatePersonal']),

    onLettersOnly(event) {
      const key = event.keyCode;

      const isNumber = !((key >= 65 && key <= 90) || key === 8 || key === 32);

      if (isNumber) {
        event.preventDefault();
      }
    },

    // Временно отключен
    onDateFormat(e) {
      const key = e.keyCode;

      if ((key <= 47 || key >= 57) && key !== 8) {
        e.preventDefault();
      }

      const len = e.target.value.length;

      if ((len !== 1 || len !== 3) && key === 47) {
        e.preventDefault();
      }

      if (key !== 8 && (len === 4 || len === 7)) {
        e.target.value += '-';
      }
    },

    onSetGender(gender) {
      this.user.gender = gender;
    },

    onValidateName() {
      if (this.user.name === '') {
        this.errors.name = 'Enter your name';
      } else {
        this.errors.name = '';
      }
    },

    onValidateEmail() {
      if (this.user.email === '') {
        this.errors.email = SUBSCRIBE_MESSAGES.error.empty;
      } else if (!isEmailValid(this.user.email)) {
        this.errors.email = SUBSCRIBE_INVALID_EMAIL;
      } else {
        this.errors.email = '';
      }
    },

    onSubmit() {
      this.onValidateName();
      this.onValidateEmail();

      if (this.errors.name || this.errors.email) {
        return false;
      }

      this.updatePersonal(this.user);
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
