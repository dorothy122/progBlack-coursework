const request = require("supertest")
const app = require("./app")

describe("Test the service", () => {

// /list
    // success
    test("Get /list succeeds", () => {
        return request(app)
        .get("/list")
        .expect(200)
    });

    // correct type
    test("Get /list returns json", () => {
        return request(app)
        .get("/list")
        .expect('Content-type', /json/)
    })


    // correct content/fields sent
    test("Get /list includes name, type, streaming, image, imageTitle", () => {
        return request(app)
        .get("/list")
        .expect(/name/)
        .expect(/type/)
        .expect(/streaming/)
        .expect(/image/)
        .expect(/imageTitle/)
    })


// /list/:title

    // success (200)
    test("Get /list/:title succeeds", () => {
        return request(app)
        .get("/list/Bottoms")
        .expect(200)
    });

    // correct data type (JSON)
    test("Get /list/:title returns json", () => {
        return request(app)
        .get("/list/Bottoms")
        .expect("Content-type", /json/)
    })

    // sends correct content
    test("Get /list/:title includes all fields", () => {
        return request(app)
        .get("/list/Bottoms")
        .expect(/name/)
        .expect(/type/)
        .expect(/streaming/)
        .expect(/image/)
        .expect(/imageTitle/)
        .expect(/ageRating/)
        .expect(/description/)
        .expect(/genre/)
    })

    // correct error status code when invalid title
    test("Get /list/:title returns 400 error if invalid title", () => {
        return request(app)
        .get("/list/notIncluded")
        .expect(400)
    })

    
    // correct error message
    test("Get /list/:title returns correct error message", () => {
        return request(app)
        .get("/list/notIncluded")
        .expect("No content for this item")
    })



// POST /list/add

    // valid data accepted
    // succeeds (200)
    test("Post /list/add succeeds", () => {
        const params = {
            "name": "Derry Girls",
            "type": "Series",
            "genre": "Comedy",
            "streaming": "Netflix",
            "ageRating": "15",
            "description": "Example description...",
            "image": "https://image.example.com",
            "imageTitle": "Derry Girls"
        }
        return request(app)
        .post("/list/add")
        .send(params)
        .expect(200)
    });


    // returns success message
    test("Post /list/add sends correct succees message", () => {
        const params = {
            "name": "Young Royals",
            "type": "Series",
            "genre": "Young Adult, Romance",
            "streaming": "Netflix",
            "ageRating": "15",
            "description": "Example description...",
            "image": "https://image.example.com",
            "imageTitle": "Young Royals"
        }
        return request(app)
        .post("/list/add")
        .send(params)
        .expect("Thank you, your item has been added to the page")
    });


    // rejects duplicates
    // duplicate status code (400)
    test("Post /list/add correct error status code for duplicates", () => {
        const params = {
            "name": "Little Women",
            "type": "Movie",
            "genre": "Historical",
            "streaming": "Netflix, Amazon To Rent",
            "ageRating": "12",
            "description": "Example description...",
            "image": "https://image.example/different/image/still/duplicates.com",
            "imageTitle": "Little Women"
        }
        return request(app)
        .post("/list/add")
        .send(params)
        .expect(400)
    });


    // duplicate error message
    test("Post /list/add sends correct succees message", () => {
        const params = {
            "name": "Little Women",
            "type": "Movie",
            "genre": "Historical",
            "streaming": "Netflix, Amazon To Rent",
            "ageRating": "12",
            "description": "Example description...",
            "image": "https://image.example/different/image/still/duplicates.com",
            "imageTitle": "Little Women"
        }
        return request(app)
        .post("/list/add")
        .send(params)
        .expect("Item with this title already exists")
    });

})