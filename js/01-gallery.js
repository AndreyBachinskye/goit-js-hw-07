import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = { imageList: document.querySelector('ul.gallery') };

function createGalleryCard({ preview, original, description }) {
  return `<li class="gallery_item">
  <a class="gallery_link" href="${original}">
    <img
      class="gallery_image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}

function createGalleryList(Items) {
  refs.imageList.innerHTML = Items.map(item => createGalleryCard(item)).join(
    ''
  );
}

function onClickImageList(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  createLightBoxView(event.target.getAttribute('data-source'));
}

function createLightBoxView(imageUrl) {
  const onKeyDown = event => {
    if (event.key === 'Escape') {
      instance.close();
    }
    console.log(event.key);
  };
  const instance = basicLightbox.create(
    `
    <img src="${imageUrl}" width="1280" >
`,
    {
      onShow: instance => {
        window.addEventListener('keydown', onKeyDown);
        document.body.classList.add('no-scroll');
      },
      onClose: instance => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.classList.remove('no-scroll');
      },
    }
  );

  instance.show();
}

createGalleryList(galleryItems);

refs.imageList.addEventListener('click', onClickImageList);