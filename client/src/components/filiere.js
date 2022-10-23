import {useState , useEffect} from "react";
import Axios from "axios";


function Filiere(){

    const [ codeFiliere , setCodeFiliere ] = useState('');
    const [ nomFiliere , SetNomFiliere ] = useState('');

    const [filiereList ,  setFiliereList] = useState([])



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            setFiliereList(response.data)
        })
    },[])

    const submitFiliere = () => {
        Axios.post("http://localhost:3001/api/insert/filiere",{
            codeFiliere: codeFiliere,
            nomFiliere: nomFiliere
        })
        
        setFiliereList([...filiereList,{codeFiliere: codeFiliere,
            nomFiliere: nomFiliere}])
        
    }

    const deleteFiliere = (codeFiliere) => {
        Axios.delete(`http://localhost:3001/api/delete/filiere/${codeFiliere}`)
        
        
    }
    return(
        <div  className="container-fluid" id="content-add-filiere">
            <div className="row">
                <div className="col-sm-4 dashFiliere">
                    <div className="addTFiliereFormWrapper wrapper">
                        <h1 className="title">Ajouter Filiére</h1>
                        <span id="message"></span>
                        <form method="POST" id="filiereForm">
                            <div className="form-floating mb-3">
                                <input type="text" className="user-input" id="codeFil" name="codeFil" onChange={(e) => {
                                setCodeFiliere(e.target.value)
                            }}/>
                                <label for="codeFil">Code de Filiere</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="user-input" id="nomFil" name="nomFil" onChange={(e) => {
                                SetNomFiliere(e.target.value)
                            }}/>
                                <label for="nomFil">Nom de Filiere</label>
                            </div>
                            <div className="input-group mb-3">
                                <button type="button" className="bouton" id="submitFiliere" name="ajouterSalle"  onClick={ submitFiliere }>Ajouter Filiére</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-8 mainFiliere mt-5'>
                    <div id="filiereList">
                        
                    <table className="table table-hover table-dark table-striped">
                    <thead>
                        <tr>
                            <td>code filiere</td>
                            <td>intitulé</td>
                            <td>Supprimer</td>
                            <td>Modifier</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filiereList.map((fil) =>(
                        <tr key={fil.codeFiliere}>
                            <td> {fil.codeFiliere} </td>
                            <td> {fil.nomFiliere} </td>
                            
                            <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteFiliere(fil.codeFiliere)}></i></td>
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

export default Filiere;