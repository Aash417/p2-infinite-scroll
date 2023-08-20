// unsplash api
const count = 10;
const apiKey = `_sULQh3YvcDIVU-yhju05WKd_S_8c1Y5T8Y3Xf0LBy8`;

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.querySelector('#image-container');
const loader = document.getElementById('loader');

let photosArr = [];

function setAttr(element, attribute) {
  for (const key in attribute) {
    // console.log(attribute[key]);
    element.setAttribute(key, attribute[key]);
  }
}

// create elements for links and photos
function displayPhotos(photosArr) {
  photosArr.forEach((photo) => {
    // console.log(photo);
    // create <a> link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttr(item, { href: photo.links.html, target: '_blank' });

    // create a <img> for photos
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttr(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // put <img> inside <a> then put both inside image container
    item.appendChild(img);

    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArr = await response.json();
    console.log(photosArr);
    displayPhotos(photosArr);
  } catch (error) {}
}

// check to see if scrolling near bottom of page , load more photos
// window.addEventListener('scroll', () => {
//   console.log('scrolled');
// });

// on load
getPhotos();
console.log(8);
