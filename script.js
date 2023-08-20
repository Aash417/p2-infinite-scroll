// unsplash api
const count = 10;
let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const apiKey = `_sULQh3YvcDIVU-yhju05WKd_S_8c1Y5T8Y3Xf0LBy8`;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.querySelector('#image-container');
const loader = document.getElementById('loader');

// check if all images were loaded
function imageloaded() {
  imagesLoaded++;
  //   console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes
function setAttr(element, attribute) {
  for (const key in attribute) {
    // console.log(attribute[key]);
    element.setAttribute(key, attribute[key]);
  }
}

// create elements for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = Object.keys(photosArr).length;

  photosArr.forEach((photo) => {
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

    // Event listner , check when each is finished loading
    img.addEventListener('load', imageloaded);

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

    displayPhotos();
  } catch (error) {}
}

// check to see if scrolling near bottom of page , load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log('scrolled');
  }
});

// on load
getPhotos();
