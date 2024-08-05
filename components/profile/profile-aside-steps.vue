<template>
  <div class="profile-aside-steps">
    <div v-for="(step, idx) in getSteps" :key="idx" class="step" :class="{ active: step.active }">
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
          active: false
        },
        {
          icon: 'profile-checking',
          active: false
        },
        {
          icon: 'profile-processing',
          active: false
        },
        {
          icon: 'profile-courier',
          active: false
        },
        {
          icon: 'profile-flag',
          active: false
        }
      ],
      status: 'created'
    };
  },

  computed: {
    getSelectedStepsNumber() {
      return MAP_STATUSES[this.status];
    },

    transformedSteps() {
      return this.steps.map((step, idx) =>
        idx <= this.getSelectedStepsNumber
          ? {
              ...step,
              active: true
            }
          : step
      );
    },

    getSteps() {
      return this.getSelectedStepsNumber === undefined ? this.steps : this.transformedSteps;
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

  &.active {
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
