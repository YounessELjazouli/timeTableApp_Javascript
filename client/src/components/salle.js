import {useState , useEffect} from "react";
import Axios from "axios";



function Salles(){
    
    const [ codeSalle , setCodeSalle ] = useState('');
    const [ typeSalle , setTypeSalle ] = useState('');
    const [ infoSallesList , setInfoSallesList ] = useState([]);
    const [ normalSallesList , setNormalSallesList] = useState([]);
    const [ atelierList , SetAtelierList] = useState([]);

    const submitSalle = () => {
        Axios.post("http://localhost:3001/api/insert/salle",{
            codeSalle: codeSalle,
            typeSalle: typeSalle
            
        })
        if(typeSalle = "atelier"){
            SetAtelierList([...atelierList,{codeSalle: codeSalle,
                typeSalle: typeSalle}])
        }else{
            setInfoSallesList([...infoSallesList,{codeSalle: codeSalle,
                typeSalle: typeSalle}])
            setNormalSallesList([...normalSallesList,{codeSalle: codeSalle,
                typeSalle: typeSalle}])
        }

       
        
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/infoSalles",{
        }).then((response)=> {
            setInfoSallesList(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/normalSalles",{
        }).then((response)=> {
            setNormalSallesList(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/atelier",{
        }).then((response)=> {
            SetAtelierList(response.data)
        })
    },[])
 
    const deleteSalle = (codeSalle) => {
        Axios.delete(`http://localhost:3001/api/delete/salle/${codeSalle}`)
        
        
    }

    return(
        <div  className="container-fluid" id="content-add-salle">
            <div className="row">
                <div className="col-sm-4 dashSalle">
                    <div className="addTeacherFormWrapper wrapper">
                        <h1 className="title">Ajouter Salle</h1>
                        <span id="message"></span>
                        <form method="POST" id="salleForm">
                            <div className="form-floating my-3">
                                <input type="text" className="user-input" id="codeS" name="codeS" onChange = {(e) => {
                                    setCodeSalle(e.target.value)
                                }}/>
                                <label for="nomF">Code de la salle</label>
                            </div>
                            <div className="select-wrapper">
                                <select className="user-select" aria-label="Default select example" name="typeS" onChange = {(e) => {
                                        setTypeSalle(e.target.value)
                                    }}>
                                    <option selected>Choisir Quelle type de salle s'agit elle :</option>
                                    <option value="normale">Salle Normale</option>
                                    <option value="info">Salle Informatique</option>
                                    <option value="atelier">Atelier</option>
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <button type="button" className="bouton" id="submit" name="ajouterSalle"  onClick={submitSalle}>Ajouter La salle</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-8 mainSalle mt-5'>
                    <div id="salleList" className='container'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <table className="table table-hover table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {infoSallesList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-4'>
                                <table className="table table-hover table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {normalSallesList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-4'>
                                <table className="table table-hover table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {atelierList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Salles;