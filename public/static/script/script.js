

async function initSite() {
    loader(false)

    let getAllPosts = "";
    initAPI(getAllPosts)
}


async function initAPI(location) {
    loader(true) 
    document.getElementById("postContainer").innerHTML = ""

    const response = await axios.post('/handelser/brott', {
        location: location.value || location,
    })

    renderPost(response.data)

    loader(false)
}

async function locationAPI() {
    loader(true) 
    document.getElementById("postContainer").innerHTML = ""

    const response = await axios.get('/handelser/brott/nearby');

    renderPost(response.data)

    loader(false)
}

function renderPost(response_data) {
    const postContainer = document.getElementById("postContainer");
    response_data.forEach(function(post) {
      
        const cardContainer = document.createElement("div");
        cardContainer.className = "post-card"

        const titleElement = document.createElement("h3");
        const descriptionElement = document.createElement("span");
        const locationElement = document.createElement("h5");
        const sourceElement = document.createElement("a");
        sourceElement.style.color = "#3498DB";

        postContainer.appendChild(cardContainer);
        cardContainer.appendChild(titleElement);
        cardContainer.appendChild(descriptionElement);
        cardContainer.appendChild(locationElement);
        cardContainer.appendChild(sourceElement);

        titleElement.innerHTML = post.description;
        descriptionElement.innerHTML = post.content;
        locationElement.innerHTML = post.location_string + ' - ' + post.date_human;
        sourceElement.href = post.external_source_link || "";
        sourceElement.innerHTML = post.external_source_link || "";
    })
}
  
function loader(show) {
    const loaderContainer = document.getElementById("loaderContainer");

    if (!show) {
      loaderContainer.innerHTML = ""
      return
    } 

    if (show && loaderContainer.innerHTML.length) {
      return
    }

    const loaderImage = document.createElement("img");
    loaderImage.src = "/static/images/loader.gif"

    loaderContainer.appendChild(loaderImage)
}
