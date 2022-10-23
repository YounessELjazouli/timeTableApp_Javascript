import {useState , useEffect} from "react";
import Axios from "axios";

function Formateurs(){
    const [ nom , setNom ] = useState('');
    const [ prenom , setPrenom ] = useState('');
    const [ massHoraire , setMh ] = useState('');
    const [ codeSalle , setSalleF ] = useState('');
    const [salleList ,  setSalleList] = useState([])
    const [formateursList ,  setFormateursList] = useState([])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/codesSalles").then((response)=> {
            setSalleList(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/formateurs").then((response)=> {
            setFormateursList(response.data)
        })
    },[])

    const submitFormateur = () => {
        Axios.post("http://localhost:3001/api/insert/formateur",{
            nom: nom,
            prenom: prenom,
            massHoraire: massHoraire,
            codeSalle: codeSalle
        })
        setFormateursList([...formateursList,{nom: nom,
            prenom: prenom,
            massHoraire: massHoraire,
            codeSalle: codeSalle}])
        
    }

    const deleteFormateur = (idFormateur) => {
        Axios.delete(`http://localhost:3001/api/delete/formateur/${idFormateur}`)
        
        
    }
    
   
   

    return (
        
        <div  className="container-fluid" id="content-add-teacher">
            
            <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4 dashFormateur">
                    <div className="addTeacherFormWrapper wrapper">
                        <h1 className="title">Ajouter un formateur/formatrice</h1>
                        <center><span id="message"></span></center><br/>
                        <form method="POST" id="formateurForm">
                            <div className="form-floating ml-3">
                                <input type="text" className="user-input" id="nomF" name="nomF" required onChange={(e) => {
                                    setNom(e.target.value)
                                }} />
                                <label for="nomF">Nom</label>
                            </div>
                            <div className="form-floating ml-3">
                                <input type="text" className="user-input" id="prenomF" name="prenomF" required onChange={(e) => {
                                    setPrenom(e.target.value)
                                }}/>
                                <label for="prenomF">Prenom</label>
                            </div>
                            <div className="form-floating ml-3">
                                <input type="number" className="user-input" id="masseHoraireF" name="masseHoraireF" required onChange={(e) => {
                                    setMh(e.target.value)
                                }}/>
                                <label for="masseHoraireF">Masse Horaire</label>
                            </div>
                            <div className="select-wrapper">
                                <select className="user-select" aria-label="Default select example" id="salleF" required onChange={(e) => {
                                        setSalleF(e.target.value)
                                    }} >
                                    <option disabled selected>Choisir une salle pour le formateur/la formatrice :</option>
                                    {salleList.map((salle) =>(
                                        <option key={salle.codeSalle} value={salle.codeSalle}> {salle.codeSalle} </option>
                                    ))}
                                
                                </select>
                            </div>
                            <div className="input-group ml-3">
                                <button type="button" className="bouton" name="addTeacher" id="submit" onClick={ submitFormateur }> Ajouter Formateur/Formatrice</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 mainFormateur mt-5">
                    <table className="table table-hover table-dark table-striped">
                        <thead>
                            <tr>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Masse Horaire</td>
                                <td>Salle</td>
                                <td>Supprimer</td>
                                <td>Modifier</td>
                            </tr>
                        </thead>
                        <tbody>
                        {formateursList.map((prof) =>(
                            <tr key={prof.idFormateur}>
                                <td> {prof.nom} </td>
                                <td> {prof.prenom} </td>
                                <td> {prof.massHoraire} </td>
                                <td> {prof.codeSalle} </td>
                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteFormateur(prof.idFormateur)}></i></td>
                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
    
    
}

export default Formateurs;