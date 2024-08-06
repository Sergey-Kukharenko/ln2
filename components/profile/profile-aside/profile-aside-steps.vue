<template>
  <div class="profile-aside-steps">
    <div v-for="(step, idx) in result" :key="idx" class="step" :class="{ success: step.success, danger: step.danger }">
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
  created: 0,
  confirmed: 1,
  collected: 2,
  courier: 3,
  delivered: 4
};

export default {
  name: 'ProfileAsideSteps',

  data() {
    return {
      steps: [
        {
          icon: 'profile-dollar',
          success: false
        },
        {
          icon: 'profile-checking',
          success: false
        },
        {
          icon: 'profile-processing',
          success: false
        },
        {
          icon: 'profile-courier',
          success: false
        },
        {
          icon: 'profile-flag',
          success: false,
          danger: false
        }
      ],
      status: 'created'
    };
  },

  computed: {
    successElementsIndex() {
      return MAP_STATUSES[this.status];
    },

    processing() {
      return this.steps.map((step, idx) =>
        idx <= this.successElementsIndex
          ? {
              ...step,
              success: true
            }
          : step
      );
    },

    canceled() {
      return this.steps.map((step, idx) =>
        idx === this.steps.length - 1
          ? {
              ...step,
              icon: 'profile-cancel',
              danger: true
            }
          : step
      );
    },

    result() {
      return this.successElementsIndex === undefined ? this.canceled : this.processing;
    }
  }
};
</script>

<style scoped lang="scss">
.profile-aside-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step {
  position: relative;

  &:first-child {
    & .dash {
      display: none;
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
