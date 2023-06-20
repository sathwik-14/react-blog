import './App.css';
import blogImg from './assets/home.jpg';
import { useState, useEffect } from 'react';
import BlogCard from './components/blogcard';
import Skeletoncard from './components/skeleton';
import Searchcard from './components/searchcard'
import NavBar from './components/navbar';
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img"></div>
    <div className="skeleton-content">
      <div className="skeleton-badge"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
    </div>
  </div>
);

function App() {

  const [latest, setLatest] = useState([]);
  const [allblogs, setAllblogs] = useState([])
  const [techblogs, setTechblogs] = useState([])
  const [itblogs, setItblogs] = useState([])
  const [likeblogs,setLikedblogs]=useState([])
  const [showallblogs, setShowallblogs] = useState(true)
  const [showtechblogs, setShowtechblogs] = useState(false)
  const [showitblogs, setShowitblogs] = useState(false)
  const [showlikedblogs, setShowlikedblogs] = useState(false)
  const [nf, setNf] = useState(true)
  const [of, setOf] = useState(false)
  const [showskeleton, setShowskeleton] = useState(true)
  const [loading, setLoading] = useState(true);
  const [searchres, setSearchres] = useState([])
  const [isempty, setIsempty] = useState(true)
  const [search, setSearch] = useState('')
  const [shownotification,setShownotification]=useState(false)
  const toggleNotification=()=>{
    console.log('clicked')
    setShownotification(!shownotification)}


  const reverseBlogs = (e) => {
    if (nf && e.target.innerText === 'Oldest First') {
      setNf(false)
      setOf(true)
      setAllblogs((prevAllBlogs) => [...prevAllBlogs].reverse());

    } else if (of && e.target.innerText === 'Newest First') {
      setNf(true)
      setOf(false)
      setAllblogs((prevAllBlogs) => [...prevAllBlogs].reverse());

    } else {
      return
    }
  }


  const getBlogs = async () => {
    try {
      const res = await fetch('http://localhost:8000/', {
        method: 'GET',
      })
      if (res) {
        const data = await res.json();
        setAllblogs(data.reverse());
        if(data.length>0)
        setShowskeleton(false)
      }
    } catch (err) {
      console.log(err);
    }

  }
  const getLatest = async () => {
    try {
      const res = await fetch('http://localhost:8000/get/latest', {
        method: 'GET',
      })
      if (res) {
        const data = await res.json();
        setLatest(data);
        if(data.length>0)
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    getLatest()
    getBlogs()

  }, []);
  const getByTag = async (e) => {
    const tag = e.target.innerText.toLowerCase();
    try {
      if (showallblogs)toggleAll()
      if (showlikedblogs)toggleLiked()
      if (tag === 'tech' && showtechblogs === false) {
        if (showitblogs) toggleIt();
        toggleTech()

      }
      if (tag === 'it' && showitblogs === false) {
        if (showtechblogs) toggleTech();
        toggleIt()
      }
      
      const res = await fetch(`http://localhost:8000/${tag}`, {
        method: 'GET',
      });
      if (res) {
        const data = await res.json();
        if (tag === 'tech')
          setTechblogs(data);
        if (tag === 'it')
          setItblogs(data)
      }

    } catch (err) {
      console.log(err);
    }
  }

  const getByLikes = async (e) => {
    if(showallblogs)toggleAll()
    if(showtechblogs)toggleTech()
    if(showitblogs)toggleIt()
    toggleLiked()
    
  }


  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${searchTerm}`, { method: 'GET' });
      const data = await response.json();
      // Handle the received data, e.g., update the state with the filtered blogs
      if (data.length === 0) {
        setIsempty(true)
        return
      }
      if (data.length > 0)
        setSearchres(data)
      setIsempty(false)
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error('Error:', error);
    }
  };


  const toggleAll = () => { return setShowallblogs(!showallblogs) }
  const toggleTech = () => { return setShowtechblogs(!showtechblogs) }
  const toggleIt = () => { return setShowitblogs(!showitblogs) }
  const toggleLiked = () => { return setShowlikedblogs(!showlikedblogs) }
  const getAll = () => {
    setShowtechblogs(false)
    setShowallblogs(true)
    setShowitblogs(false)
  }

  const items = [1, 2, 3]

  const [showmodal, setShowmodal] = useState(false);

  const toggleModal = () => {
    setShowmodal(!showmodal);
  }
  const handleChange = (e) => {
    if (e.target.value === '') {
      setIsempty(true)
    }
    setSearch(e.target.value)
  }

  return (
    <>
      <div className={' App'}>
        <NavBar toggleNotification={toggleNotification}   handleSearch={handleSearch} search={search} handleChange={handleChange}  />
        {shownotification && <div className='notification bg-light  notification-banner  text-center'>
          <p className='display-6 p-2'>No new notification</p></div>}
        {
          !isempty &&
          <div className='search-res bg-light p-4 shadow'>
            {searchres.map((res) => (
              <div key={res.id}>
                <Searchcard id={res.id} title={res.title} author={res.author}
                  description={res.description}
                  tag={res.tag}
                />
              </div>))}

          </div>
        }
        <div className='container mt-5'>


          <div className="container pt-3 mb-3" style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
            {loading ? (
              // Render skeleton screen while data is loading
              [1].map((index) => <SkeletonCard key={index} />)
            ) : (
              latest.map((blog) => (
                <div className="row" key={blog.id}>
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={blogImg} height={250} width={250} className="rounded-start bg-rm" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body pt-3">
                      <p className="card-text">
                        <small className="text-light badge bg-success">Latest</small>
                      </p>
                      <h5 className="card-title blog-title-link" onClick={() => setShowmodal(true)}>{blog.title}</h5>
                      <p className="card-text truncate-more-line mt-3">{blog.description}</p>
                      <span className='display-7 text-muted'>written by: {blog.author}</span>

                    </div>
                  </div>
                </div>
              ))
            )}
            {showmodal && latest.map((blog) => (
              <div className="modal  d-block" key={blog.id}>
                <div className="modal-dialog modal-lg  modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title d-flex flex-column gap-2">
                        <span>{blog.title}</span>

                      </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
                    </div>
                    <div className="modal-body">
                      <div className='d-flex justify-content-between'>
                        {blog.tag === 'tech' && <p className="display-7"><span className="badge text-dark bg-warning ">Tech</span></p>}
                        {blog.tag === 'it' && <p className="display-7"><span className="badge text-dark bg-info ">Nono-tech</span></p>}
                        <span className='display-7 text-muted'>written by: {blog.author}</span>
                      </div>
                      <p>{blog.description}</p>
                    </div>

                  </div>
                </div>
              </div>
            ))
            }
          </div>

          <div className='container'>
            <p className='h5 mt-5'>Quick Search</p>
            <ul className="nav nav-pills my-4" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={showallblogs ? 'bg-success text-white nav-link' : 'nav-link'} onClick={getAll}>
                  All</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={showtechblogs ? 'active nav-link' : 'nav-link'} onClick={(e) => { getByTag(e) }}>
                  Tech</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={showitblogs ? 'active nav-link' : 'nav-link'} onClick={(e) => { getByTag(e) }}>
                  It</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={showlikedblogs ? 'active nav-link' : 'nav-link'} onClick={(e) => { getByLikes(e) }}>
                  Liked</button>
              </li>
              <div className="btn-group ms-auto">
                <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort By
                </button>
                <ul className="dropdown-menu">
                  <div><a className={nf ? 'dropdown-item active' : 'dropdown-item'} onClick={(e) => reverseBlogs(e)}>Newest First</a></div>
                  <div><a className={of ? 'dropdown-item active' : 'dropdown-item'} onClick={(e) => reverseBlogs(e)}>Oldest First</a></div>
                  {/* <div><a className="dropdown-item" >Most Popular</a></div>
    <div><a className="dropdown-item" >Least Popular</a></div> */}


                </ul>
              </div>

            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent" >
            <div>
              <div className=" row m-1 d-flex justify-content-center">
                {showskeleton && items.map((item) => (<>
                  <Skeletoncard key={item}/>
                  </>
                ))}
                {showallblogs && allblogs.map((blog) => (
                  <BlogCard comments={blog.comments} liked={blog.liked} key={blog.id} author={blog.author} id={blog.id} title={blog.title} description={blog.description} tag={blog.tag} />
                ))}
                {showtechblogs && techblogs.map((blog) => (
                  <BlogCard comments={blog.comments}  liked={blog.liked} key={blog.id} author={blog.author} id={blog.id} title={blog.title} description={blog.description} tag={blog.tag} />

                ))}
                {showitblogs && itblogs.map((blog) => (
                  <BlogCard comments={blog.comments} liked={blog.liked} key={blog.id} author={blog.author} id={blog.id} title={blog.title} description={blog.description} tag={blog.tag} />

                ))}
              </div>

            </div>

          </div>

        </div>

        <div className='footer bg-transparent mt-5 text-center'>
          <p className='display-7 '>Built by <a href='https://waglesathwik.onrender.com'>wagle sathwik</a></p>
        </div>
      </div>

    </>
  );
}

export default App;

    
  