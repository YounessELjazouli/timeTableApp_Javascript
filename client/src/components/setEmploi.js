import {useState , useEffect} from "react";
import Axios from "axios";

export default function SetEmlploi (){
    const [groupeList ,  setGroupeList] = useState([])
    const [coursList ,  setCoursList] = useState([])
    const [ groupeChoisis , setGroupeChoisis ] = useState("")


    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/groupe").then((response)=> {
            setGroupeList(response.data)
        })
    })
    const getEmploi = () => {
        
        Axios.get(`http://localhost:3001/api/select/cours/${groupeChoisis}`).then((response)=> {
            setCoursList(response.data)
            spreadTimeTable("l1","lundi",1)
            spreadTimeTable("l2","lundi",2)
            spreadTimeTable("l3","lundi",3)
            spreadTimeTable("l4","lundi",4)

            spreadTimeTable("m1","mardi",1)
            spreadTimeTable("m2","mardi",2)
            spreadTimeTable("m3","mardi",3)
            spreadTimeTable("m4","mardi",4)


            spreadTimeTable("me1","mercredi",1)
            spreadTimeTable("me2","mercredi",2)
            spreadTimeTable("me3","mercredi",3)
            spreadTimeTable("me4","mercredi",4)

            spreadTimeTable("j1","jeudi",1)
            spreadTimeTable("j2","jeudi",2)
            spreadTimeTable("j3","jeudi",3)
            spreadTimeTable("j4","jeudi",4)


            spreadTimeTable("v1","vendredi",1)
            spreadTimeTable("v2","vendredi",2)
            spreadTimeTable("v3","vendredi",3)
            spreadTimeTable("v4","vendredi",4)

            spreadTimeTable("s1","samedi",1)
            spreadTimeTable("s2","samedi",2)
            spreadTimeTable("s3","samedi",3)
            spreadTimeTable("s4","samedi",4)
        })
    }

    const spreadTimeTable = (a,j,p) => {
        coursList.forEach(element => {
            if(element.periods == p && element.jours == j){
                document.getElementById(a).innerHTML = `<h2>${element.nom} ${element.prenom}</h2><h3>${element.titreModule}</h3><h4>${element.codeSalle}</h4>`
            }
        });

    }




    return(
        <div className="container">
            <div className="row justify-content-center">
                <form>
                    <select onChange = {(e) => { setGroupeChoisis(e.target.value)}}>
                    {groupeList.map((g) =>(
                        <option key={g.codeGroupe} value={g.codeGroupe}> {g.codeGroupe} </option>
                    ))}
                    </select>
                    <input type="button" class="fa-solid fa-sort" value="filter" onClick = { getEmploi }/>
                </form>
            </div>
            <div className="row justify-content-center">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>  </th>
                            <th> <span className="start">08:30</span> <span className="end">10:50</span>  </th>
                            <th> <span className="start">11:10</span> <span className="end">13:15</span>  </th>
                            <th> <span className="start">13:30</span> <span className="end">15:50</span>  </th>
                            <th> <span className="start">16:10</span> <span className="end">18:30</span>  </th>
                        </tr>
                    </thead>

                        <tbody>
                        <tr>
                            <td>Lundi</td>
                            <td id="l1"></td>
                            <td id="l2"></td>
                            <td id="l3"></td>
                            <td id="l4"></td>
                        </tr>
                        <tr>
                            <td>Mardi</td>
                            <td id="m1"></td>
                            <td id="m2"></td>
                            <td id="m3"></td>
                            <td id="m4"></td>
                        </tr>
                        <tr>
                            <td>Mercredi</td>
                            <td id="me1"></td>
                            <td id="me2"></td>
                            <td id="me3"></td>
                            <td id="me4"></td>
                        </tr>
                        <tr>
                            <td>Jeudi</td>
                            <td id="j1"></td>
                            <td id="j2"></td>
                            <td id="j3"></td>
                            <td id="j4"></td>
                        </tr>
                        <tr>
                            <td>Vendredi</td>
                            <td id="v1"></td>
                            <td id="v2"></td>
                            <td id="v3"></td>
                            <td id="v4"></td>
                        </tr>
                        <tr>
                            <td>Samedi</td>
                            <td id="s1"></td>
                            <td id="s2"></td>
                            <td id="s3"></td>
                            <td id="s4"></td>
                        </tr>
                        </tbody>
      
                </table>
            </div>
        </div>
    )
}