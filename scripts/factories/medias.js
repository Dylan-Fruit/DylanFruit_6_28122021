export default function mediasFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;

    function getUserCardDom() {
        const article = document.createElement('article');
        article.setAttribute("id", id);
        
        const photographLegend = document.createElement('div');
        photographLegend.setAttribute("class", "photograph-legend");
        if(image){
            const picture = `.assets/images/${image}`;
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("tabindex", 0);
            img.setAttribute("class", "photograph-pictures");
            img.setAttribute("alt", title + " closeup view");
            img.dataset.id = id;

            article.appendChild(img);

            const titleImage = document.createElement('p');
            titleImage.setAttribute("class", "photograph-title");
            titleImage.setAttribute("tabindex", 0);
            titleImage.textContent = title;

            photographLegend.appendChild(titleImage);
        }
        if(video){
            const videos = `.assets/videos/${video}`;
            const videoContent = document.createElement("video");
            videoContent.setAttribute("src", videos);
            videoContent.setAttribute("class", "photograph-videos");
            videoContent.setAttribute("tabindex", 0);
            videoContent.setAttribute("alt", title + " closeup view");
            videoContent.dataset.id = id;

            article.appendChild(videoContent);

            const titleVideo = document.createElement('p');
            titleVideo.setAttribute("class", "photograph-title");
            titleVideo.setAttribute("tabindex", 0);

            photographLegend.appendChild(titleVideo);
        }
    }
    return { getUserCardDom };
}