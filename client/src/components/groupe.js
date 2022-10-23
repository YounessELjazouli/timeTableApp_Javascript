import {useState , useEffect} from "react";
import Axios from "axios";



function Groupes(){

    const [ codeGroupe , setCodeGroupe ] = useState('');
    const [ codeFiliere , setCodeFiliere ] = useState('');
    const [ annee , setAnnee ] = useState('');
    const [filieres ,  setFilieres] = useState([])

    const [groupeList ,  setGroupeList] = useState([])



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            setFilieres(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/groupe").then((response)=> {
            setGroupeList(response.data)
        })
    },[])

    const submitGroupe = () => {
        Axios.post("http://localhost:3001/api/insert/groupe",{
            codeGroupe: codeGroupe,
            codeFiliere: codeFiliere,
            annee:annee
        })
        
        setGroupeList([...groupeList,{codeGroupe: codeGroupe,
            codeFiliere: codeFiliere,
            annee:annee}])
        
    }

    const deleteGroupe = (codeGroupe) => {
        Axios.delete(`http://localhost:3001/api/delete/groupe/${codeGroupe}`)
        
        
    }
    return(
            <div  className="container-fluid" id="content-add-group">
                <div className="row">
                    <div className="col-sm-4 dashGroupe">
                        <div className="addTeacherFormWrapper wrapper">
                            <div className="title">Ajouter groupe</div>
                            <span id="message"></span>
                            <form method="POST" id="groupeForm">
                                <div className="form-floating my-3">
                                    <input type="text" className="user-input" id="codeGr" name="codeGr" onChange={(e) => {
                                    setCodeGroupe(e.target.value)
                                }}/>
                                    <label for="codeGr">Code de Groupe</label>
                                </div>
                                <div className="select-wrapper">
                                    <select name="filiereGr" id="filiereGr" className="user-select" onChange={(e) => {
                                        setCodeFiliere(e.target.value)
                                    }}>
                                        <option disabled selected>Choisir un Filiere : </option>
                                        {filieres.map((fil) =>(
                                            <option key={fil.codeFiliere} value={fil.codeFiliere}> {fil.nomFiliere} </option>
                                        ))}
                                        
                                    </select>
                                    <select name="anneeGr" id="anneeGr" className="user-select" onChange={(e) => {
                                        setAnnee(e.target.value)
                                    }}>
                                        <option disabled selected>Choisir L'année de formation  : </option>
                                        <option value="1A">1ére Année</option>
                                        <option value="2A">2éme Année</option>
                                    </select>
                                </div>
                                
                                <div className="input-group my-3">
                                    <button type="button" className="bouton" id="submit" name="ajouterGroupe"  onClick={submitGroupe}>Ajouter Groupe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-8 mainGroup">
                        <div id="groupeList"  className="my-5">
                            <table className="table table-hover table-dark table-striped">
                                <thead>
                                    <tr>
                                        <td>code Groupe</td>
                                        <td> Filiere</td>
                                        <td>Année de formation</td>
                                        <td>Supprimer</td>
                                        <td>Modifier</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {groupeList.map((groupe) =>(
                                    <tr key={groupe.codeGroupe}>
                                        <td> {groupe.codeGroupe} </td>
                                        <td> {groupe.codeFiliere} </td>
                                        <td> {groupe.annee} </td>
                                        <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteGroupe(groupe.codeGroupe)}></i></td>
                                        <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
   
    )
    
}

export default Groupes;