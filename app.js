var express         =require("express"),
    mongoose        =require("mongoose"),
    sanitizer       =require("express-sanitizer"),
    methodOverride  =require("method-override"),
    app=express();

//app configuration
mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/blogApp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(sanitizer());
app.use(methodOverride("_method"));

//mongoose schema and model
var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    date: {type:Date,default:Date.now}
})
var blog=mongoose.model("blog",blogSchema);

// blog.create({
//     title:"What to lear",
//     image:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body:"keep learning"
// },function(error,newBlog){
//     if(error)
//     {
//         console.log("cant create")
//     }
//     else
//     {
//         console.log(newBlog);
//     }
// })

app.get("/",function(req,res){
    res.redirect("/blogs")
})

//index route
app.get("/blogs",function(req,res){
    blog.find({},function(error,getBlog){
        if(error)
        {
            console.log("cant find");
        }
        else
        {
            res.render("index",{blog:getBlog})
        }
    })
   
})

//new route
app.get("/blogs/new",function(req,res){
    res.render("new");
})

//create route
app.post("/blogs",function(req,res){
    req.body.newBlog.body=req.sanitize(req.body.newBlog.body)

    blog.create(req.body.newBlog,function(error,newBlog){
        if(error)
        {
            console.log("cant create")
        }
        else
        res.redirect("/blogs")

    })
})

//show route
app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(error,foundBlog){
        if(error)
        {
            res.redirect("/blogs");

        }
        else
        {
            res.render("show",{blog:foundBlog})
        }
    })
   
})

//edit route
app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(error,foundBlog){
        if(error)
        {
            res.redirect("/blogs")
        }
        else
        {
            res.render("edit",{blog:foundBlog})

        }
    })
  
})

//update route
app.put("/blogs/:id",function(req,res){
    req.body.newBlog.body=req.sanitize(req.body.newBlog.body)
    blog.findByIdAndUpdate(req.params.id,req.body.newBlog,function(error,foundBlog){
        if(error){
            console.log(error)
        }
        else
        res.redirect("/blogs/"+req.params.id)
        
    })

})

//delete route
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(error,blog){
        if(error)
        {
            console.log(error)
        }
        else(
            res.redirect("/blogs")
        )
    })
})
app.listen(process.env.PORT ||3000,function(){
    console.log("server started")
})
