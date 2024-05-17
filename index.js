const express = require('express');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files })
    })
});

app.post('/create', function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        if (err) console.log(err)
        else res.redirect('/')
    })
})

app.get('/file/:filename', function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        const filename = req.params.filename.split('.txt').join('')
        res.render('file', { filename: filename, filedata: filedata })
    })
})

app.delete('/delete/:filename', function (req, res) {
    fs.unlink(`./files/${req.params.filename}`, function (err) {
        if(err) console.log(err)  
        else res.redirect('/')
    })
})



app.listen(port, function () {
    console.log("server started at http://localhost:3000")
})