const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();

const blogs=
    [{
            id:1,
        title:'Blog 1',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        author:'Author 1',
        tag:'tech',
        liked:false,
        comments:['very good blog','nice blog','useful. thank you bro']
    },
    {
        id:2,
    title:'Blog 2',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    author:'Author 2',
    tag:'it',
    liked:false,
    comments:['very good blog','nice blog','useful. thank you bro']
},{
  id:3,
title:'Blog 3',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 3',
tag:'tech',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
},{
  id:4,
title:'Blog 4',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 4',
tag:'it',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
},
{
  id:5,
title:'Blog 5',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 5',
tag:'it',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
},
{
  id:6,
title:'Blog 6',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 6',
tag:'it',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
},
{
  id:7,
title:'Blog 7',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 7',
tag:'it',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
},
{
  id:8,
title:'Blog 8',
description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
author:'Author 8',
tag:'it',
liked:false,
comments:['very good blog','nice blog','useful. thank you bro']
}
    
]




// Middleware
app.use(cors()); // Use the cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.json(blogs);
});

app.get('/api/blogs/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm; // Retrieve the search term from the query parameters

  // Perform the search logic based on the searchTerm
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.json(filteredBlogs); // Return the filtered blogs as JSON response
});


app.get('/:tag', (req, res) => {
  const blogsByTag=blogs.filter((blog)=>blog.tag===req.params.tag)
  res.json(blogsByTag);
});

app.get('/like/:id', (req, res) => {
  console.log(req.params.id)
  try{
    for (const blog of blogs) {
      if (blog.id == req.params.id) {
        blog.liked=true;
      }   
    }
  res.json({ msg: "done" });
  }catch(e){
    console.log(e.message)
  }
});

app.get('/dislike/:id', (req, res) => {
  console.log(req.params.id)
  try{
    for (const blog of blogs) {
      if (blog.id == req.params.id) {
        blog.liked=false;
      }   
    }
  res.json({ msg: "done" });
  }catch(e){
    console.log(e.message)
  }
});

app.post('/newblog',(req,res)=>{
  const len=blogs.length
  try{
    blogs.push({
      id:len+1,
      title:req.body.title,
      description:req.body.desc,
      author:req.body.name,
      tag:req.body.tag,
    })
  }
  catch(e){
    console.log(e.message)
  }
  
  res.json({msg:"done"})
})

app.get('/get/latest', (req, res) => {
  const len=blogs.length
  const latest=blogs.filter((blog)=>blog.id===len)
  res.json(latest);
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
