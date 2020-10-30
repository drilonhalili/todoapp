const filterInput = document.querySelector("#filterInput");
const names = [...document.querySelectorAll(".letter-group__name a")];
const form = document.querySelector(".search-form");

const buttonAll = document.getElementById("all");

filterInput.focus();

function filterName() {
  const value = this.value.toUpperCase();
  names.forEach((name) =>
    name.textContent.toUpperCase().includes(value)
      ? name.classList.remove("hide", "card")
      : name.classList.add("hide", "card")
  );
}

filterInput.addEventListener("change", filterName);
filterInput.addEventListener("keyup", filterName);
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//Use an IIFE to avoid contanminating global namespce
(function f() {
  //Grab stores items from the DOM
  let storeItems = document.querySelectorAll(".store-item");
  //grab lightbox container
  let lightBox = document.querySelector(".lightbox-container");
  //grab the div with the lightbox item
  let lightBoxItem = document.querySelector(".lightbox-item");
  //grab all the images from the store items
  let images = document.querySelectorAll(".store-img");

  // set up an array for the items
  let imageList = [];
  //set up a counter to run through the list of images
  let imageCounter = 0;
  //use a forEach loop to get a copy of all the images and push into an array of items
  images.forEach(function (image) {
    //push each imageto the array of images
    imageList.push(image.src);
  });

  //Add an a click event listener to each store item
  storeItems.forEach(function (item) {
    //On click, allow the model container to show
    //Change css class from display none to display block
    item.addEventListener("click", function (e) {
      console.log(e.target.src);
      //grab the image of the item that was clicked
      let image = e.target.src;
      //change the background img property of the lightbox item
      lightBoxItem.style.backgroundImage = `url(${image})`; // --> 'url(' + image + ')'
      //show the modal with the selected image
      lightBox.classList.add("show");
      //get the array index number for the image that was selected
      imageCounter = imageList.indexOf(image);
    });
  });

  //wire up the left and right buttons
  //select left button from the DOM
  let btnLeft = document.querySelector(".btnLeft");
  btnLeft.addEventListener("click", function () {
    imageCounter--;
    if (imageCounter < 0) {
      imageCounter = imageList.length - 1;
    }
    lightBoxItem.style.backgroundImage = `url(${imageList[imageCounter]})`;
  });
  //select left button from the DOM
  let btnRight = document.querySelector(".btnRight");
  btnRight.addEventListener("click", function () {
    imageCounter++;
    if (imageCounter >= imageList.length) {
      imageCounter = 0;
    }
    lightBoxItem.style.backgroundImage = `url(${imageList[imageCounter]})`;
  });

  //wire up the modal's close button
  let lightBoxClose = document.querySelector(".lightbox-close");
  lightBoxClose.addEventListener("click", function () {
    lightBox.classList.remove("show");
  });
})();
