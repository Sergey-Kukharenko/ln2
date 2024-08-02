<template>
  <div class="profile-aside-steps">
    <div v-for="(step, idx) in steps" :key="idx" class="step">
      <div class="circle" :class="{ active: step.active }"></div>
      <div class="dash"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileAsideSteps',

  data() {
    return {
      steps: [
        {
          icon: 'profile-dollar',
          active: true
        },
        {
          icon: 'profile-check',
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
      ]
    };
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

  &:last-child {
    & .dash {
      display: none;
    }
  }
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: $bg-grey;
  border-radius: 50%;

  &.active {
    background: #ebfaf0;
    border: 2px solid $color-green;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
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
  right: -5px;
  border-radius: 5px;
  transform: translate(100%, 0);
  margin: auto;
}
</style>
