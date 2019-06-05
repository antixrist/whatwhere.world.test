import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import { unserializeSorting, serializeSorting, parseNumberFromQS } from '@/utils';

export const filtersDefaults = {
  page: 1,
  perPage: 5,
  sort: [],
};

export default function asyncData({ redirect, route }) {
  const { query } = route;

  Object.keys(query).forEach((key) => {
    const value = query[key];
    switch (key) {
      case 'sort':
        query[key] = unserializeSorting(value);
        break;
      case 'page':
      case 'perPage':
        query[key] = parseNumberFromQS(value, filtersDefaults[key]);
        break;
      default:
        query[key] = value;
    }
  });

  let isRedirectNeeded = false;
  Object.keys(filtersDefaults).forEach((key) => {
    if (!isEqual(query[key], filtersDefaults[key])) return;

    isRedirectNeeded = true;
    delete query[key];
  });

  if (isRedirectNeeded) {
    if (query.sort) query.sort = serializeSorting(query.sort);
    return redirect(301, { ...route, query });
  }

  const filters = {
    ...cloneDeep(filtersDefaults),
    ...pick(query, Object.keys(filtersDefaults)),
  };

  return { filters };
}
