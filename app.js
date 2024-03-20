if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Article = require("./init/schema.js");
const methodOverride = require("method-override");
const app = express();

app.set("view, engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const dburl = process.env.ATLASDB_URL;

main()
.then((res) => {
    console.log("connection successfull");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    mongoose.connect(dburl);
};

app.listen(8080, () => {
    console.log("app is listening to port 8080");
});

app.get("/", (req, res) => {
    res.send("This is a home page");
});


//HOME ROUTE
app.get("/blogs", async(req, res) => {
    let blogs = await Article.find();
    res.render("home.ejs", {blogs});
});


//CREATE ROUTE
app.get("/blogs/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/blogs/create", (req, res) => {
    let {title, description, markdown} = req.body;
    console.log(title, description, markdown);
    let article = new Article({
        title: title,
        description: description,
        markdown: markdown,
        createdAt: new Date(),
    });
    article.save()
    .then((res) => {
        console.log("Blog saved successfully");
    })
    .catch((err) => {
        console.log(err);
    })
    res.redirect("/blogs");
})

//SHOW ROUTE
app.get("/blogs/:id/show", async (req, res) => {
    let { id } = req.params;
    let blog = await Article.findById(id);
    res.render("show.ejs", { blog });
})

app.get("/blogs/:id/edit", async(req, res) => {
    let {id} = req.params;
    let blog = await Article.findById(id);
    res.render("edit.ejs", {blog});
})

app.put("/blogs/:id/edit", async (req, res) => {
    let {id} = req.params;
    let {title, description, markdown} = req.body;
    let article = {
        title: title,
        description: description,
        markdown: markdown,
        createdAt: new Date(),
    };
    let updatedBlog =  await Article.findByIdAndUpdate(id, article, {runValidators: true}, {new: true});
    console.log(updatedBlog);
    res.redirect("/blogs");
});

app.delete("/blogs/:id", async(req, res) => {
    let {id} = req.params;
    let deletedBlog = await Article.findByIdAndDelete(id);
    console.log(deletedBlog);
    res.redirect("/blogs");
});
