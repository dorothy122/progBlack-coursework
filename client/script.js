// TO DO //



// 1. make images appear in bootstrap columns - needs editting - 6 columns over lap for certain window size
// 2. DONE send only image info, type, title, streaming platforms 
// 3. DONE filter movie/tv show 
// 3.5 DONE add styling to navbar buttons BUT DONT REALLY LIKE THAT MUCH
// 4. DONE add streaming platform drop down to navbar (instead of search)
// 4.5 DONE filter streaming platforms
// 5. DONE on click of image, enlarge to show extra info
// 6. DONE send additional info on click of image 
// 7. DONE make overlay scroll with page
// 8. make server start with npm start
// 9. DONE reset all filters when click home
// 10. DONE remove overlay when click on filters

// 11. DONE fix json typos and inconsitencies
// 12. DONE change POST to GET single item
// 13. DONE add POST to add new item 
// 13.1 DONE add form at bottom page to insert data to add NEEDS CSS
// 13.2 DONE send form data to server POST
// 13.3 DONE server add recieved data to JSON file + refetch this file
// 13.4 DONE display errors if not all entered
// 13.5 DONE display error next to field to fill
// 14. DONE API documentation
// 15. DONE display server errors to user
// 16. DONE watch the testing lectures
// 17. do the testing stuff
// 18. make video 
// 19. DONE prevent being able to add duplicate
// 20. DONE genres entity
// 21. DONE add genre filters
// 22. DONE genre fetch
// 23. DONE form genre dropdown
// 24. add new genre?





// to gloablly store main info for items
let allData = []
let allGenres = []

// globally store movie/series filters
let movies = true
let series = true

// globally store state of each platform filter
let filters = {
  netflix:true, prime:true, disney:true, iplayer:true, all4:true, itvx:true, amazonRent:true
}

// globally store state of each genre filter
let selectedGenres = new Set()


