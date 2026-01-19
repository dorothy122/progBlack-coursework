// TO DO //

// 1. make images appear in bootstrap columns - needs editting - 6 columns over lap for certain window size
// 2. DONE send only image info, type, title, streaming platforms 
// 3. DONE filter movie/tv show 
// 3.5 DONE add styling to navbar buttons BUT DONT REALLY LIKE THAT MUCH
// 4. DONE add streaming platform drop down to navbar (instead of search)
// 4.5 DONE filter streaming platforms
// 5. on click of image, enlarge to show extra info
// 6. send additional info on click of image 



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


})


// on click of image, enlarge image and display additional info













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












