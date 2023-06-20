export default function Skeletoncard(props) {
   
    return (<div  className='col-sm-12 col-md-3 col-lg-3  card card-hover m-2 pt-3 skeleton' key={props.key}>
        <h5 className="blog-title-link p-3" ></h5>
        <p className="p-3"></p>
        <p className=""><span className="badge text-dark bg-warning"></span></p>
        <p className=""><small className="text-muted "></small></p>
    </div>)
}