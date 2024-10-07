<template>
  <div class="profile-aside-steps">
    <div
      v-for="(step, idx) in result"
      :key="idx"
      class="step"
      :class="{ success: step.success, half: step.half, danger: step.danger }"
    >
      <div class="dash" />
      <div class="circle">
        <div class="border" />
        <svg-icon :name="step.icon" />
      </div>
    </div>
  </div>
</template>

<script>
const MAP_STATUSES = {
  BASKET: 'CREATED',
  ORDER: 'CREATED',

  PAYMENT: 'CREATED',
  PAID: 'CREATED',
  FAIL_PAID: 'CREATED',
  CONFIRMED: 'CONFIRMED',
  PACKED: 'COLLECTING',
  COURIER_ASSIGNED: 'COURIER',
  DELIVERING: 'COURIER',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
  REFUNDED_FROM_PROFILE: 'CANCELED'
};

const MAP_ITEMS = {
  CREATED: {
    0: { half: true }
  },
  CONFIRMED: {
    0: { success: true },
    1: { success: true }
  },
  COLLECTING: {
    0: { success: true },
    1: { success: true },
    2: { success: true }
  },
  COURIER: {
    0: { success: true },
    1: { success: true },
    2: { success: true },
    3: { half: true }
  },
  DELIVERING: {
    0: { success: true },
    1: { success: true },
    2: { success: true },
    3: { success: true },
    4: { half: true }
  },
  DELIVERED: {
    0: { success: true },
    1: { success: true },
    2: { success: true },
    3: { success: true },
    4: { success: true }
  },
  CANCELED: {
    4: { icon: 'profile-cancel', danger: true }
  }
};

export default {
  name: 'ProfileAsideSteps',

  props: {
    status: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      steps: [
        {
          icon: 'profile-dollar',
          success: false,
          half: false,
          danger: false
        },
        {
          icon: 'profile-checking',
          success: false,
          half: false,
          danger: false
        },
        {
          icon: 'profile-processing',
          success: false,
          half: false,
          danger: false
        },
        {
          icon: 'profile-courier',
          success: false,
          half: false,
          danger: false
        },
        {
          icon: 'profile-flag',
          success: false,
          half: false,
          danger: false
        }
      ]
    };
  },

  computed: {
    getStatus() {
      return MAP_STATUSES[this.status];
    },

    changedItemsObj() {
      return MAP_ITEMS[this.getStatus];
    },

    result() {
      return this.steps.map((item, index) => {
        const changedItem = this.changedItemsObj[index];

        return changedItem ? { ...item, ...changedItem } : item;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.profile-aside-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include gt-sm {
    margin-top: 29px;
  }

  @include lt-md {
    margin-top: 20px;
  }
}

.step {
  position: relative;

  &:first-child {
    & .dash {
      display: none;
    }
  }

  &.half {
    & .circle {
      color: $color-green;
      background: #ebfaf0;
    }

    & .dash {
      background: $color-green;
    }

    & .border {
      border: 2px solid $color-green;
      border-bottom-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }

    & .icon {
      fill: currentColor;
    }
  }

  &.success {
    & .circle {
      color: $color-green;
      background: #ebfaf0;
    }

    & .dash {
      background: $color-green;
    }

    & .border {
      border: 2px solid $color-green;
      //border-bottom-color: transparent;
      //border-left-color: transparent;
      //transform: rotate(45deg);
    }

    & .icon {
      fill: currentColor;
    }
  }

  &.danger {
    & .circle {
      background: #ffeff0;
    }

    & .border {
      border: 2px solid $color-like-active;
    }
  }
}

.dash {
  display: block;
  width: 19px;
  height: 2px;
  background: #eaeaea;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -5px;
  border-radius: 5px;
  transform: translate(-100%, 0);
  margin: auto;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;
  background: $bg-grey;
  border-radius: 50%;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
