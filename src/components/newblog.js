import {useState} from 'react'

export default function Newblog() {
    const [showmodal,setShowModal]=useState(false)
    const showModal=()=>{setShowModal(true)}
    const closeModal=()=>{setShowModal(false)}
    const [name,setName]=useState('')
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [tag,setTag]=useState('')
    const handleSubmit=async(e)=>{
e.preventDefault()
const res = await fetch('http://localhost:8000/newblog', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'name':name,
        'title':title,
        'desc':desc,
        'tag':tag
    })
});

  if(res){
    console.log(res.json())
    closeModal()
}else{
    console.log('failed to submit')
    closeModal()
}
console.log("prevented default")
    }
    return (
        <>
            <li className='nav-item'>
                  <a className="nav-link" onClick={showModal} > 
                  <i className="fa-solid fa-light fa-pen-nib"></i>&nbsp;Write blog</a>
                </li>
          {showmodal && (
             <div className="modal d-block" >
             <div className="modal-dialog modal-xl">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title">New Blog</h5>
                   <button type="button" className="btn-close" onClick={closeModal}></button>
                 </div>
                 <div className="modal-body">
                 <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Author Name</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} id="name" aria-describedby="emailHelp" required/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Blog Title</label>
    <input type="text" className="form-control mb-3" id="title" onChange={(e)=>setTitle(e.target.value)} required/>
    <label htmlFor="title" className="form-label">Tag</label>

    <select className="form-select" onChange={(e)=>setTag(e.target.value)} aria-label="Default select example" required>
  <option >Select One</option>
  <option value="tech">Tech</option>
  <option value="non-tech">Non-Tech</option>
</select>
  </div>
  <div className="mb-3">
  <label htmlFor="title" className="form-label">Blog Description</label>
  <textarea  className="form-control" aria-label="With textarea" onChange={(e)=>setDesc(e.target.value)} required></textarea>
</div>
  
  <button type="submit" className="btn btn-primary float-end ">Post</button>
</form>
                 </div>
                 
               </div>
             </div>
           </div>
          )} 
        </>
    )
}   