// load all images when page loads 
window.addEventListener('DOMContentLoaded', function(event){
  fetch('/list')
    .then(response => {
      if (!response.ok) {
        throw new Error("Server returned status " + response.status);
      }
      return response.json();
    })


    .then(data => {
      // no server error
      serverHideError()
      // gloablly store data
      allData = data

      // run function to organise and display the data
      displayImage(allData)
    })

    // display error if unable to fetch
    .catch(error => {
      serverErrorShow("Server unavailable. Please try again later")
    })


  // filter movies
  const moviesButton = document.getElementById("movies");
  moviesButton.addEventListener("click", () => {series = false, movies = true, applyFilters(allData) })

  // filter tv shows
  const tvButton = document.getElementById("tv");
  tvButton.addEventListener("click", () => {movies = false, series = true, applyFilters(allData) })

  // filter home
  const homeButton = this.document.getElementById("home");

  // reset all filters and switches when home button clicked
  homeButton.addEventListener("click", () => {
    movies = true, series = true, 
    filters.netflix = true, filters.all4 = true, filters.amazonRent = true, filters.disney = true, filters.iplayer = true, filters.itvx = true, filters.prime = true,
    this.document.getElementById("netflixSwitch").checked = true
    this.document.getElementById("all4Switch").checked = true
    this.document.getElementById("amazonRentSwitch").checked = true
    this.document.getElementById("disneySwitch").checked = true
    this.document.getElementById("iplayerSwitch").checked = true
    this.document.getElementById("itvxSwitch").checked = true
    this.document.getElementById("primeSwitch").checked = true


    // reset genres
    for(genre of allGenres) {
      selectedGenres.add(genre.id)
      this.document.getElementById(`${genre.id}Switch`).checked = true
    }




    applyFilters(allData)
  })


  // apply streaming platform filters
  const platformFilterButton = this.document.getElementById("platformFilter")
  platformFilterButton.addEventListener('click', () => {applyFilters(allData)})



  // manually update platform filter states
  document.getElementById("netflixSwitch").addEventListener("change", (e) => {
    filters.netflix = e.target.checked
  })
  document.getElementById("primeSwitch").addEventListener("change", (e) => {
    filters.prime = e.target.checked
  })
  document.getElementById("disneySwitch").addEventListener("change", (e) => {
    filters.disney = e.target.checked
  })
  document.getElementById("iplayerSwitch").addEventListener("change", (e) => {
    filters.iplayer = e.target.checked
  })  
  document.getElementById("all4Switch").addEventListener("change", (e) => {
    filters.all4 = e.target.checked
  })
  document.getElementById("itvxSwitch").addEventListener("change", (e) => {
    filters.itvx = e.target.checked
  })
  document.getElementById("amazonRentSwitch").addEventListener("change", (e) => {
    filters.amazonRent = e.target.checked
  })


  // when click on image, fetch additional info for this item
  this.document.getElementById("content").addEventListener("click", (event) => {
    if (event.target.tagName == "IMG") {
      // store the image clicked
      let image = event.target

      // get image name
      const title = image.alt
      
      // request additional info
      fetch(`/list/${encodeURIComponent(title)}`)
      // if not recieved
      .then(response => {
        if (!response.ok) {
          throw new Error(err.error || "Request failed");
        }
        return response.json();
      })

      // if recieved, enlarge item
      .then(data => {
        // ensure no error displayed
        serverHideError()
        // create card
        let newCard = card(data)
        // add to overlay
        overlay(newCard, image)
      })

      // display error if unable to fetch
      .catch(error => {
        serverErrorShow(error.message || "Server unavailable. Please try again later")
      })

    }
  })

  // form sumbit
  const form = document.getElementById("form")
  form.addEventListener("submit", async function(event) {
    event.preventDefault() // stop page reloading

    // store inputs: https://www.geeksforgeeks.org/javascript/how-to-get-the-value-of-text-input-field-using-javascript/
    const newItem = {
      name: document.getElementById("titleInput").value,
      type: document.getElementById("typeInput").value,
      //genre: document.getElementById("genreInput").value,
      streaming: document.getElementById("platformInput").value,
      ageRating: document.getElementById("ageRatingInput").value,
      description: document.getElementById("descriptionInput").value,
      image: document.getElementById("imageInput").value,
      imageTitle: document.getElementById("titleInput").value,

      genre: Array.from(
        document.querySelectorAll("#genreInputDropdown input:checked")
      ).map(input =>
        input.id.replace("form-", "").replace("Switch", "")
      )
      // due to multiselect, .value doesnt work in same way
      // need to split genres given up into same format as stored in items.json
      // would before look like <input id="form-comedy" checked> for every checked item 

    }

    // validate form
    let valid = true

    // check each field filled, if not, display error
    if (newItem.name == "") {
      showError(titleInput)
      valid = false
    }
    else {
      clearError(titleInput)
    }

    if (newItem.type == "") {
      showError(typeInput)
      valid = false
    }
    else {
      clearError(typeInput)
    }

    if (newItem.genre.length == 0) {
      showGenreError()
      valid = false
    }
    else {
      clearGenreError()
    }

    if (newItem.streaming == "") {
      showError(platformInput)
      valid = false
    }
    else {
      clearError(platformInput)
    }


    if (newItem.ageRating == "") {
      showError(ageRatingInput)
      valid = false
    }
    else {
      clearError(ageRatingInput)
    }

    if (newItem.description == "") {
      showError(descriptionInput)
      valid = false
    }
    else {
      clearError(descriptionInput)
    }
                
    if (newItem.image == "") {
      showError(imageInput)
      valid = false
    }
    else {
      clearError(imageInput)
    }

    
    if (valid == true) {
      // post method: // https://www.geeksforgeeks.org/javascript/javascript-fetch-method/
      const response = await fetch('/list/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })

      .then(resp => {
        if (!resp.ok) {
          throw new Error("Failed to add")
        }
        return resp.text()
      })
      
      .then(msg => {
        serverHideError()
        alert(msg)
      })

      .catch(error => {
        serverErrorShow("cannot add item - server not running")
      })

    }
  })


  // fetch all genres, build genre filters and form options
  fetch('/genres')
    .then(response => {
      if (!response.ok) {
        throw new Error("Server returned status " + response.status);
      }
      return response.json();
    })


    .then(data => {
      // no server error
      serverHideError()
      // gloablly store data
      allGenres = data

      // run function to create genres filters and form dropdown
      buildGenreFilters(allGenres)

      buildGenreForm(allGenres)


      
    })

    // display error if unable to fetch
    .catch(error => {
      serverErrorShow("Server unavailable. Please try again later")
    })


})


function buildGenreForm(genres) {
  // form dropdown 
  const dropdown = document.getElementById("genreInputDropdown")

  // loop through each genre
  for (const genre of genres) {
    // create space to put a filter
    const option = document.createElement("div")
    option.className = "form-check form-switch"
    option.id = genre.id

    // create toggle
    const toggle = document.createElement("input")
    toggle.className = "form-check-input"
    toggle.type = "checkbox"
    toggle.id = `form-${genre.id}Switch`
    toggle.checked = false

    // create toggle label
    const label = document.createElement("label")
    label.className = "form-check-label"
    label.htmlFor = toggle.id
    label.textContent = genre.name

    // add all parts to the item
    option.appendChild(toggle)
    option.appendChild(label)
    dropdown.appendChild(option)



  }

}




// build genre filters
function buildGenreFilters(genres) {
  // navbar filters
  const container = document.getElementById("genreFilters")
  container.innerHTML = "" // clear current filters


  // loop through each genre
  for (const genre of genres) {
    // add to selected genres by default
    selectedGenres.add(genre.id)

    // create space to put a filter
    const filter = document.createElement("div")
    filter.className = "form-check form-switch"
    filter.id = genre.id

    // create toggle
    const toggle = document.createElement("input")
    toggle.className = "form-check-input"
    toggle.type = "checkbox"
    toggle.id = `${genre.id}Switch`
    toggle.checked = true

    // create toggle label
    const label = document.createElement("label")
    label.className = "form-check-label"
    label.htmlFor = toggle.id
    label.textContent = genre.name

    // add all parts to the item
    filter.appendChild(toggle)
    filter.appendChild(label)
    container.appendChild(filter)

    // add eventlistener for the check box
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        selectedGenres.add(genre.id)
      }
      else {
        selectedGenres.delete(genre.id)
      }
    })

    button = document.getElementById("genreFilter")
    button.addEventListener("click", () => {
      // update images shown
      applyFilters(allData)
    })

  
  }
}


