import "../style.css";
 

function Navbar(){



    const handleClick = () => {
        document.querySelector(".sidebar").classList.toggle("open");
    }
    
    return (
        <div>
            <div className="sidebar">
                <div className="logo-details">
                <i className></i>
                    <div className="logo_name">OFPPT</div>
                    <i className='fa-solid fa-bars' id="btn" onClick={handleClick}></i>
                </div>
                <ul className="nav-list">

                <li>
                    <a href="/">
                    <i className='fa-solid fa-home'></i>
                    <span className="links_name">Accueil</span>
                    </a>
                    <span className="tooltip">Accueil</span>
                </li>
                <li>
                <a href="/formateurs">
                    <i className='fa-solid fa-chalkboard-teacher' ></i>
                    <span className="links_name">Formateurs</span>
                </a>
                <span className="tooltip">Formateurs</span>
                </li>
                <li>
                <a href="/filieres">
                    <i className='fa-solid fa-sitemap' ></i>
                    <span className="links_name">Filiéres</span>
                </a>
                <span className="tooltip">Filiéres</span>
                </li>
                <li>
                <a href="/groupes">
                    <i className='fa-solid fa-layer-group' ></i>
                    <span className="links_name">Groupes</span>
                </a>
                <span className="tooltip">Groupes</span>
                </li>
                <li>
                <a href="/modules">
                    <i className='fa-solid fa-book-open' ></i>
                    <span className="links_name">Modules</span>
                </a>
                <span className="tooltip">Modules</span>
                </li>
                <li>
                <a href="/salles">
                    <i className='fa-solid fa-school' ></i>
                    <span className="links_name">Salles</span>
                </a>
                <span className="tooltip">Salles</span>
                </li>
                <li>
                <a href="/sallesDispo">
                    <i className='fa-solid fa-search-plus' ></i>
                    <span className="links_name">Salles Disponibes</span>
                </a>
                <span className="tooltip">Salles Disponibes</span>
                </li>
                <li>
                <a href="/setEmploi">
                    <i className='fa-solid fa-clock' ></i>
                    <span className="links_name">Modifer les emplois de temps</span>
                </a>
                <span className="tooltip">Modifer les emplois de temps</span>
                </li>
                <li>
                <a href="/getEmploi">
                    <i className='fa-solid fa-calendar-alt' ></i>
                    <span className="links_name">Voir les emplois de temps</span>
                </a>
                <span className="tooltip">Voir les emplois de temps</span>
                </li>
                
                </ul>
            </div>
            <section className="home-section">
                <div className="text">OFPPT</div>
            </section>
            
        </div>
    )
}
export default Navbar;