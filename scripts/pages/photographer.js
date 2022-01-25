import profileFactory from "../factories/profile.js";
import mediasFactory from "../factories/medias.js";

async function getPhotographers() {
    let photographers = [];
  
    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => { photographers = data.photographers; });
    return { photographers };
  }

  async function getMedias() {
    let media = [];
  
    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => { media = data.media; });
  
    return { media };
  }

  async function displayData(photographers){
      const photographerHeader = document.querySelector(".photograph-header");
      const PageQueryString = window.location.search;
      const urlParams = new URLSearchParams(PageQueryString);
      const idPage = urlParams.get("id");
      const idPageParse = JSON.parse(idPage);

      console.log(photographers);

      const profile = photographers.find((element) => element.id === idPageParse);

      const photographersProfile = profileFactory(profile);
      const userCardDOM = photographersProfile.getUserCardDOM();
      photographerHeader.appendChild(userCardDOM);

  }

  async function displayMedias(media) {
    const test = document.querySelector(".photograph-medias");
    const PageQueryString = window.location.search;
    const urlParams = new URLSearchParams(PageQueryString);
    const idPage = urlParams.get("id");
    const idPageParse = JSON.parse(idPage);

    console.log(media);

    const dispMedias = media.filter((element) => element.photographerId === idPageParse);

    dispMedias.forEach((mediaCard) => {
      const mediaCards = mediasFactory(mediaCard);
      const mediaCardDOM = mediaCards.getMediaCardDOM();
      test.appendChild(mediaCardDOM);
    });
}


  async function init(){
      const { photographers } = await getPhotographers();
      displayData(photographers);

      const { media } = await getMedias();
      displayMedias(media);
  }

  init()