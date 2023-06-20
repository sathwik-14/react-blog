import Newblog from './newblog';

export default function NavBar({ handleSearch, search, handleChange, toggleNotification}) {

    
    return (<nav className={'sticky-top shadow  navbar pt-2 navbar-light bg-light navbar-expand-lg'}>
        <div className="container">
          <a className="navbar-brand" href="#">BlogApp</a>
          <div className="d-flex align-items-center">

            <div className="pe-4  position-relative d-block d-lg-none" onClick={toggleNotification}>
              <i className={'fa fa-solid fa-bell fa-xl'}></i>
              <span className="position-absolute top-0 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            </div>
            <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Newblog />
            </ul>
            <form className="d-flex align-items-center " onSubmit={e => {
      e.preventDefault();
      handleSearch(search);
    }}>


              <button type="button" className="me-4 btn btn-transparent position-relative d-none d-lg-block" onClick={toggleNotification}>
                <i className={'fa fa-solid fa-bell fa-xl text-dark'}></i>
                {
          /* <span className="position-absolute top-0 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
           <span className="visually-hidden">New alerts</span>
          </span> */
        }
              </button>
              <input className="form-control me-2" onChange={handleChange} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>);
  }