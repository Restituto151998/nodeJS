const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = 5000


const app = express();

const dbUrl = 'mongodb://127.0.0.1/todoListProject'; //database name must be unique

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Task = require('./model/todolist.model');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.get('/recipes', (req, res) => {
//     res.json(recipes);
// })


// app.get('/recipes/:recipeID', (req, res) => {
//     let recipeID = req.params.recipeID
//     let found = recipes.find(newId => {
//         return newId.id == recipeID;
//     })
//     res.json(found);
// })




app.post('/addtask', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        creator: req.body.creator
    })

    newTask.save((err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});


app.get('/task', (req, res) => {
    Task.find({}, (err, task) => {
        if (err) {
            res.send(err)
        }
        res.json({ task: task })
    });
});

app.delete('/task/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err, task) => {
        if (err) {
            res.send(err)
        }
        res.send('DELETED!')
    });
});



// app.delete('/deleteRecipe/:recipeId', (req, res) => {
//     let Id = req.params.recipeId
//     recipes = recipes.filter((deletingId) => {
//         return deletingId.id != Id;
//     })
//     res.json(recipes);
// })

// app.put('/updateRecipe/:recipeId', (req, res) => {
//     let updateId = req.params.recipeId  // parameter id
//     let ingre = req.body.ingredients //for the req.body in postman
//     let update = recipes.find((object) => {
//         return object.id == updateId;
//     })

//     update.ingredients[0] = ingre
//     res.json(update);

// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});