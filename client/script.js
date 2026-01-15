window.addEventListener('click', function(event){
  fetch('/list')
    .then(response => {
      if (!response.ok) {
        throw new Error("Server returned status " + response.status);
      }
      return response.text();
    })
    .then(body => {
      document.getElementById('content').innerHTML = body;
    })
    .catch(error => {
      document.getElementById('content').innerHTML =
        "<p style='color:red;'>Error: " + error.message + "</p>";
    });
});

// from practicle 10