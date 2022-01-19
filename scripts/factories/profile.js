export default function profileFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDom() {
        const photographerHeader = document.querySelector(".photograph-header");
        
        const article = document.createElement("article");
        article.setAttribute("class", "photograph-header_text");
        article.setAttribute("tabindex", 0);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("tabindex", 0);
        img.setAttribute("class", "photograph-header_img");

        const h1 = document.createElement("h1");
        h1.textContent = name; 
        h1.setAttribute("tabindex", 0);
        h1.setAttribute("class", "photograph-header_name");

        const pLocation = document.createElement("p");
        pLocation.setAttribute("class", "photograph-header_location")
        pLocation.textContent = city + ", " + country;

        const pTagLine = document.createElement("p");
        pTagLine.textContent = tagline;
        pTagLine.setAttribute("class", "photograph-header_tagline");

        const button = document.createElement("button");
        button.textContent = "Contactez moi"
        button.setAttribute("class", "contact_button");
        button.setAttribute("onClick", "displayModal()");

        const pPrice = document.createElement("p");
        pPrice.textContent = price + "€/jour"; 

        article.appendChild(h1);
        article.appendChild(pLocation);
        article.appendChild(pTagLine);
        photographerHeader.appendChild(img);
        photographerHeader.appendChild(button);
        
        return article;
    }
    return { getUserCardDom };
}
