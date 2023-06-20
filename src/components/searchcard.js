import {useState} from 'react'
export default function Searchcard(props){
    const [showmodal, setShowmodal] = useState(false);

    const toggleModal = () => {
        setShowmodal(!showmodal);
    }
    return (<div className='searchCard '>
    <p className=" display-7 blog-title-link"  onClick={() => setShowmodal(true)}>{props.title}:</p>
    <p className="display-7  truncate">{props.description}</p>
    <span className='display-7 text-muted'>written by: {props.author}</span>

    <hr/>
    {showmodal && (
                <div className="modal  d-block mt-5">
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

                        </div>
                    </div>
                </div>
            )
            }
    </div>)
}