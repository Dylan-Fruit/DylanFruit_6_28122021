export default function mediasFactory(data) {
  const { id, photographerId, title, image, likes, date, price, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("id", id);

    const photographLegend = document.createElement("div");
    photographLegend.setAttribute("class", "photograph-legend");
    if (image) {
      const picture = `./assets/images/${image}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("tabindex", 0);
      img.setAttribute("class", "photograph-pictures");
      img.setAttribute("alt", title + " closeup view");
      img.dataset.id = id;

      article.appendChild(img);

      const titleImage = document.createElement("h2");
      titleImage.setAttribute("class", "photograph-legend_title");
      titleImage.setAttribute("tabindex", 0);
      titleImage.textContent = title;

      photographLegend.appendChild(titleImage);
    }
    if (video) {
      const videos = `./assets/videos/${video}`;
      const videoContent = document.createElement("video");
      videoContent.setAttribute("src", videos);
      videoContent.setAttribute("class", "photograph-videos");
      videoContent.setAttribute("tabindex", 0);
      videoContent.setAttribute("alt", title + " closeup view");
      videoContent.dataset.id = id;

      article.appendChild(videoContent);

      const titleVideo = document.createElement("h2");
      titleVideo.setAttribute("class", "photograph-legend_title");
      titleVideo.setAttribute("tabindex", 0);
      titleVideo.textContent = title;

      photographLegend.appendChild(titleVideo);
    }
    const pDetails = document.createElement("p");
    pDetails.setAttribute("class", "photograph-legend_details");
    pDetails.setAttribute("aria-label", "likes");

    const likesCounter = document.createElement("p");
    likesCounter.textContent = likes;
    likesCounter.setAttribute("class", "photograph-legend_likes");
    likesCounter.setAttribute("tabindex", 0);

    const heartIcon = document.createElement("i");
    heartIcon.setAttribute("class", "fas fa-heart photograph-legend_heart");
    heartIcon.setAttribute("tabindex", 0);

    article.appendChild(photographLegend);
    photographLegend.appendChild(pDetails);
    pDetails.appendChild(likesCounter);
    pDetails.appendChild(heartIcon);

    return article;
  }
  return { getMediaCardDOM };
}
