<template>
  <div class="profile-bonus-history-item">
    <div class="col">
      <div class="title">{{ item.title }}</div>
      <div class="description">
        <span>{{ item.description }}</span>
        <span v-if="item.expirationDate" class="expiration-date">
          <img src="/icons/fire.png" alt="fire" class="icon" />
          {{ item.expirationDate }}
        </span>
      </div>
    </div>
    <div class="col">
      <div class="price" :class="{ green: item.increment, red: item.decrement }">
        {{ item.increment }}
        {{ item.decrement }}
      </div>
      <div class="date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileBonusHistoryItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="scss">
.profile-bonus-history-item {
  display: flex;
  justify-content: space-between;

  @include gt-sm {
    padding: 16px;
    background: $bg-grey;
    border-radius: 16px;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.col:last-child {
  text-align: right;
}

.title {
  font-family: $golos-medium;
  color: $color-dark-grey;

  @include lt-md {
    font-size: 14px;
  }
}

.date,
.description {
  font-family: $golos-regular;
  color: $color-white-grey;

  @include gt-sm {
    font-size: 14px;
  }

  @include lt-md {
    font-size: 11px;
    letter-spacing: -0.01em;
  }
}

.description {
  display: flex;
  align-items: center;
  gap: 4px;
}

.expiration-date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.price {
  font-family: $golos-bold;

  @include lt-md {
    font-size: 14px;
  }

  &.green {
    color: #06ad5d;
  }

  &.red {
    color: $color-like-active;
  }
}
</style>