// display error if not filled
function showError(input) {
  input.classList.add("is-invalid")
}

// remove error if filled
function clearError(input) {
  input.classList.remove("is-invalid")
}

// specific for genre as differen type
function showGenreError() {
  const wrapper = document.getElementById("genreInputWrapped")
  const button = wrapper.querySelector("button")
  const feedback = document.getElementById("genreFeedback")

  button.classList.add("is-invalid")
  feedback.style.display = "block"
}

function clearGenreError() {
  const wrapper = document.getElementById("genreInputWrapped")
  const button = wrapper.querySelector("button")
  const feedback = document.getElementById("genreFeedback")

  button.classList.remove("is-invalid")
  feedback.style.display = "none"
}


// server disconnect errors
function serverErrorShow(message) {
  const errorBox = document.getElementById("error")
  errorBox.textContent = message
  errorBox.classList.remove("d-none")
}

function serverHideError() {
  const errorBox = document.getElementById("error")
  errorBox.classList.add("d-none")
}





// on click of image, enlarge image and display additional info
function card(data, image) {
  const content = document.getElementById("content")

  // bootstrap card and list groups from bootstrap documentation: https://getbootstrap.com/docs/4.0/components/card/
  const card = document.createElement('div')
  card.className = "card"


  // make horizontal card
  // row1 -- // imgCol  // textCol //
  // row2 -- //    titleCol        //

  // set up format
  const row1 = document.createElement("div")
  row1.className = "row g-0"
  const row2 = document.createElement("div")
  row2.className = "row g-0"
  const imgCol = document.createElement("div")
  imgCol.className = "col"
  const textCol = document.createElement("div")
  textCol.className = "col"
  const titleCol = document.createElement("div")
  titleCol.className = "col"

  // add image 
  const img = document.createElement("img")
  img.className = "img-fluid rounded-start"
  // insert img attributes from the json file
  img.src = data.image
  img.alt = data.imageTitle
  // add img to image column 
  imgCol.appendChild(img)



  // add extra details 
  const body1 = document.createElement("div")
  body1.className = "card-body"

    //card list  group
  const listGroup = document.createElement("ul")
  listGroup.className = "list-group list-group-flush"

  const list1 = document.createElement("li") // genre
  list1.className = "list-group-item"
  list1.innerHTML = `<strong>Genre: </strong>${data.genre}`
  const list2 = document.createElement("li") // age rating
  list2.className = "list-group-item"
  list2.innerHTML = `<strong>Age Rating: </strong>${data.ageRating}`
  const list3 = document.createElement("li") // available on 
  list3.className = "list-group-item"
  list3.innerHTML = `<strong>Available on: </strong>${data.streaming}`

  listGroup.appendChild(list1)
  listGroup.appendChild(list2)
  listGroup.appendChild(list3)

  body1.appendChild(listGroup)
  textCol.appendChild(body1)

  // create row1
  row1.appendChild(imgCol)
  row1.appendChild(textCol)
  

  // add title and description to row 2
  const body2 = document.createElement("div")
  body2.className = "card-body"

  const title = document.createElement("h5")
  title.className = "card-title"
  title.textContent = data.name

  const text = document.createElement("p")
  text.className = "card-text"
  text.textContent = data.description

  // add divider before row2
  const divider = document.createElement("hr") 
  divider.className = "hr"

  body2.appendChild(divider)
  body2.appendChild(title)
  body2.appendChild(text)

  // construct row
  titleCol.appendChild(body2)
  row2.appendChild(titleCol)


  // add rows to card
  card.appendChild(row1)
  card.appendChild(row2)

  // add card to page
  return card
}


