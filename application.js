// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

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
            // Génération de token
            // Redirection vers la page d'insertion
            res.header("Location","/insert").status(302).end()
        }
        console.log("Connectez-vous")
        res.header("Location","/").status(302).end()
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