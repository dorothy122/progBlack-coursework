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
      // run function to organise and display the data
      displayImage(data)

    })

})

//


// display the content nicely 

function displayImage(data) {

  // loop through the objects
  for (let i = 0; i < data.length; i++) {

    // create img element
    const img = document.createElement('img');

    // insert img attributes from the json file
    img.src = data[i].image;
    img.alt = data[i].imageTitle;

    // display on webpage
    document.getElementById('content').appendChild(img) 
  

  }

}




// to do:
// 1. loop through each item
// 2. dyanamically put them into the bootstrap columns
// 3. put this onto the webpage


