// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

// Importation du générateur d'ID
const uuid = require("uuid")

const app = express()

// Transformer le corps de la requête en json
app.use(express.json())

// Encoder l'url
app.use(express.urlencoded())

// Définition des chemins de d'authentification 

// Route de l'hôte de l'API (celui qui l'exploite sur un autre port)
app.get("/home",(req,res) => {
    res.sendFile("./authenticate.html", { root: __dirname})
})

// Définition des routes de l'API
// Définir la route pour le traitement du formulaire
app.post("/api/justify/:token", (req, res) => {
    // Effectuer la vérification du nombre de mots utilisés. Si ce nombre de mots est > 80 000
    // renvoyer une erreur 402 (Payment Required)
    "SELECT * FROM users WHERE token = :token avec :token valant req.params.token"
    if("requête if requête.words + text.words < 80 000"){
        console.log(req.body)
        "Faire justify sur req.body.text et le rendre dans le contenu"
        // Traitement de justification
        // res.header("Location",req.url).status(302).send("Texte justifié")
        res.header("content-type","text/plain").status(200).send(req.body.text)
        " else {"
        "res.status(402).end()"
    }
    else{
        "res.status(403).end()"
    }

    // }
})

app.post("/api/token", (req, res) => {
    // Si tu es fini vérifier que l'email est acceptable
            "SELECT * FROM users WHERE email = :email"
            "Oui: renvoyer {email: :email,token: :token, words: :words}" 
            // Traitement de génération ou de récupération de token
            "Non: INSERT INTO users(email,token,words) VALUES(:email,:token,0) renvoyer {email: :email,token: :token, words: 0}"
        console.log(req.body)
        res.header("content-type","application/json").send(req.body)//.cookie("token",token)
})

async () => {
    await Date.time() === "00:00:00" 
    "UPDATE users SET words = 0 WHERE "
}
// Engager l'écoute des requêtes/ réponses faites au serveur
app.listen(2500,() => {
    console.log("Initiation de l'écoute sur le port 2500")
})