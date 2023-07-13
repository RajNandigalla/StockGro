import { deepCopy } from '../utils';

export function trelloReducer(state = [], { action, payload }) {
  switch (action) {
    case 'INIT':
      return payload;

    case 'ADD_CARD': {
      const updatedState = [...state, payload];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'UPDATE_NAME_OF_CARD': {
      let copy = deepCopy(state);
      const index = copy.findIndex((item) => item.id === Number(payload?.id));
      const currentCard = copy[index];

      currentCard.title = payload?.value;

      const updatedState = [...copy];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'DELETE_CARD': {
      const updatedState = state.filter(({ id }) => id !== Number(payload?.id));
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'ADD_ITEM_TO_CARD': {
      let copy = deepCopy(state);
      const index = copy.findIndex((item) => item.id === Number(payload?.id));
      const currentCard = copy[index];

      const item = {
        id: +new Date(),
        title: '',
        description: '',
      };

      currentCard?.child?.push(item);

      const updatedState = [...copy];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'UPDATE_CONTENT_OF_ITEM': {
      let copy = deepCopy(state);
      const index = copy.findIndex((item) => item.id === Number(payload?.id));
      const currentCard = copy[index];

      const findIndex = currentCard?.child.findIndex(
        (item) => item.id === Number(payload?.childId)
      );
      currentCard.child[findIndex] = {
        ...currentCard.child[findIndex],
        [payload?.name]: payload?.value,
      };

      const updatedState = [...copy];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'DELETE_ITEM_TO_CARD': {
      let copy = deepCopy(state);
      const index = copy.findIndex((item) => item.id === Number(payload?.id));
      const currentCard = copy[index];

      console.log(currentCard);
      const findIndex = currentCard?.child.findIndex(
        (item) => item.id === Number(payload?.childId)
      );
      currentCard?.child?.splice(findIndex, 1);

      const updatedState = [...copy];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'MOVE_ITEM': {
      let copy = deepCopy(state);
      const index = copy.findIndex((item) => item.id === Number(payload?.from));
      const currentCard = copy[index];

      const findIndex = currentCard?.child.findIndex(
        (item) => item.id === Number(payload?.childId)
      );
      const movedItem = currentCard?.child?.splice(findIndex, 1);

      const toIndex = copy.findIndex((item) => item.id === Number(payload?.to));
      const toCard = copy[toIndex];
      toCard?.child?.unshift(...movedItem);

      const updatedState = [...copy];
      localStorage.setItem('data', JSON.stringify(updatedState));
      return updatedState;
    }

    default:
      return state;
  }
}
