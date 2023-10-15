/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples")
let templeList = [];
/* async displayTemples Function */
const displayTemples = async (temples) => {
    temples.forEach(temple => {
        const article = document.createElement("article");
        const h3 = document.createElement("h3");
        h3.textContent = temple.templeName;
        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = temple.location;
        article.appendChild(h3);
        article.appendChild(img);
        templesElement.appendChild(article);
    });
};



/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    templeList = await response.json();
    console.log(templeList);
    displayTemples(templeList);



};


/* reset Function */
const reset = () => {
    templesElement.innerHTML = "";
    console.log(templesElement.innerHTML);
};

/* sortBy Function */
const sortBy = (temples) => {
    reset();
    let filter = document.getElementById("sortBy").value;
    switch (filter) {
        case "utah":
            displayTemples(temples.filter((temple) => temple.location.includes("Utah")));
            break;
        case "notutah":
            displayTemples(temples.filter(temple => temple.location.includes("Utah") === false));
            break;
        case "older":
            const filtered = temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1));
            displayTemples(filtered);
            break;
        default:
            displayTemples(temples);
            break;
    }
};


getTemples();
/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => { sortBy(templeList) });