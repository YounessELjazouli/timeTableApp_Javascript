

const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();

const sqlite3 = require('sqlite3').verbose();
const cnx = new sqlite3.Database('bd/emploi.db');

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())





app.get('/api/select/codesSalles',(req,res) => {

    cnx.all("SELECT codeSalle from salle", (err, row) => {
        res.send(row)
    })
})









app.get('/api/select/formateurs',(req,res) => {

    cnx.all("SELECT * from formateur", (err, row) => {
        res.send(row)
    })
})


app.post('/api/insert/formateur',(req,res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const mh = req.body.massHoraire
    const salleF = req.body.codeSalle

    const stmt = cnx.prepare("INSERT INTO formateur (nom,prenom,massHoraire,codeSalle) VALUES (?,?,?,?)");
    stmt.run([nom,prenom,mh,salleF])
})

app.delete('/api/delete/formateur/:idFormateur',(req,res)=>{
    const formateur = req.params.idFormateur
    const stmt = cnx.prepare("DELETE FROM formateur where idFormateur = ?");
    stmt.run([formateur])
})









app.get('/api/select/filiere',(req,res) => {

    cnx.all("SELECT * from filiere", (err, row) => {
        res.send(row)
    })
})

app.post('/api/insert/filiere',(req,res) => {
    const codeFiliere = req.body.codeFiliere
    const nomFiliere = req.body.nomFiliere
    console.log(code);
    const stmt = cnx.prepare("INSERT INTO filiere VALUES (?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeFiliere,nomFiliere])

})

app.delete('/api/delete/filiere/:codeFiliere',(req,res)=>{
    const filiere = req.params.codeFiliere
    const stmt = cnx.prepare("DELETE FROM filiere where codeFiliere = ?");
    stmt.run([filiere])
})





app.get('/api/select/groupe',(req,res) => {

    cnx.all("SELECT * from groupe", (err, row) => {
        res.send(row)
    })
})


app.post('/api/insert/groupe',(req,res) => {
    const codeGroupe = req.body.codeGroupe
    const codeFiliere = req.body.codeFiliere
    const annee = req.body.annee
    const stmt = cnx.prepare("INSERT INTO groupe VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeGroupe,codeFiliere,annee])

})

app.delete('/api/delete/groupe/:codeGroupe',(req,res)=>{
    const groupe = req.params.codeGroupe
    const stmt = cnx.prepare("DELETE FROM groupe where codeGroupe = ?");
    stmt.run([groupe])
})



app.post('/api/insert/module',(req,res) => {
    const codeModule = req.body.codeModule
    const titreModule = req.body.titreModule
    const masseHoraire = req.body.masseHoraire
    const codeFiliere = req.body.codeFiliere
    const codeGroupe = req.body.codeGroupe
    console.log(codeModule+" "+titreModule+" "+masseHoraire)

    const stmt = cnx.prepare("INSERT INTO module VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeModule,titreModule,masseHoraire])

    const stmt2 = cnx.prepare("INSERT INTO groupe_module_filiere VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt2.run([codeGroupe,codeModule,codeFiliere])
})

app.get('/api/select/module/',(req,res) => {

    cnx.all("SELECT * from module ",(err, row) => {
        res.send(row)
    })
})

app.get('/api/select/module/:FiliereChoisis',(req,res) => {
    const FiliereChoisis = req.params.FiliereChoisis
    console.log(FiliereChoisis);
    cnx.all("SELECT * from module M inner join groupe_module_filiere GM ON M.codeModule = GM.codeModule WHERE codeFiliere = ?",[FiliereChoisis] ,(err, row) => {
        console.log(row)
        res.send(row)
    })
})
   
app.get('/api/select/dispoSalle/:list',(req,res) => {
    const chosenDay = req.params.list[0]
    const chosenPeriod = req.params.list[1]
    console.log(chosenDay);
    const sql = "SELECT * from salle WHERE codeSalle NOT IN(SELECT codeSalle FROM cours WHERE jours = ? AND periods = ?"
    cnx.all(sql,[chosenDay,chosenPeriod] ,(err, row) => {
        console.log(row)
        res.send(row)
    })
})



app.post('/api/insert/salle',(req,res) => {
    const codeSalle = req.body.codeSalle
    const typeSalle = req.body.typeSalle


    const stmt = cnx.prepare("INSERT INTO salle VALUES (?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeSalle,typeSalle])

})


app.get('/api/select/infoSalles',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["info"] ,(err, row) => {
        res.send(row)
    })
})


app.get('/api/select/normalSalles',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["normale"] ,(err, row) => {
        res.send(row)
    })
})

app.get('/api/select/atelier',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["atelier"] ,(err, row) => {
        res.send(row)
    })
})

app.delete('/api/delete/salle/:codeSalle',(req,res)=>{
    const codeSalle = req.params.codeSalle
    const stmt = cnx.prepare("DELETE FROM salle where codeSalle = ?");
    stmt.run([codeSalle])
})




 
app.get('/api/select/salleDispo',(req,res) => {

    cnx.all("SELECT * from salle WHERE codeSalle NOT IN(SELECT codeSalle FROM cours )" ,(err, row) => {
        res.send(row)
        console.log(row);
    })
})



app.get('/api/select/cours',(req,res) => {

    cnx.all("  " ,(err, row) => {
        res.send(row)
        console.log(row);
    })
})


app.get('/api/select/cours/:groupeChoisis',(req,res) => {
    const groupeChoisis = req.params.groupeChoisis
    console.log(groupeChoisis);
    cnx.all("SELECT * from cours C INNER JOIN formateur F ON C.idFormateur = F.idFormateur INNER JOIN module M On C.codeModule = M.codeModule WHERE codeGroupe = ?",[groupeChoisis] ,(err, row) => {
        console.log(row)
        res.send(row)
    })
})


app.get("/",(req,res) => {
    res.send('hello word coding in node is not fun')
})

app.listen(3001,() => {
    console.log("runnning ......")
})

