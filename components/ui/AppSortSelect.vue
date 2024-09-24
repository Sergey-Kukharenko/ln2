<template>
  <div>
    <div class="sort-desktop">
      <vue-select ref="vueSelect" v-model="sort" :searchable="false" label="text" :options="$options.SORT_OPTIONS">
        <template #option="item">{{ item.text }} </template>
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes"> <img src="/icons/arrow.svg" alt="arrow" /> </span>
        </template>
      </vue-select>
    </div>
    <div class="sort-mobile" @click="isVisible = true">
      <button class="sort-mobile__btn">
        <img src="/icons/sort-mobile.svg" alt="sort" />
      </button>
      <span class="sort-mobile__text">{{ sort.text }}</span>
    </div>
    <app-modal theme="bottom" :visible="isVisible" @close="close">
      <div class="modal-sort">
        <div class="modal-sort__head">
          <h2 class="modal-sort__title">Sort by</h2>
          <button class="modal-sort__close" @click="close">
            <svg-icon name="close" class="button__icon" />
          </button>
        </div>
        <ul class="modal-sort__list">
          <li v-for="item in $options.SORT_OPTIONS" :key="item.id" class="modal-sort__item" @change="changeSort(item)">
            <input
              :id="getItemId(item.id)"
              type="radio"
              :checked="item.text === sort.text"
              :value="item.text"
              @change="changeSort(item)"
            />
            <label :for="getItemId(item.id)">{{ item.text }}</label>
          </li>
        </ul>
      </div>
    </app-modal>
  </div>
</template>

<script>
import { VueSelect } from 'vue-select';

import AppModal from '~/components/shared/AppModal.vue';
import { CATEGORY_PRODUCT_TYPES, PAGINATION } from '~/constants';

const [CATEGORY] = CATEGORY_PRODUCT_TYPES;

const SORT_OPTIONS = [
  {
    id: 1,
    text: 'Best seller',
    type: 'order_by',
    orderDirection: 'desc',
    orderBy: 'popularity'
  },
  {
    id: 2,
    text: 'Price-low to high',
    type: 'order_direction',
    orderDirection: 'asc',
    orderBy: 'price'
  },
  {
    id: 3,
    text: 'Price-high to low',
    type: 'order_direction',
    orderDirection: 'desc',
    orderBy: 'price'
  }
];

