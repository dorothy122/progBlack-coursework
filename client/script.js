// TO DO //

// 1. make images appear in bootstrap columns - needs editting - 6 columns over lap for certain window size
// 2. send only image info, type, title, streaming platforms 
// 3. filter movie/tv show
// 4. filter streaming platforms
// 5. on click of image, enlarge to show extra info
// 6. send additional info on click of image 









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

// display the image content nicely 

function displayImage(data) {
  // display in bootstrap container 
    
  const content = document.getElementById('content');

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
    col.className = 'col-6 col-sm-4 col-md-2 ';
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

// event listener for click movies, 





// click tv shows, 




// filter genres, 





// filter age rating, 






// filter streaming platforms














