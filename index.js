const express = require('express')
const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



let recipes = [
    {
        id: 0,
        name: "Spaghetti Bolognese",
        ingredients: ["onion", "spaghetti", "beef", "tomato sauce"],
        purchasePrice: 30,
        sellingPrice: 50,
    },
    {
        id: 1,
        name: "Chicken Burger",
        ingredients: [
            "onion",
            "tomato",
            "chicken",
            "bread",
            "creamy sauce",
            "cheese",
        ],
        purchasePrice: 50,
        sellingPrice: 100,
    },
    {
        id: 2,
        name: "Chicken curry with rice",
        ingredients: ["rice", "chicken", "salt", "curry pasta"],
        purchasePrice: 45,
        sellingPrince: 70,
    },
    {
        id: 3,
        name: "Pizza with peppers",
        ingredients: ["pasta", "onion", "peppers", "ham", "tomato sauce", "cheese"],
        purchasePrice: 80,
        sellingPrice: 110,
    },
];
app.get('/recipes',(req,res)=>{
    res.json(recipes);
})

app.get('/recipes/:recipeID',(req,res)=>{
    let recipeID = req.params.recipeID
    let found = recipes.find(newId=>{
        return newId.id == recipeID;
    })
    res.json(found);
})

app.post('/addrecipe/',(req,res)=>{
    let newRecipe = req.body;
    recipes.push(newRecipe);
    res.json(recipes);
})

app.delete('/deleteRecipe/:recipeId',(req,res)=>{
    let Id = req.params.recipeId
    recipes = recipes.filter((deletingId)=>{
        return deletingId.id != Id;
    })
    res.json(recipes);
})

app.put('/updateRecipe/:recipeId',(req,res)=>{
    let updateId = req.params.recipeId  // parameter id
    let ingre = req.body.ingredients //for the req.body in postman
    let update = recipes.find((object)=>{
        return object.id == updateId;
    })

    update.ingredients[0] = ingre
    res.json(update);

})



app.listen(5000), () => {
    console.log("Im listening")
}