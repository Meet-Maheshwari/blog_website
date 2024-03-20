const mongoose = require("mongoose");
const Article = require("./schema.js");
const initData = require("./data.js");

main()
.then((res) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
};

const initDB = async () => {
    await Article.insertMany(initData);
    console.log("data was initialized");
};

initDB();

