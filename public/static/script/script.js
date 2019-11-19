

async function initSite() {
  loader(false)
  initAPI()
}


async function initAPI() {
    loader(true) 

    const buttonName = document.getElementsByName("button");

    buttonName.forEach(function(btnValue) {
  
      btnValue.onclick = function() {
        var clickedLocation = btnValue.value

        clicked = btnValue.value
      }
    })

   
 
    const response = await axios.post('/lista/brott', {
        location: clickedLocation
    })

    response.data.forEach(function(post) {
      renderPost(post)
    })

    loader(false)
}

function renderPost(post) {
    const postContainer = document.getElementById("postContainer");

    const cardContainer = document.createElement("div");
    cardContainer.className = "post-card"

    const titleElement = document.createElement("h3");
    const descriptionElement = document.createElement("span");

    postContainer.appendChild(cardContainer);
    cardContainer.appendChild(titleElement);
    cardContainer.appendChild(descriptionElement);

    titleElement.innerHTML += post.description
    descriptionElement.innerHTML += post.content
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
