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


  // Affichage des données du photographe
  async function displayData(photographers){
      const photographerHeader = document.querySelector(".photograph-header");
      const PageQueryString = window.location.search;
      const urlParams = new URLSearchParams(PageQueryString);
      const idPage = urlParams.get("id");
      const idPageParse = JSON.parse(idPage);

      const profile = photographers.find((element) => element.id === idPageParse);

      const photographersProfile = profileFactory(profile);
      const userCardDOM = photographersProfile.getUserCardDOM();
      photographerHeader.appendChild(userCardDOM);

  }

  // Affichage des photo sur la page du photographe choisi
  async function displayMedias(media) {
    const photographerMedias = document.querySelector(".photograph-medias");
    const PageQueryString = window.location.search;
    const urlParams = new URLSearchParams(PageQueryString);
    const idPage = urlParams.get("id");
    const idPageParse = JSON.parse(idPage);

    const dispMedias = media.filter((element) => element.photographerId === idPageParse);

    dispMedias.forEach((mediaCard) => {
      const mediaCards = mediasFactory(mediaCard);
      const mediaCardDOM = mediaCards.getMediaCardDOM();
      mediaCardDOM.children[0].addEventListener("click", () => clickLightbox(mediaCardDOM.children[0]));
      photographerMedias.appendChild(mediaCardDOM);
    });

    // Récupération des éléments dans le DOM pour la fonction de tri
    const btn = document.getElementById("btnList");
    const sortByList = document.querySelector("#sortby-list_ul");
    const popularity = document.getElementById("popularity");
    const date = document.getElementById("date");
    const title = document.getElementById("title");
    const byDefault = document.getElementById("default");
    const chevronDown = document.querySelector(".fa-chevron-down");

    // Affichage de la liste déroulante 
    function toggleList() {
      if(!sortByList.getAttribute("style") || sortByList.getAttribute("style") === "display: none;"){
        sortByList.style.display = "block";
        chevronDown.classList.add("rotate");
      } else {
        sortByList.style.display = "none";
        chevronDown.classList.remove("rotate");
      }
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleList();
    });

    // Fonction de choix dans la liste déroulante
    const selectedChoice = () => {
      if(byDefault.innerHTML === popularity.innerHTML){
        popularity.classList.remove("sortby-list_display");
        popularity.innerHTML = "";
      } else {
        popularity.innerHTML = "Popularité";
        popularity.classList.add("sortby-list_display");
      }
      if(byDefault.innerHTML === date.innerHTML){
        date.classList.remove("sortby-list_display");
        date.innerHTML = "";
      } else {
        date.innerHTML = "Date";
        date.classList.add("sortby-list_display");
      }
      if(byDefault.innerHTML === title.innerHTML){
        title.classList.remove("sortby-list_display");
        title.innerHTML = "";
      } else {
        title.innerHTML = "Titre";
        title.classList.add("sortby-list_display");
      }
    };

    // Tri par like
    function sortByLike() {
      byDefault.innerHTML = "Popularité";
      selectedChoice();
      dispMedias.sort((a, b) => b.likes - a.likes);
      dispMedias.forEach((media) => {
        const mediaCard = document.getElementById(media.id);
        photographerMedias.appendChild(mediaCard);
      });
    }

    popularity.addEventListener("click", () => {
      sortByLike();
    });

    // Tri par date
    function sortByDate() {
      byDefault.innerHTML = "Date";
      selectedChoice();
      dispMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
      dispMedias.forEach((media) => {
        const mediaCard = document.getElementById(media.id);
        photographerMedias.appendChild(mediaCard);
      });
    }
    
    date.addEventListener("click", () => {
      sortByDate();
    });

    // Tri par titre
    function sortByTitle() {
      byDefault.innerHTML = "Titre";
      selectedChoice();
      function compare(a, b){
        if(a.title < b.title) {
          return -1;
        }
        if(a.title > b.title){
          return 1;
        }
        return 0;
      }
      dispMedias.sort(compare);
      dispMedias.forEach((media) => {
        const mediaCard = document.getElementById(media.id); 
        photographerMedias.appendChild(mediaCard);
      });
    }

    title.addEventListener("click", () => {
      sortByTitle();
    });

    // Tri par like affiché par défaut 
    sortByLike();
    selectedChoice();

    // Affichage de la lightbox et des images dedans avec navigation
    const lightbox = document.querySelector(".lightbox");
    const lightboxMedia = document.querySelector(".lightbox-slider_medias");
    const lightboxTitle = document.querySelector(".title");
    const previousMedia = document.getElementById("previous");
    const nextMedia = document.getElementById("next");
    const close = document.getElementById("close");

    // Fonction pour ouvrir la lightbox avec affichage de l'élément choisi au clic
    const clickLightbox = (element) => {
      const lightboxTitleLink = element.nextSibling.firstChild;
      lightboxTitle.textContent = lightboxTitleLink.textContent;

      const mediaLightboxLink = element.src;

      if(mediaLightboxLink.includes(".jpg")){
        const img = document.createElement("img");
        img.setAttribute("src", mediaLightboxLink);
        img.dataset.id = element.dataset.id;
        lightboxMedia.appendChild(img);
      }
      if(mediaLightboxLink.includes(".mp4")){
        const video = document.createElement("video");
        video.setAttribute("src", mediaLightboxLink);
        video.setAttribute("controls", "");
        video.dataset.id = element.dataset.id;
        lightboxMedia.appendChild(video);
      }
      lightbox.style.display = "flex";
    }

    // Fonction pour passer à la photo précédente
    const previous = () => {
      let lightboxMediaCard = document.querySelector(".lightbox-slider_medias").firstElementChild;
      
      const result = dispMedias.find((element) => element.id === parseInt(lightboxMediaCard.dataset.id, 10));

      let i = dispMedias.indexOf(result);

      if(i === 0) {
        i = dispMedias.length;
      }
      const nextMedia = dispMedias[i - 1];

      if(nextMedia.image){
        const newImage = nextMedia.image;
        const picture = `assets/images/${newImage}`;
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.dataset.id = dispMedias[i - 1].id;
        lightboxMedia.innerHTML = "";
        lightboxMedia.appendChild(img);
        lightboxTitle.textContent = nextMedia.title;
      }
      if(nextMedia.video){
        const newVideo = nextMedia.video;
        const videos = `./assets/videos/${newVideo}`;
        const dispVideo = document.createElement("video");
        dispVideo.setAttribute("src", videos);
        dispVideo.dataset.id = dispMedias[i - 1].id;
        dispVideo.setAttribute("controls", "");
        lightboxMedia.innerHTML = "";
        lightboxMedia.appendChild(dispVideo);
        lightboxTitle.textContent = nextMedia.title;
      }
      lightboxMediaCard = document.querySelector(".lightbox-slider_medias").firstElementChild;
    }

    // Fonction pour passer à la photo suivante 
    const next = () => {
      let lightboxMediaCard = document.querySelector(".lightbox-slider_medias").firstElementChild;
      
      const result = dispMedias.find((element) => element.id === parseInt(lightboxMediaCard.dataset.id, 10));

      let i = dispMedias.indexOf(result);

      if(i === dispMedias.length - 1) {
        i = -1;
      }
      const nextMedia = dispMedias[i + 1];

      if(nextMedia.image){
        const newImage = nextMedia.image;
        const picture = `assets/images/${newImage}`;
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.dataset.id = dispMedias[i + 1].id;
        lightboxMedia.innerHTML = "";
        lightboxMedia.appendChild(img);
        lightboxTitle.textContent = nextMedia.title;
      }
      if(nextMedia.video){
        const newVideo = nextMedia.video;
        const videos = `./assets/videos/${newVideo}`;
        const dispVideo = document.createElement("video");
        dispVideo.setAttribute("src", videos);
        dispVideo.dataset.id = dispMedias[i + 1].id;
        dispVideo.setAttribute("controls", "");
        lightboxMedia.innerHTML = "";
        lightboxMedia.appendChild(dispVideo);
        lightboxTitle.textContent = nextMedia.title;
      }
      lightboxMediaCard = document.querySelector(".lightbox-slider_medias").firstElementChild;
    }

    // Navigation avec les flèches à la souris dans la lightbox
    previousMedia.addEventListener("click", () => {
      previous();
    });

    nextMedia.addEventListener("click", () => {
      next();
    })

    // Navigation avec les flèches du clavier dans la lightbox
    window.addEventListener('keydown', function(e){
      if(e.key == 'ArrowRight'){
          next();
      }
      if(e.key == 'ArrowLeft'){
          previous();
      } 
  });

    // Fermeture de la lightbox
    function closeLightbox(){
      lightbox.style.display = "none";
      lightboxMedia.innerHTML = "";
    }

    close.addEventListener("click", () => {
      closeLightbox();
    });

    // Fermeture avec la touche Echap
    window.addEventListener("keydown", (e) => {
      if(e.key === 'Escape'){
        closeLightbox();
      }
    });
  
    // Récupération de l'icône coeur pour la fonction Like
    const heartsIcon = document.querySelectorAll(".photograph-legend_heart");
  
    // Calcul du total des likes 
    let totalLikes = 0;
    dispMedias.map((element) => {
      totalLikes += element.likes;
      return totalLikes;
    });

    const pTotalLikes = document.querySelector(".price-bar_pTotalLikes");
    pTotalLikes.textContent = totalLikes;


    // Fonction d'ajout des likes 
    const addLike = (element) => {
      const numberLike = element.previousSibling;
      const result = numberLike.classList.toggle("liked");
      if(result) {
        let number = parseInt(numberLike.textContent);
        numberLike.textContent = number += 1;
        pTotalLikes.textContent = totalLikes += 1;
        element.style.color = "#DB8876";
        totalLikes + 1;
      } else {
        let number = parseInt(numberLike.textContent);
        numberLike.textContent = number -= 1;
        pTotalLikes.textContent = totalLikes -= 1;
        element.style.color = "#901C1C";
        totalLikes - 1;
      }
    };

      // Écouteur d'évènement au clic et en appuyant sur entrer pour like
      heartsIcon.forEach((element) => {
        element.addEventListener("click", () => {
          addLike(element);
        });
        element.addEventListener("keypress", (e) => {
          if (e.key === "Enter"){
            addLike(element);
          }
        });
      });
}


  async function init(){
      const { photographers } = await getPhotographers();
      displayData(photographers);

      const { media } = await getMedias();
      displayMedias(media);
  }

  init()