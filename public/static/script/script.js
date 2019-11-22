

async function initSite() {
    try {
        loader(false)
        const getAllPosts = "";

        newsAPI(getAllPosts)
    } catch (error) {
        console.error(error)
    }
}

async function newsAPI(location) {
    loader(true) 
    document.getElementById("postContainer").innerHTML = ""
    const response = await axios.post('/handelser/brott', {
        location: location.value || location,
    })

    if (response.status != 200) {
        throw new Error ("Errorrrr");
    } else {
        renderPost(response.data)
    }

    loader(false)
}

async function locationAPI() {
    loader(true) 
    document.getElementById("postContainer").innerHTML = ""

    const response = await axios.get('/handelser/brott/nearby');

    if (response.status != 200) {
        throw new Error ("Errorrrr");
    } else {
        loader(false)
        renderPost(response.data)
        return response.data
    }
}

function renderPost(response_data) {
    const postContainer = document.getElementById("postContainer");
    response_data.forEach(function(post) {
      
        const cardContainer = document.createElement("div");
        cardContainer.className = "post-card"

        const titleElement = document.createElement("h3");
        const descriptionElement = document.createElement("span");
        const locationElement = document.createElement("h5");
        locationElement.style.color = "#E74C3C";
        locationElement.style.marginTop = "0";
        const sourceElement = document.createElement("a");
        sourceElement.style.color = "#3498DB";

        postContainer.appendChild(cardContainer);
        cardContainer.appendChild(titleElement);
        cardContainer.appendChild(locationElement);
        cardContainer.appendChild(descriptionElement);
        cardContainer.appendChild(sourceElement);

        titleElement.innerHTML = post.description;
        locationElement.innerHTML = post.title_location + ' - ' + post.date_human;
        descriptionElement.innerHTML = post.content;
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
