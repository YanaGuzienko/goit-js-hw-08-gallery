import images from '/js/gallery-items.js';
console.log(images[+1].original);
const refs = {
  ul: document.querySelector('.js-gallery'),
  div: document.querySelector('.js-lightbox'),
  imgModal: document.querySelector('.lightbox__image'),
  btnModal: document.querySelector('[data-action="close-lightbox"]'),
  divOverlay: document.querySelector('.lightbox__overlay'),
};
let index = 0;
let activeIndex = 0;
const createElement = element => {
  const liItem = document.createElement('li');
  const link = document.createElement('a');
  const img = document.createElement('img');
  liItem.classList.add('gallery__item');
  link.classList.add('gallery__link');
  img.classList.add('gallery__image');
  link.setAttribute('href', `${element.original}`);
  img.setAttribute('src', `${element.preview}`);
  img.setAttribute('alt', `${element.description}`);
  img.setAttribute('data-source', `${element.original}`);
  img.setAttribute('data-index', `${index}`);

  liItem.appendChild(link);
  link.appendChild(img);

  return liItem;
};

images.forEach(element => {
  createElement(element);
  index += 1;
  refs.ul.appendChild(createElement(element));
});

refs.ul.addEventListener('click', ulClick);

function ulClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  openModal();
  refs.imgModal.src = event.target.dataset.source;
  refs.imgModal.alt = event.target.alt;

  activeIndex = Number(event.target.dataset.index);

  window.addEventListener('keydown', nextImg);
  window.addEventListener('keydown', prevImg);
}

function openModal() {
  refs.div.classList.add('is-open');
}
function closeModal() {
  refs.div.classList.remove('is-open');
  refs.imgModal.src = '';
}

function nextImg(event) {
  if (event.code === 'ArrowRight' && activeIndex < images.length - 1) {
    refs.imgModal.setAttribute('src', `${images[activeIndex].original}`);

    activeIndex += 1;
  }
}

function prevImg(event) {
  if (event.code === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
  }
  refs.imgModal.setAttribute('src', `${images[activeIndex].original}`);
}

refs.btnModal.addEventListener('click', closeModal);
refs.divOverlay.addEventListener('click', closeModal);

window.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    closeModal();
  }
});

// function nextImg(event) {
//   if (event.code === 'ArrowRight') {
//     refs.imgModal.setAttribute('src', `${images[activeIndex].original}`);

//     activeIndex += 1;
//   }

//   if (activeIndex >= images.length) {
//     activeIndex -= 1;
//     window.removeEventListener('keydown', nextImg);
//     window.addEventListener('keydown', prevtImg);
//   }

//   console.log(refs.imgModal.src);
// }

// function prevImg(event) {
//   if (event.code === 'ArrowLeft') {
//     refs.imgModal.setAttribute('src', `${images[activeIndex].original}`);

//     activeIndex -= 1;
//   }

//   if (activeIndex < 0) {
//     activeIndex += 1;
//     window.removeEventListener('keydown', prevtImg);
//     window.addEventListener('keydown', nextImg);
//   }
// }
