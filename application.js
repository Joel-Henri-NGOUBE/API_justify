// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

const mysql = require("mysql")

// Importation de la fonction de justification
const justify = require("./justification.js")

// Importation de l'établisseu de connxion avec la base de données
const connection = require("express-myconnection")

const connectOptions = {
    host : "localhost",
    user : "root",
    password : "",
    port : 3306,
    database : "justify"
}

// Importation du générateur d'ID
const uuid = require("uuid")

const app = express()

// Middleware pour la connexion à la base de données
app.use(connection(mysql,connectOptions,"pool"))

// Transformer le corps de la requête en json
app.use(express.json())

// Encoder l'url
app.use(express.urlencoded())


// Middleware pour permettre l'utilisation de fichiers 
app.use('/public', express.static(__dirname + '/public'))
// app.use(express.static('public'))

// Définition des chemins de d'authentification 

// Route de test de l'API
app.get("/home",(req,res) => {
    res.sendFile("./Test/authenticate.html", { root: __dirname})
})

// Définition des routes de l'API
app.post("/api/justify/:token", (req, res) => {
    // Etablissement de la connexion à la base de données
    req.getConnection((error,connection) => {
        if(error){
            console.log(error)
        }
        else{
        // Requête de récupération de l'utilisateur associé au token généré
        connection.query("SELECT * FROM users WHERE token = ?", [req.params.token], (error,result) => {
            
            if(error){
                console.log(error)
            }
            else{

                if(result.length !== 0){

                    let a = parseInt(result[0].words) + parseInt(justify(req.body.text)[1])
                    if(a < 80000){
                        connection.query("UPDATE users SET words = ? WHERE token = ?", [a,req.params.token], (error,result) => {
                        if(error){
                            console.log(error)
                        }})
                        res.header("content-type","text/plain").status(200).send(justify(req.body.text)[0])
                    }
                    else{
                        res.status(402).end()
                    }
                }
                else{
                    res.status(404).end()
                }
            }
        })
    }
    })
})

app.post("/api/token", (req, res) => {
    req.getConnection((error,connection) => {

        if(error){
            console.log(error)
        }
        else{

        // Requête pour récupérer les informations liées à l'email entré
        connection.query("SELECT * FROM users WHERE email = ?", [req.body.email], (error,result) => {
            if(error){
                console.log(error)
            }
            else{
                if(result.length !== 0){
                    data = '{"email": "'+result[0].email+'","token": "'+result[0].token+'","words": "'+result[0].words+'"}'
                    res.header("content-type","application/json").send(data)
                }
                else{
                        // Génèration du token
                        let token = uuid.v4()
                        // Requête d'insertion d'un nouvel utilisateur
                        connection.query("INSERT INTO users(email,token,words) VALUES(?,?,0)", [req.body.email,token], (error,result) => {
                        if(error){
                            console.log(error)
                        }
                        else{
                            data = '{"email": "'+req.body.email+'","token": "'+token+'","words": "'+0+'"}'
                            res.header("content-type","application/json").send(data)
                        }
                    })
                }
            }
        })
    }
    })
        
            
})

// async () => {
//     await Date.time() === "00:00:00" 
//     "UPDATE users SET words = 0 WHERE "
// }

// Engager l'écoute des requêtes/ réponses faites au serveur
app.listen(2500,() => {
    console.log("Initiation de l'écoute sur le port 2500")
})