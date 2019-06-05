<template>
  <form
    :class="$options.name"
    @submit.prevent="onSubmit()"
  >
    <div class="col-4">
      <label>
        <span>Город</span>
        <input
          ref="nameInput"
          v-model.trim="form.name"
          class="form-control input-block"
          type="text"
          placeholder="Город"
        >
      </label>
    </div>

    <div class="col-4">
      <label>
        <span>Температура воздуха, &deg;C</span>
        <input
          v-model.number="form.temperature"
          class="form-control input-block"
          type="text"
          placeholder="Температура воздуха"
        >
      </label>
    </div>
    <div class="col-4 clearfix">
      <div class="gutter">
        <div class="col-6 float-left">
          <label>
            <span>Скорость ветра, м/с</span>
            <input
              v-model.trim.number="form.wind.speed"
              class="form-control input-block"
              type="text"
              placeholder="Скорость ветра"
            >
          </label>
        </div>
        <div class="col-6 float-left">
          <label>
            <span>Направление ветра</span>
            <input
              v-model.trim="form.wind.direction"
              class="form-control input-block"
              type="text"
              placeholder="Направление ветра"
            >
          </label>
        </div>
      </div>
    </div>
    <div class="col-4">
      <label>
        <span>Давление, мм рт. ст.</span>
        <input
          v-model.number="form.pressure"
          class="form-control input-block"
          type="text"
          placeholder="Давление"
        >
      </label>
    </div>

    <div
      v-if="hasAttempt && errors.length"
      class="flash flash-error / col-4"
    >
      <div
        v-for="error in errors"
        :key="error"
        class="error"
        v-text="error"
      />
    </div>

    <div class="col-4 clearfix">
      <div class="gutter">
        <div class="col-6 float-left">
          <button
            class="btn btn-primary input-block"
            type="submit"
            v-text="'Добавить'"
          />
        </div>
        <div class="col-6 float-left">
          <router-link
            :to="{ name: 'index' }"
            class="btn input-block text-center"
            v-text="'Закрыть'"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import get from 'lodash/get';
import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'page-add-city',
  data: () => ({
    hasAttempt: false,
    form: {
      name: null,
      temperature: null,
      wind: {
        speed: null,
        direction: null,
      },
      pressure: null,
    },
  }),
  computed: {
    ...mapGetters('cities', ['isExistsCity']),

    errors() {
      const errors = [];

      if (this.isExistsCity(this.form)) {
        errors.push('Такой город уже существует.');
      }
      if (Object.values(this.form).some(val => val === '' || val === null)) {
        errors.push('Все поля обязательны к заполнению.');
      }

      const numericFields = {
        temperature: 'Температура',
        'wind.speed': 'Скорость ветра',
        pressure: 'Давление',
      };

      const numericErrorsFields = Object.keys(numericFields)
        .filter((key) => {
          const val = get(this.form, key);
          return val !== '' && val !== null && (!isNumber(val) || isNaN(val));
        });

      if (numericErrorsFields.length) {
        const fieldTitles = numericErrorsFields.map(key => numericFields[key]);
        const length = fieldTitles.length;
        const titleString = length > 1
          ? `Поля ${fieldTitles.slice(0, length - 1).map(_ => `"${_}"`).join(', ')} и "${fieldTitles[length - 1]}" должны быть числом.`
          : `Поле "${fieldTitles[0]}" должно быть числом.`;
        errors.push(titleString);
      }

      return errors;
    },

    isValid() {
      return !this.errors.length;
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.hasAttempt = false;
      },
    },
  },
  methods: {
    ...mapMutations('cities', ['add']),

    onSubmit() {
      const defaults = this.$options.data();
      this.hasAttempt = true;

      if (!this.isValid) return;

      this.add(this.form);
      this.form = defaults.form;
      this.$refs.nameInput.focus();
    },
  },
};

</script>

<style lang="scss" scoped>
.page-add-city {
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
}

label {
  display: block;

  > span {
    margin-bottom: 5px;
  }
}
</style>
