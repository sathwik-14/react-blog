import { useState } from 'react';



function BlogCard(props) {
    const [showmodal, setShowmodal] = useState(false);
   const [liked, setLiked] = useState(props.liked);
    const toggleModal = () => {
        setShowmodal(!showmodal);
    }

    const handleLike = async () => {
        if (props.liked === false) {
            const res = await fetch(`http://localhost:8000/like/${props.id}`, {
                method: 'GET'
            });
            if (res) {
                console.log(res.message)
                setLiked(true)
            }
        }
        else {
            const res = await fetch(`http://localhost:8000/dislike/${props.id}`,
                {
                    method: 'GET',
                });
            if (res) {
                setLiked(false)
                console.log(res)
            }
        }
    }

    return (
        <>


            <div className='col-sm-12 col-md-3 col-lg-3 card card-hover m-2 pt-3' key={props.id}>
                <h5 className="blog-title-link" onClick={() => setShowmodal(true)} >{props.title}</h5>
                <p className="truncate">{props.description}</p>
                {props.tag === 'tech' && <p className=""><span className="badge text-dark bg-warning">Tech</span></p>}
                {props.tag === 'it' && <p className=""><span className="badge text-dark bg-info">Non-Tech</span></p>}
                <p className="">
                    <small className="text-muted">Author: {props.author}</small>
                    <small className="text-muted float-end">
                        {
                        liked ? (
                        <i onClick={handleLike} className={`text-danger fa-regular fa-heart fa-xl`}></i>)
                      : ( <i onClick={handleLike} className={`text-dark fa-regular fa-heart fa-xl`}></i>)}

                    </small>
                </p>
            </div>
            {showmodal && (
                <div className="modal  d-block">
                    <div className="modal-dialog modal-lg  modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex flex-column gap-2">
                                    <span>{props.title}</span>

                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className='d-flex justify-content-between'>
                                    {props.tag === 'tech' && <p className="display-7"><span className="badge text-dark bg-warning ">Tech</span></p>}
                                    {props.tag === 'it' && <p className="display-7"><span className="badge text-dark bg-info ">Nono-tech</span></p>}
                                    <span className='display-7 text-muted'>written by: {props.author}</span>
                                </div>
                                <p>{props.description}</p>
                            </div>
                        <div className='modal-body'>
                        <p className='display-7 text-muted'><i class="fa-regular fa-comment"></i>&nbsp;Comments&nbsp;</p>
                        { props.comments.map((comment)=>
                            <p>{comment}</p>
                        )}
                        </div>

                        </div>
                    </div>
                </div>
            )
            }

        </>
    )
}

export default BlogCard;