// TO DO //

// 1. make images appear in bootstrap columns - needs editting - 6 columns over lap for certain window size
// 2. DONE send only image info, type, title, streaming platforms 
// 3. DONE filter movie/tv show 
// 3.5 DONE add styling to navbar buttons BUT DONT REALLY LIKE THAT MUCH
// 4. DONE add streaming platform drop down to navbar (instead of search)
// 4.5 DONE filter streaming platforms
// 5. on click of image, enlarge to show extra info
// 6. DONE send additional info on click of image 



// to gloablly store main info for items
let allData = []

// globally store movie/series filters
let movies = true
let series = true

// globally store state of each platform filter
let filters = {
  netflix:true, prime:true, disney:true, iplayer:true, all4:true, itvx:true, amazonRent:true
}




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
      // gloablly store data
      allData = data

      // run function to organise and display the data
      displayImage(allData)

    })

  // filter movies
  const moviesButton = document.getElementById("movies");
  moviesButton.addEventListener("click", () => {series = false, movies = true, applyFilters(allData) })

  // filter tv shows
  const tvButton = document.getElementById("tv");
  tvButton.addEventListener("click", () => {movies = false, series = true, applyFilters(allData) })

  // filter home
  const homeButton = this.document.getElementById("home");
  homeButton.addEventListener("click", () => {movies = true, series = true, applyFilters(allData)})


  // apply streaming platform filters
  const platformFilterButton = this.document.getElementById("platformFilter")
  platformFilterButton.addEventListener('click', () => {applyFilters(allData)})



  // manually update platform filter states
  document.getElementById("netflix").addEventListener("click", () => {
    filters.netflix = !filters.netflix
  })
  document.getElementById("prime").addEventListener("click", () => {
    filters.prime = !filters.prime
  })
  document.getElementById("disney").addEventListener("click", () => {
    filters.disney = !filters.disney
  })
  document.getElementById("iplayer").addEventListener("click", () => {
    filters.iplayer = !filters.iplayer
  })  
  document.getElementById("all4").addEventListener("click", () => {
    filters.all4 = !filters.all4
  })
  document.getElementById("itvx").addEventListener("click", () => {
    filters.itvx = !filters.itvx
  })
  document.getElementById("amazonRent").addEventListener("click", () => {
    filters.amazonRent = !filters.amazonRent
  })


  // when click on image, fetch additional info for this item
  this.document.getElementById("content").addEventListener("click", (event) => {
    if (event.target.tagName == "IMG") {
      // get image names
      const title = event.target.alt
      
      // request info
      // https://www.geeksforgeeks.org/javascript/javascript-fetch-method/
      fetch('/list/single', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title })
      })

      // if not recieved
      .then(response => {
        if (!response.ok) {
          throw new Error("Server returned status " + response.status);
        }
        return response.json();
      })

      // if recieved, enlarge item
      .then(data => {
        enlarge(data)

      })
    }
  })




})


// on click of image, enlarge image and display additional info
function enlarge(data) {
  const content = document.getElementById("content")
  content.innerHTML = ""; // clear existing content for time being 

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

  // add car to page
  content.appendChild(card)

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

    if (filters.disney == true && data[i].streaming.includes("Disney+")) {
      available = true
    }

    if (filters.amazonRent == true && data[i].streaming.includes("AmazonForRent")) {
      available = true
    }

    // if not available, remove item from data
    if (available == true && availableType == true) {
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

    // add coumn to row
    row.appendChild(col);

  }

  // construct the container
  container.appendChild(row);
  content.appendChild(container)

}