export default {
  name: 'AppSortSelect',

  components: {
    VueSelect,
    AppModal
  },

  props: {
    type: {
      type: String,
      default: CATEGORY,
      validate(val) {
        return CATEGORY_PRODUCT_TYPES.includes(val);
      }
    }
  },

  SORT_OPTIONS,

  data() {
    return {
      isVisible: false,
      sort: this.getDefaultSort()
    };
  },

  watch: {
    sort: {
      deep: true,
      handler(value) {
        if (this.$device.isMobileOrTablet) {
          return;
        }

        this.sortBy(value);
      }
    }
  },

  methods: {
    changeSort(item) {
      this.sort = item;
      this.sortBy(item);
      this.close();
    },

    async sortBy({ orderBy, orderDirection }) {
      try {
        const payload = {
          type: this.type.toLocaleLowerCase(),
          slug: this.$route.params.slug,
          params: {
            limit: PAGINATION.limit,
            order_direction: orderDirection,
            order_by: orderBy
          }
        };
        this.$router.push({ query: { orderBy, orderDirection } });
        await this.$accessor.category.fetchCategory(payload);
        this.$emit('update');
      } catch (error) {
        console.error(error);
      }
    },

    getItemId(itemId) {
      return `sort-${itemId}`;
    },

    close() {
      this.isVisible = false;
    },

    onSelect() {
      console.log('onSelect');
    },

    onChange() {
      console.log('onChange');
    },

    getDefaultSort() {
      return (
        SORT_OPTIONS.find(
          (item) =>
            item.orderBy === this.$route.query.orderBy && item.orderDirection === this.$route.query.orderDirection
        ) || {
          id: 0,
          text: 'Sort'
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import 'vue-select/dist/vue-select.css';

:root,
:host {
  --vs-colors--lightest: #fff;
  --vs-colors--light: rgba(60, 60, 60, 0.5);
  --vs-colors--dark: #333;
  --vs-colors--darkest: rgba(0, 0, 0, 0.15);

  /* Search Input */
  --vs-search-input-color: inherit;
  --vs-search-input-bg: rgb(255, 255, 255);
  --vs-search-input-placeholder-color: inherit;

  /* Font */
  --vs-font-size: 14px;
  --vs-line-height: 20px;

  /* Disabled State */
  --vs-state-disabled-bg: rgb(248, 248, 248);
  --vs-state-disabled-color: var(--vs-colors--light);
  --vs-state-disabled-controls-color: var(--vs-colors--light);
  --vs-state-disabled-cursor: not-allowed;

  /* Borders */
  --vs-border-color: var(--vs-colors--lightest);
  --vs-border-width: 1px;
  --vs-border-style: solid;
  --vs-border-radius: 4px;

  /* Actions: house the component controls */
  --vs-actions-padding: 4px 6px 0 3px;

  /* Component Controls: Clear, Open Indicator */
  --vs-controls-color: var(--vs-colors--light);
  --vs-controls-size: 1;
  --vs-controls--deselect-text-shadow: 0 1px 0 #fff;

  /* Selected */
  --vs-selected-bg: #f0f0f0;
  --vs-selected-color: var(--vs-colors--dark);
  --vs-selected-border-color: var(--vs-border-color);
  --vs-selected-border-style: var(--vs-border-style);
  --vs-selected-border-width: var(--vs-border-width);

  /* Dropdown */
  --vs-dropdown-bg: #fff;
  --vs-dropdown-color: inherit;
  --vs-dropdown-z-index: 1000;
  --vs-dropdown-min-width: 160px;
  --vs-dropdown-max-height: 350px;
  --vs-dropdown-box-shadow: 0px 3px 6px 0px var(--vs-colors--darkest);

  /* Options */
  --vs-dropdown-option-bg: #000;
  --vs-dropdown-option-color: var(--vs-dropdown-color);
  --vs-dropdown-option-padding: 3px 20px;

  /* Active State */
  --vs-dropdown-option--active-bg: #5897fb;
  --vs-dropdown-option--active-color: #fff;

  /* Deselect State */
  --vs-dropdown-option--deselect-bg: #fb5858;
  --vs-dropdown-option--deselect-color: #fff;

  /* Transitions */
  --vs-transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);
  --vs-transition-duration: 150ms;
}

.v-select {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;

  .vs__search {
    display: none;
  }

  .vs__clear {
    display: none;
  }

  .vs__dropdown-toggle {
    min-width: 200px;
  }

  .vs__selected-options {
    justify-content: flex-end;
  }

  &.vs--open .vs__dropdown-toggle {
    height: 36px;
  }

  .vs__open-indicator {
    width: 16px;
    height: 16px;
  }

  .vs__dropdown-menu {
    border-radius: 12px;
    padding: 0;
  }

  .vs__dropdown-option {
    padding: 8px 16px;
  }

  .vs__dropdown-option--selected {
    color: #06ad5d;
  }

  .vs__dropdown-option--highlight {
    background: #f7f7f7;
    color: #1f2226;
  }
}
</style>

<style lang="scss" scoped>
.modal-sort {
  padding: 16px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-family: $golos-bold;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
    color: $color-dark-grey;
  }

  &__close {
    width: 16px;
    height: 16px;

    .button__icon {
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 58px;
    border-bottom: 1px solid #eaeaea;
    width: 100%;

    &:nth-last-child(1) {
      border-bottom: 0;
      padding-bottom: 0;
    }

    input {
      display: none;

      &:checked + label {
        &:before {
          border: none;
          background: #26ad4f;
        }
      }
    }

    label {
      width: 100%;
      padding-left: 32px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid #eaeaea;
        background: #fff;
        border-radius: 50%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.3s;
      }

      &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.sort {
  &-desktop {
    @include lt-md {
      display: none;
    }
  }

  &-mobile {
    display: none;
    @include lt-md {
      display: flex;
      align-items: center;
    }
    gap: 4px;
    padding: 10px 10px 10px 0;
    &__text {
      font-family: $golos-regular;
      font-size: 11px;
      line-height: 16px;
      color: #7c7c7c;
    }

    &__btn {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
