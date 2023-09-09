import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const list = document.querySelector(".gallery");

const textImg = galleryItems
  .map(
    (obj) =>
      `<li class="gallery__item">
<a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${obj.preview}"
      data-source="${obj.original}"
      alt="${obj.description}"
    />
  </a>
</li>`
  )
  .join(" ");

list.insertAdjacentHTML("afterbegin", textImg);

list.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();
  //   if (event.target === event.currentTarget) {
  //     return;
  //   }
  const currentProduct = event.target.closest(".gallery__item");
  if (currentProduct === null) {
    return;
  }

  const imgItem = galleryItems.find(
    ({ original }) =>
      original ===
      currentProduct.querySelector(".gallery__image").dataset.source
  );

  const instance = basicLightbox.create(`
  <div class="modal">
  <img
      class="gallery__image"
      src="${imgItem.original}"
      alt="${imgItem.description}"
    />
  </div>
  `);

  instance.show();

  const keyEvent = (e) => {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
  };

  document.addEventListener("keydown", (event) => {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
  });
  document.removeEventListener("keydown", (event) => {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
  });
}
