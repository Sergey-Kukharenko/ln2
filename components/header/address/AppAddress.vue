<template>
  <div class="container">
    <div class="container__header">
      <h1>Address finder</h1>
    </div>

    <div class="container__body">
      <div class="container__layout">
        <app-input
          autocomplete="off"
          name="address"
          placeholder="Start typing a post code, street or address"
          size="x-large"
          :value="query"
          @input="onInputAddress"
        />
        <app-list v-show="isList" :list="list" @clearQuery="onClearQuery" />
        <app-cities-by-default v-if="isCitiesByDefault" />
      </div>
    </div>
  </div>
</template>

<script>
import AppList from './AppList.vue';

import { woosMapService } from '@/services/woosMapService';
import AppCitiesByDefault from '~/components/header/address/AppCitiesByDefault.vue';
import AppInput from '~/components/shared/AppInput.vue';

export default {
  name: 'AppAddress',

  components: { AppCitiesByDefault, AppList, AppInput },

  data() {
    return {
      query: '',
      list: []
    };
  },

  computed: {
    isList() {
      return this.list.length > 0;
    },

    isCitiesByDefault() {
      return this.$device.isMobileOrTablet && !this.isList;
    }
  },

  methods: {
    onClearQuery() {
      this.query = '';
    },

    transformLocalitiesArray(arr) {
      return arr.map((item) => {
        const newArr = item.description.split(',');
        const country = newArr.splice(-1, 1);

        return {
          city: newArr.splice(-2).join().trim(),
          address: newArr.join(),
          country: country.join().trim()
        };
      });
    },

    async onInputAddress(value) {
      this.query = value;

      if (this.query.length < 3) {
        this.list = [];
        return;
      }

      const localities = await woosMapService(this.query);
      this.list = this.transformLocalitiesArray(localities);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  @include gt-sm {
    width: 500px;
    padding-top: 18px;
  }

  &__layout {
    @include gt-sm {
      padding: 0 24px;
    }
  }

  &__header {
    @include gt-sm {
      padding: 0 24px;
      border-bottom: 1px solid #dde0e6;
    }

    @include lt-md {
      display: none;
    }
  }

  &__body {
    @include gt-sm {
      margin-top: 24px;
      height: 305px;
    }

    @include lt-md {
      margin: 0;
    }
  }
}
</style>
