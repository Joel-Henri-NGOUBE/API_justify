// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

// Importation du générateur d'ID
const uuid = require("uuid")

// Importation du gestionnaire de fichiers
const fs = require("fs")

const app = express()

// Transformer le corps de la requête en json
app.use(express.json())

// Encoder l'url
app.use(express.urlencoded())

// Définition des chemins de d'authentification 

app.get("/",(req,res) => {
    res.sendFile("./authenticate.html", { root: __dirname})
})

app.post("/", (req, res) => {
    if(req.body.email){
        if(fs.existsSync("./database.json")){
            // Lecture deu fichier de base de données
            fs.readFile("./database.json",(error,data) => {
                // Conversion des données en objets manipulables par JavaScript
                data = JSON.parse(data)
                if(error){
                    console.log(error)
                }
                else{
                    let i = 0
                    data.forEach((user) => {
                        if(user.email === req.body.email){
                            i++
                        }
                    })
                    // Si un adresse mail en base correspond à celle entrée, faire une modification du token
                    if(i){
                    data.forEach((user) => {
                        if(user.email === req.body.email){
                            user.token = uuid.v4()
                        }
                    })
                    }
                    // Sinon, ajouter un nouvel utilisateur à la base de données
                    else{
                        // Génération d'un token associé à un identifiant d'utilisateur
                        let newData = {
                            "email" : req.body.email,
                            "token" : uuid.v4(),
                            "words" : 0
                        }
                        data.push(newData)
                        console.log(data)
                    }
                    // Convertion en chaîne de caractères le contenu du fichier et l'insérer dans la base de données
                    fs.writeFile("./database.json", JSON.stringify(data), (error) => {
                        console.log(error)
                    })
                }
            })
        }
        
        // Redirection vers la page d'insertion
        res.header("Location","/insert").status(302)
        res.end()
    }
    else{
        // else
        console.log("Connectez-vous")
        res.header("Location","/").status(302)
        res.end()
    }
})


app.get("/insert", (req, res) => {
    res.sendFile("./insertion.html", { root: __dirname})
    // res.end()
})

// Définition des routes de l'API
// Définir la route pour le traitement du formulaire
app.post("/api/:chemin", (req, res) => {
    if(req.params.chemin === "justify"){
        console.log(req.body)
        // Traitement de justification
        // res.header("Location",req.url).status(302).send("Texte justifié")
        res.header("content-type","text/plain").status(200).send(req.body.text)
    }
    if(req.params.chemin === "token"){
        console.log(req.body)
        // Traitement de justification
        // res.header("Location",req.url).status(302).send("Texte justifié")
        res.header("content-type","application/json").status(200).send(req.body)
    }
})


// Engager l'écoute des requêtes/ réponses faites au serveur
app.listen(2500,() => {
    console.log("Initiation de l'écoute sur le port 2500")
})