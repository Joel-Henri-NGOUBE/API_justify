// Importation d'express.js pour faciliter l'implémentation du serveur.
const express = require("express")

const mysql = require("mysql")

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

app.use(connection(mysql,connectOptions,"pool"))

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
    req.getConnection((error,connection) => {
        if(error){
            console.log(error)
        }
        else{
        connection.query("SELECT * FROM users WHERE token = :token", [{":token": req.params.token}], (error,result) => {
            if(error){
                console.log(error)
            }
            else{
                // "SELECT * FROM users WHERE token = :token avec :token valant req.params.token"
                if(result){
                    if(parseInt(result.words) + parseInt(req.body.text.length) < 80000){ /*"if requête.words + text.words < 80 000"*/
                        // console.log(req.body)
                        "Faire justify sur req.body.text et le rendre dans le contenu"
                        // Traitement de justification
                        // res.header("Location",req.url).status(302).send("Texte justifié")
                        res.header("content-type","text/plain").status(200).send(req.body.text)
                    }
                    else{
                        res.status(402).end()
                    }
                }
                else{
                    res.status(403).end()
                }
            }
        })
    }
    })

    // }
})

app.post("/api/token", (req, res) => {
            req.getConnection((error,connection) => {
                if(error){
                    console.log(error)
                }
                else{
                connection.query("SELECT * FROM users WHERE email = :email", [{"email": req.params.email}], (error,result) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        // "SELECT * FROM users WHERE token = :token avec :token valant req.params.token"
                        if(result){
                            data = {
                                email: result.email,
                                token: result.token,
                                words: result.words,
                            }
                            console.log(data)
                            data = JSON.stringify(data)
                            res.header("content-type","application/json").send(req.body)
                        }
                        else{
                            let continuing = true
                            do{
                                let token = uuid.v4()
                                continuing = connection.query("SELECT * FROM users WHERE token = :token", [{"token": token}], (error,result) => {
                                if(result){
                                    return true
                                }
                                else{
                                    return false
                                }
                                })
                            }while(continuing)
                            connection.query("INSERT INTO users(email,token,words) VALUES(:email,:token,0)", [{"email": req.params.email, "token": token}], (error,result) => {
                                data = {
                                    email: req.body.email,
                                    token: token,
                                    words: 0,
                                }
                                console.log(data)
                                data = JSON.stringify(data)
                                res.header("content-type","application/json").send(req.body)
                            })
                            res.status(403).end()
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