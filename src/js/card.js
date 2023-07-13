import deleteImg from './../assets/close.svg';
import addImg from './../assets/add.svg';

CardUI([]);
window.__store__.subscribe((res) => CardUI(res));

function ChildItem(item, parentId) {
  const { id, title, description } = item;

  return `
    <div class="flex flex-col childItem" data-id=${parentId} data-childId="${id}" draggable="true">
      <div class="flex justify-end">
        <button data-id=${parentId} data-childId=${id} id="deleteChild-btn" class="deleteBtn ml-1">
          <img src=${deleteImg} height="16" width="16"/>
        </button>
      </div>
      <div><small>Item - ${id}</small> </div>
      <input value="${title}" data-id=${parentId} data-childId=${id} name="title" placeholder="(untitled)" class="mt-2" />
      <textarea class="mt-1" data-id=${parentId} data-childId=${id} name="description" placeholder="(untitled)" rows="4">${description}</textarea>
    </div>
  `;
}

function CardItem(item) {
  const { id, child, title } = item;
  return `
    <div data-id=${id} class="card__item relative">
      <div><small>Card No - ${id} </small></div>
      <div class="flex justify-between mt-2 align-center">
        <input class="" value="${title}" data-id=${id} name="ParentTitle" placeholder="(untitled)"/>
        <button data-id=${id} id="delete-btn" class="ml-1 deleteBtn">
          <img src=${deleteImg} height="16" width="16"/>
        </button>
      </div>
     
     <div class="flex flex-col mt-2">
      ${child.map((item) => ChildItem(item,id)).join('')}
     </div>

      <div class="flex justify-center absolute addBtn">
        <button data-id=${id} id="addItem-btn" class="deleteBtn">
          <img src=${addImg} height="16" width="16"/>
        </button>
      </div>
    </div>
  `;
}

function CardUI(res) {
  const CardList = `
      <div id="card_list" class="card ${res.length === 0 && 'w-100'} flex-wrap">
        ${
          res.length > 0
            ? res.map((item) => CardItem(item)).join('')
            : `<div class="flex justify-center align-center w-100">Empty Records</div>`
        }
      </div>
  `;

  const cardElm = document.getElementById('card');
  cardElm.innerHTML = CardList;
}
