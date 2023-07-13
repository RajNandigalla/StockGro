import debounce from 'lodash/debounce';

const { dispatch } = window.__store__;

let addBtn = document.getElementById('add_to_list');
let card = document.getElementById('card');

addBtn.addEventListener('click', () => {
  const card = {
    id: +new Date(),
    title: '',
    child: [],
  };

  dispatch({ action: 'ADD_CARD', payload: card });
});

card?.addEventListener('click', (ev) => {
  if (ev.target.id === 'delete-btn') {
    const currentId = ev.target?.dataset?.id;
    dispatch({ action: 'DELETE_CARD', payload: { id: currentId } });
  } else if (ev.target.id === 'addItem-btn') {
    const parentId = ev.target?.dataset?.id;
    dispatch({ action: 'ADD_ITEM_TO_CARD', payload: { id: parentId } });
  } else if (ev.target.id === 'deleteChild-btn') {
    const parentId = ev.target?.dataset?.id;
    const childId = ev.target?.dataset?.childid;
    dispatch({
      action: 'DELETE_ITEM_TO_CARD',
      payload: { id: parentId, childId },
    });
  }
});

const debounceInput = debounce((ev) => {
  if (ev.target.name === 'ParentTitle') {
    const currentId = ev.target?.dataset?.id;
    dispatch({
      action: 'UPDATE_NAME_OF_CARD',
      payload: { id: Number(currentId), value: ev.target.value },
    });
  } else if (ev.target.name === 'title' || ev.target.name === 'description') {
    const parentId = ev.target?.dataset?.id;
    const childId = ev.target?.dataset?.childid;
    dispatch({
      action: 'UPDATE_CONTENT_OF_ITEM',
      payload: {
        id: Number(parentId),
        childId,
        name: ev.target.name,
        value: ev.target.value,
      },
    });
  }
}, 700);

card.addEventListener('input', debounceInput);

card.addEventListener('dragstart', (ev) => {
  const parentId = ev.target?.dataset?.id;
  const childId = ev.target?.dataset?.childid;
  ev.dataTransfer.setData('text', JSON.stringify({ from: parentId, childId }));
});

card.addEventListener('drop', (ev) => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  data = JSON.parse(data);

  const parentId = ev.target?.dataset?.id;
  if (parentId === data?.id) return null;
  dispatch({ action: 'MOVE_ITEM', payload: { ...data, to: parentId } });
});

card.addEventListener('dragover', (ev) => {
  ev.preventDefault();
});
