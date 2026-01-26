
# API documentation

## Base url
**http://localhost:8090**

# GET /list
**Endpoint url:** http://localhost:8090/list

**Description** - Fetches the name, type, image, imageTitle, and streaming for all items in info.json 

**Method** - GET

**Parameters** -  None

**Success Response** - Sends data from info.json as an array

**Example Response** - Example of part of the response, sends this data for all items in the file so that the images can all be displayed on the page and filtered.
[
  {
    "name": "Little Women",
    "type": "Movie",
    "streaming": "Netflix, Amazon To Rent",
    "image": "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/219778/LW_OnLine_6072x9000_FNL_XMAS_Lk_03.jpg",
    "imageTitle": "Little Women"
  },
  {
    "name": "People We Meet On Vacation",
    "type": "Movie",
    "streaming": "Netflix",
    "image": "https://moviesallaround.com/wp-content/uploads/2026/01/People-We-Meet-On-Vacation-Movie-Review-2026.jpg",
    "imageTitle": "People We Meet On Vacation"
  },
  {
    "name": "Pitch Perfect",
    "type": "Movie",
    "streaming": "Netflix, Amazon To Rent",
    "image": "https://www.themoviedb.org/t/p/original/H78uA7tDGvDDSwWICx0aKpCpFi.jpg",
    "imageTitle": "Pitch Perfect"
  },
  ...
]

**Errors** - 500 server error -> server down or does not exist. Displays "Server unavailable. Please try again later" to user.


# GET /list/:title
**Endpoint url** (example for movie Little Women): http://localhost:8090/list/Little%20Women

**Description** - Fetches all data for a specific item given its title (searches info.json to fine the correspondibg item)

**Method** - GET

**Parameters** -  Title

**Success Response** - Sends complete data for item corresponding to title as a JSON object.

**Example Response** - 
{
  "name": "Little Women",
  "type": "Movie",
  "genre": "Hisotrical, Coming-of-age, Book Adaptation",
  "streaming": "Netflix, Amazon To Rent",
  "ageRating": "12",
  "description": "Determined to make her own way in the 1860s, a writer looks back at the tough yet tender times spent with her three spriited sisters and a close friend",
  "imageTitle": "Little Women",
  "image": "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/219778/LW_OnLine_6072x9000_FNL_XMAS_Lk_03.jpg"
}

**errors** - 500 server error -> server down or does not exist. Displays "Server unavailable. Please try again later" to user.


# POST /list/add
endpoint url: http://localhost:8090/list/add

**description** - Takes in the inputs from the form and adds these to a new item in info.json

**method** - POST

**headers** - Content-Type: application/json

**body parameters** -  Has body parameters from the form:
- name: the Title of the new item
- type: if its a movie or series
- genre: the genres of the new item
- streaming: The streaming platforms the new item is available on
- ageRating: the BBFC age rating
- description: a breif description of the new item
- image: image url
- imageTitle: used as the image alt

**success response** - "Thank you, your item has been added to the page". status: 200 okay


**errors** 
- 500 server error -> server down or does not exist. 
- 400 bad request -> form has invalid or missing fields 
- 400 duplicate item added -> "Item with this title already exists"

