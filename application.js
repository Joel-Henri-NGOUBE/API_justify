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


// let word = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

// Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
//  Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.`

// let texte = justify(word)
// console.log(texte[0])



// Importation du générateur d'ID
const uuid = require("uuid")

const app = express()

app.use(connection(mysql,connectOptions,"pool"))

// Transformer le corps de la requête en json
app.use(express.json())

// Encoder l'url
app.use(express.urlencoded())


app.use('/public', express.static(__dirname + '/public'))
// app.use(express.static('public'))

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
        connection.query("SELECT * FROM users WHERE token = ?", [req.params.token], (error,result) => {
            if(error){
                console.log(error)
            }
            else{
                // "SELECT * FROM users WHERE token = :token avec :token valant req.params.token"
                if(result.length !== 0){
                    let a = parseInt(result[0].words) + parseInt(justify(req.body.text)[1])
                    if(a < 80000){ /*"if requête.words + text.words < 80 000"*/
                        connection.query("UPDATE users SET words = ? WHERE token = ?", [a,req.params.token], (error,result) => {
                        if(error){
                            console.log(error)
                        }})
                        // console.log(req.body)
                        // "Faire justify sur req.body.text et le rendre dans le contenu"
                        // Traitement de justification
                        // res.header("Location",req.url).status(302).send("Texte justifié")
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

    // }
})

app.post("/api/token", (req, res) => {
            req.getConnection((error,connection) => {
                if(error){
                    console.log(error)
                }
                else{
                connection.query("SELECT * FROM users WHERE email = ?", [req.body.email], (error,result) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(req.body)
                        // "SELECT * FROM users WHERE token = :token avec :token valant req.params.token"
                        if(result.length !== 0){
                        // console.log(result[0].email)
                            data = '{"email": "'+result[0].email+'","token": "'+result[0].token+'","words": "'+result[0].words+'"}'
                            console.log(data)
                            res.header("content-type","application/json").send(data)
                        }
                        else{
                            // let continuing = true
                            // do{
                                let token = uuid.v4()
                            //     connection.query("SELECT * FROM users WHERE token = ?", [token], (error,result,continuing) => {
                            //     console.log(continuing)
                            //     if(result.length !== 0){
                            //         continuing = true
                            //     }
                            //     else{
                            //         continuing = false
                            //     }
                            //     })
                            // }while(continuing)
                            connection.query("INSERT INTO users(email,token,words) VALUES(?,?,0)", [req.body.email,token], (error,result) => {
                                if(error){
                                    console.log(error)
                                }
                                else{
                                    data = '{"email": "'+req.body.email+'","token": "'+token+'","words": "'+0+'"}'
                                    res.header("content-type","application/json").send(data)
                                }
                            })
                            // res.status(403).end()
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

// app.use(express.static('public'))

// Engager l'écoute des requêtes/ réponses faites au serveur
app.listen(2500,() => {
    console.log("Initiation de l'écoute sur le port 2500")
})