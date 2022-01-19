export default function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex", "0");
        article.setAttribute("class", "photographer_section-article");

        const link = document.createElement("a");
        link.setAttribute("href", `./photographer.html?id=${id}`);
        link.setAttribute("aria-label", name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name);

        const h2 = document.createElement( 'h2' );
        const pLocation = document.createElement('p');
        const pTagline = document.createElement('p');
        const pPrice = document.createElement('p');

        h2.textContent = name;
        h2.setAttribute("class", "photographer_section-article-name");

        pLocation.textContent = city + ", " + country;
        pLocation.setAttribute("class", "photographer_section-article-location");

        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "photographer_section-article-tagline");

        pPrice.textContent = price + "€/jour";
        pPrice.setAttribute("class", "photographer_section-article-price");

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    } 
    return { getUserCardDOM }
}

