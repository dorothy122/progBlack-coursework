// TO DO //

// 1. make images appear in bootstrap columns - needs editting - 6 columns over lap for certain window size
// 2. DONE send only image info, type, title, streaming platforms 
// 3. DONE filter movie/tv show 
// 3.5 DONE add styling to navbar buttons BUT DONT REALLY LIKE THAT MUCH
// 4. DONE add streaming platform drop down to navbar (instead of search)
// 4.5 filter streaming platforms
// 5. on click of image, enlarge to show extra info
// 6. send additional info on click of image 



// to gloablly store main info for items
let allData = []

// globally store movie/series filters
var movies = true
var series = true




// from practicle 10

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

  moviesButton.addEventListener("click", () => {series = false, displayImage(allData.filter(item => item.type === "Movie")) })

  // filter tv shows
  const tvButton = document.getElementById("tv");

  tvButton.addEventListener("click", () => {movies = false, displayImage(allData.filter(item => item.type === "TV")) })

  // filter home
  const homeButton = this.document.getElementById("home");
  homeButton.addEventListener("click", () => {movies = true, series = true, displayImage(allData)})

  // apply streaming platform filters
  const platformFilterButton = this.document.getElementById("platformFilter")

  platformFilterButton.addEventListener('click', () => {applyFilters(allData)})



})



function applyFilters(allData) {
  // locally store allData
  data = allData

  // name dropdown filters 
  const netflixToggle = this.document.getElementById("netflix")
  const primeToggle = this.document.getElementById("prime")
  const disneyToggle = this.document.getElementById("disney+")

  // store state of each filter
  let filters = {
    netflix:true, prime:true, disney:true
  }
  

  // determine filter states
  if (!netflixToggle.checked) {
    filters.netflix = false
  }

  if (!primeToggle.checked) {
    filters.prime = false
  }

  if (!disneyToggle.checked) {
    filters.disney = false
  }



  // filter data
  // loop through each item in data
  for (let i = 0; i < data.length; i++) {
    available = false

    // for each filter, check if current item is on that streaming platform
    n = 0
    while (available == false && n <= filters.length) {
      if (filters.netflix == true && data[i].includes("Netflix")) {
        available = true
      }
      else {
        n = n+1
      }

      if (filters.prime == true && data[i].includes("Amazon Prime")) {
        available = true
      }
      else {
        n = n+1
      }

      if (filters.disney == true && data[i].includes("Disney+")) {
        available = true
      }
      else {
        n = n+1
      }
        
    }

    // if not available, remove item from data
    if (!available) {
      data.splice(1, i)
    }
  }

  displayImage(data)
}

// doesnt work
// i expect that when the item is removed, it messes up the for loop 
// as there arent the same num items any more and the indexes will have moved down

// could also probably move the checking toggle status into the whil loop 
// instead of storing in filters and then checking status of each filter, just check toggle status then


// display the image content nicely 

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

    // display on webpage
    // document.getElementById('content').appendChild(img) 

    }

    // construct the container
    container.appendChild(row);
    content.appendChild(container)

}