// add generated card to the overlay
function overlay(card, image) {
  let content = document.getElementById("content")

  // create overlay
  let overlay = document.createElement("div")
  overlay.className = "overlay"

  // remove overlay when click off it
  document.addEventListener("click", (event) => {
      overlay.remove()
  })

  // if click on overlay, dont remove it
  card.addEventListener("click", (event) => {
    event.stopPropagation()
  })


  // add card to overlay
  overlay.append(card)


  // add overlay to page
  document.body.appendChild(overlay)


  // change pos to pos of image

  // determine overlay pos
  // use of getBoundingClientRect from : https://sqlpey.com/javascript/retrieve-x-y-position-html-elements-javascript/
  let imgRect = image.getBoundingClientRect()
  
  // get overlay dimensions
  let overlayRect = overlay.getBoundingClientRect()
  
  // get nav bar dimensions
  let navbar = document.getElementById("navbar bottom")
  let navbarRect = navbar.getBoundingClientRect()

  // determine image positions
  let top = imgRect.top + window.scrollY
  let imgBottom = imgRect.bottom + window.scrollY
  let left = imgRect.left

  // determine the width of the screen
  let viewportWidth = window.innerWidth


  // check doesnt go off screen (horizontally)
  if (left + overlayRect.width > viewportWidth) {
    left = left - 255
  }

  // check doesnt go off screen (vertically)
  if (top+ overlayRect.height > navbarRect.top + window.scrollY){
    top = imgBottom - overlayRect.height
  }

  // set position
  overlay.style.top = `${top}px`
  overlay.style.left = `${left}px`

}


// apply any filter changes 
function applyFilters(data) {
  // store available items
  let filteredData = []

  // loop through each item in data
  for (let i = 0; i < data.length; i++) {
    let available = false
    let availableType = false

    // check movie and tv fiter status
    if (movies == true && data[i].type == "Movie") {
      availableType = true
    }
    else if (series == true && data[i].type == "TV") {
      availableType = true
    }

    // for each platform filter, check if current item is on that streaming platform
    if (filters.netflix == true && data[i].streaming.includes("Netflix")) {
      available = true
    }

    if (filters.prime == true && data[i].streaming.includes("Amazon Prime")) {
      available = true
    }

    if (filters.disney == true && data[i].streaming.includes("Disney+")) {
      available = true
    }

    if (filters.all4 == true && data[i].streaming.includes("All4")) {
      available = true
    }

    if (filters.iplayer == true && data[i].streaming.includes("IPlayer")) {
      available = true
    }

    if (filters.itvx == true && data[i].streaming.includes("ITVX")) {
      available = true
    }


    if (filters.amazonRent == true && data[i].streaming.includes("Amazon To Rent")) {
      available = true
    }



    // apply genre filters
    availableGenre = false
    for (let j=0; j < data[i].genre.length; j++) {
      let genre = data[i].genre[j]

      if (selectedGenres.has(genre)) {
        availableGenre = true
      }
    }


    // if not available, remove item from data
    if (available == true && availableType == true && availableGenre == true) {
      filteredData.push(data[i])
    }
  }

  // display available items
  displayImage(filteredData)
}



// display the image content  
function displayImage(data) {
  // display in bootstrap container 
    
  const content = document.getElementById('content');
  content.innerHTML = ""; // clear existing content 

  // create bootstrap container
  const container = document.createElement('div');
  container.className = 'container-fluid';

  // create row
  const row = document.createElement('div');
  row.className = 'row';


  // loop through the objects
  for (let i = 0; i < data.length; i++) {

    // create img element
    const img = document.createElement('img');

    // insert img attributes from the json file
    img.src = data[i].image;
    img.alt = data[i].imageTitle;



    // create bootstrap column 
    const col = document.createElement('div')
    col.className = 'col-6 col-sm-4 col-md-3 ';
    // 'col-6' = 2 columns for small screen
    // 'col-sm-4 = 3 columns for medium screen 
    // 'col-md-3' = 6 columns for full width screen 

    // add image to column 
    col.appendChild(img)
    //initialise popover
    new bootstrap.Popover(img)

    // add coumn to row
    row.appendChild(col);

  }

  // construct the container
  container.appendChild(row);
  content.appendChild(container)


}












