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

    
    const popularity = document.getElementById("popularity");
    const date = document.getElementById("date");
    const title = document.getElementById("title");
    const sortby = document.querySelector(".sortby-list");
    const sortbyList = document.getElementsByClassName("sortby-list_display");
    const chevronUp = document.querySelector(".fa-chevron-up");
    const chevronDown = document.querySelector(".fa-chevron-down");
    console.log(sortbyList);


    function toggleList() {
      if(!title.getAttribute("style") && !date.getAttribute("style") 
      || title.getAttribute("style") && date.getAttribute("style") === "display: none"){
        title.style.display = "block";
        date.style.display = "block";
        chevronUp.style.display = "block";
        chevronDown.style.display = "none";
      }else{
        title.style.display = "none";
        date.style.display = "none";
        chevronDown.style.display = "block";
        chevronUp.style.display = "none";
      }
    }

    sortby.addEventListener('click', () => {
      toggleList();
    });

    const heartsIcon = document.querySelectorAll(".photograph-legend_heart");
  
    let totalLikes = 0;
    dispMedias.map((element) => {
      totalLikes += element.likes;
      return totalLikes;
    });

    const pTotalLikes = document.querySelector(".price-bar_pTotalLikes");
    pTotalLikes.textContent = totalLikes;

    const addLike = (element) => {
      const numberLike = element.previousSibling;
      const result = numberLike.classList.toggle("liked");
      if(result) {
        let number = parseInt(numberLike.textContent);
        numberLike.textContent = number += 1;
        pTotalLikes.textContent = totalLikes += 1;
        element.style.color = "#D3573C";
        totalLikes + 1;
      } else {
        let number = parseInt(numberLike.textContent);
        numberLike.textContent = number -= 1;
        pTotalLikes.textContent = totalLikes -= 1;
        element.style.color = "#901C1C";
        totalLikes - 1;
      }
    };

    console.log(pTotalLikes);
      heartsIcon.forEach((element) => {
        element.addEventListener("click", () => {
          addLike(element);
        });
      });

    console.log(addLike);
}


  async function init(){
      const { photographers } = await getPhotographers();
      displayData(photographers);

      const { media } = await getMedias();
      displayMedias(media);
  }

  init()