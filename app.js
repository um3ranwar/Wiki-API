const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1/wikiDB', {useNewUrlParser : true});

const articleSchema ={
  title:  String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

/////////////////////////////////////////////For All Articles
app.route("/articles")


.get(function(req , res) {
  Article.find(function(err , foundArticles){
if (err) {
  console.log(err);
}else {
 res.send(foundArticles);
}

  });
})

.post( function(req , res){

const newArticle = new Article ({
  title: req.body.title,
  content :req.body.content
});
newArticle.save(function(err){
if (err) {
  console.log(err);
} else {
  console.log("successfully added");
}

});
})

.delete(function(){
Article.deleteMany(function(err){
if (err) {
  console.log(err);
} else {
  console.log("successfully deleted");
}

});

});
/////////////////////////////////////////for a particular ARTICLE

app.route("/articles/:articleTitle")
.get(function(req ,res){
  Article.findOne({title : req.params.articleTitle} , function(err ,foundArticle){
if (foundArticle) {
  res.send(foundArticle);
} else {
  res.send("No Article Found");
}

  });
})
.put(function(req , res){
Article.replaceOne({title:req.params.articleTitle},{title:req.body.title , content:req.body.content},{overwrite: true},
function(err){
  if (err) {
    console.log(err);
  } else {
    res.send("successfully updated");
  }
});
})
.patch(function(req , res){
Article.updateOne({title:req.params.articleTitle},{$set:req.body},
function(err){
  if (err) {
    console.log(err);
  } else {
    res.send("successfully updated");
  }
});
})
.delete(function(req , res){
Article.deleteOne({title:req.params.articleTitle},
function(err){
  if (err) {
    console.log(err);
  } else {
    res.send("successfully deleted");
  }
});
})


app.listen(3000 , function(){

  console.log("server is ready at post 3000");
});
