import {useState , useEffect} from "react";
import Axios from "axios";

function  Modules(){

    const [ codeModule , setCodeModule ] = useState('');
    const [ titreModule , setTitreModule ] = useState('');
    const [ masseHoraire , setMasseHoraire ] = useState('');
    const [ codeFiliere , setCodeFiliere] = useState('');
    const [ codeGroupe , setCodeGroupe] = useState('');
    const [filieres ,  SetFilieres] = useState([])
    const [groupes ,  setGroupes] = useState([])
    const [modulesList ,  setModulesList] = useState([])
    const [FiliereChoisis,setFiliereChoisis] = useState("")



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            SetFilieres(response.data)
        })
    },[])

    

  

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/select/groupe`).then((response)=> {
            setGroupes(response.data)
        })
    })

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/select/module`).then((response)=> {
            setModulesList(response.data)
        })
    },[])


    const getModules  = () => {
        
        Axios.get(`http://localhost:3001/api/select/module/${FiliereChoisis}`).then((response)=> {
            setModulesList(response.data)
        })
        document.getElementById('clearFilter').style.display = "inline";


        
    }
    const getAllModules = () => {
        Axios.get(`http://localhost:3001/api/select/module`).then((response)=> {
            setModulesList(response.data)
        })
        document.getElementById('clearFilter').style.display = "none";
    }


    const submitModule = () => {
        Axios.post("http://localhost:3001/api/insert/module",{
            codeModule: codeModule,
            titreModule: titreModule,
            masseHoraire: masseHoraire,
            codeFiliere:codeFiliere,
            codeGroupe:codeGroupe
        })
        setModulesList([...modulesList,{codeModule: codeModule,
            titreModule: titreModule,
            masseHoraire: masseHoraire,
            codeFiliere:codeFiliere,
            codeGroupe:codeGroupe}])
        
    }



    const deleteModule = (codeModule) => {
        Axios.delete(`http://localhost:3001/api/delete/formateur/${codeModule}`)
        
        
    }
    return(
            <div  className="container-fluid" id="content-add-module">
                <div className="row">
                    <div className="col-sm-4 dashModule">

                        <div className="addTeacherFormWrapper wrapper">
                            <h1 className="title">Ajouter Module</h1>
                            <span id="message"></span>
                            <form method="POST" id="moduleForm">
                                <div className="form-floating my-3">
                                    <input type="text" className="user-input"  onChange = {(e) => {
                                    setCodeModule(e.target.value)
                                }}/>
                                    <label for="nomF">Code de Module</label>
                                </div>
                                <div className="form-floating my-3">
                                    <input type="text" className="user-input" id="titreM" name="titreM" onChange = {(e) => {
                                    setTitreModule(e.target.value)
                                }}/>
                                    <label for="prenomF">Intitulé de Module</label>
                                </div>
                                <div className="form-floating my-3">
                                    <input type="number" className="user-input" id="masseHoraireM" name="masseHoraireM" onChange= {(e) => {
                                    setMasseHoraire(e.target.value)
                                }}/>
                                    <label for="masseHoraireF">Masse Horaire de Module</label>
                                </div>
                                <div className="select-wrapper">
                                    <select className=" my-3"  aria-label="Default select example" id="filiereM" onChange = {(e) => {
                                        setCodeFiliere(e.target.value)
                                        document.getElementById('groupeM').innerHTML = "";
                                        const FiltredGroupes =groupes.filter((groupe) => {
                                            return groupe.codeFiliere==e.target.value }
                                        )
                                        
                                        
                                        {FiltredGroupes.map((g) =>(
                                            document.getElementById('groupeM').innerHTML +=
                                            `<option key=${g.codeGroupe} value=${g.codeGroupe}> ${g.codeGroupe} </option>`
                                        ))}

                                        
                                        }}>
                                        <option disabled>Choisir le/les filiére de ce Module :</option>
                                        {filieres.map((fil) =>(
                                            <option key={fil.codeFiliere} value={fil.codeFiliere}> {fil.nomFiliere} </option>
                                        ))}
                                    
                                    </select>
                                    <select className="w-100 my-3"  aria-label="Default select example" id="groupeM"  multiple width="30px" size={4} onChange = {(e) => {
                                        setCodeGroupe(e.target.value)
                                    }}>
                                        <option disabled>Choisir le/les groupe de ce Module :</option>
                                        
                                    
                                    </select>
                                </div>
                                
                                <div className="input-group my-3">
                                    <button type="button" className="bouton" name="addTeacher" id="submit" onClick={submitModule}> Ajouter ce Module</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-8 mainModule mt-5">
                        <form  method="POST" id="getModuleForm">
                            <div className="select-wrapper">
                                <select className="user-select" aria-label="Default select example" name="getfiliereM" id="filieres" 
                                onChange = {(e) => {
                                    setFiliereChoisis(e.target.value)
                                }}>
                                    <option disabled Selected>choisir les semaines durant lesquelles ce cours aura lieu :</option>
                                    {filieres.map((fil)=>(
                                        <option key={fil.codeFiliere} value={fil.codeFiliere}>{fil.nomFiliere}</option>
                                    ))}
                                    
                                
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <button type="button" className="bouton" id="submit1" name="voirModule" onClick={getModules}>Filter</button>
                                <button type="button" className="bouton" id="clearFilter" name="voirModule" onClick={getAllModules}>clear Filter</button>
                            </div>
                        </form>
                        <table className="table table-hover table-dark table-striped">
                                <thead>
                                    <tr>
                                        <td>code Module</td>
                                        <td> Intitulé</td>
                                        <td>Masse Horaire</td>
                                        <td>Supprimer</td>
                                        <td>Modifier</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {modulesList.map((module) =>(
                                    <tr key={module.codeModule}>
                                        <td> {module.codeModule} </td>
                                        <td> {module.titreModule} </td>
                                        <td> {module.masseHoraire} </td>
                                        <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteModule(module.codeModule)}></i></td>
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

export default Modules;