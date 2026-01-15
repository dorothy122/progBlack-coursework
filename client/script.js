// from practicle 10

window.addEventListener('click', function(event){
  fetch('/list')
    .then(response => {
      if (!response.ok) {
        throw new Error("Server returned status " + response.status);
      }
      return response.text();
    })


    //.then(body => {
    //  document.getElementById('content').innerHTML = body;
    //})

    .then(data => {
      // run function to organise and display the data
      displayContent(data)
    })

})


//

// display the content nicely 

function displayContent(info) {

// loop through the objects

    var arr = info



}




// to do:
// 1. loop through each item
// 2. dyanamically put them into the bootstrap columns
// 3. put this onto the webpage


