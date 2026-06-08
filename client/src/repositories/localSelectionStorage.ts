import type { SelectionStorage } from './SelectionStorage';

const SELECTION_STORAGE_KEY = 'cart-selection';

export const localSelectionStorage: SelectionStorage = {
  getIds() {
    const savedIds = window.localStorage.getItem(SELECTION_STORAGE_KEY);

    if (savedIds === null) {
      return null;
    }

    return JSON.parse(savedIds);
  },

  setIds(ids) {
    window.localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
  },
};
