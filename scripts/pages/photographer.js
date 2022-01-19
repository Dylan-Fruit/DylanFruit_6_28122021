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
    let medias = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => { medias = data.medias; });
      return { medias };
  }

  async function displayData(photographers){
      const photographerHeader = document.querySelector(".photograph-header");
      const PageQueryString = window.location.search;
      const urlParams = new URLSearchParams(PageQueryString);
      const idPage = urlParams.get("id");
      const idPageParse = JSON.parse(idPage);

      const profile = photographers.find((element) => element.id === idPageParse);

      const photographersProfile = profileFactory(profile);
      const userCardDOM = photographersProfile.getUserCardDom();
      photographerHeader.appendChild(userCardDOM);

  }

async function displayMedias(medias) {
  const photographMedias = document.querySelector(".photograph-medias");
  const PageQueryString = window.location.search;
  const urlParams = new URLSearchParams(PageQueryString);
  const idPage = urlParams.get("id");
  const idPageParse = JSON.parse(idPage);

  
}

  async function init(){
      const { photographers } = await getPhotographers();
      displayData(photographers);
  }

  init()