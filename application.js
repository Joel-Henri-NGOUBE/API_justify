// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

const app = express()

// Transformer le corps de la requête en json
app.use(express.json())

// Encoder l'url
app.use(express.urlencoded())

// Définir le chemin de l'API
app.get("/api/justify", (req, res) => {
    res.sendFile("./insertion.html", { root: __dirname})
    // res.end()
})

// Définir la route pour le traitement du formulaire
app.post("/api/justify", (req, res) => {
    console.log(req.body)
    res.header("Location",req.url).status(302).end()
})

// Engager l'écoute des requêtes/ réponses faites au serveur
app.listen(2500,() => {
    console.log("Initiation de l'écoute sur le port 2500")
})