
// let word = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque corporis aliquid voluptatibus cupiditate id dolores 
// praesentium provident sed. Quae ratione repellendus quisquam explicabo molestiae libero cum neque corrupti ullam laborum quam veniam 
// animi sequi dolorem officiis, temporibus quis praesentium a? Odit debitis soluta possimus sint ut magnam molestias necessitatibus repellendus
// molestiae praesentium. Facilis mollitia aperiam modi maiores a dolorum, nisi voluptates magnam possimus fuga aspernatur velit aut repellat 
// exercitationem numquam repellendus nemo omnis officia explicabo architecto vel odio, quidem delectus illum. Dolores nulla atque quos 
// illo officiis consectetur nam, molestias ipsum exercitationem omnis alias quisquam numquam debitis, amet aliquam qui vero sequi reprehenderit. 
// Enim molestiae nisi ab exercitationem amet, quos odio voluptate ratione quo consequuntur tempore excepturi, veniam fuga? Vitae, doloremque 
// officia? Earum odio, nemo cum ab laudantium qui sint, totam provident sed vitae architecto temporibus? Dolor iusto veniam consequatur qui ab nobis?
// Sint tempora impedit hic illum deleniti ipsa obcaecati, molestias nobis modi error distinctio eveniet vitae libero sapiente porro nulla eius eum? 
// Possimus non sunt sed nemo voluptatem magnam similique, labore eum, accusamus minus reiciendis laborum totam ullam excepturi minima ea ab nisi unde. 
// Libero sed, velit tenetur eius laborum illo incidunt ratione dicta sapiente labore aut. Quae fugiat doloribus ex suscipit assumenda consequatur 
// sint ipsa veniam, accusantium minima voluptates repellat quisquam id amet aperiam esse perspiciatis consequuntur quidem quo cupiditate sequi, 
// sapiente delectus hic. Officiis maiores obcaecati unde harum. Itaque laudantium eum odit explicabo nostrum libero animi iste dolorum?`

// function justify(texte){

let word = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
 Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.`

let text = word.split("\n")
let words = []
text.forEach((element) => {
    words.push(element.split(" "))
});
let line = []
let wordsLength = 0;
let paragraphe = []
words.forEach(element => {
    element.forEach((word) => {
        if(word.length + wordsLength <= 80){
            // console.log(word.length + wordsLength)
            word+=" "
            wordsLength+=word.length
            line.push(word)
        }
        else{
            paragraphe.push(line)
            line = [word+" "]
            wordsLength = word.length + 1
        }
    })
    // console.log(line.join().length)
});
// console.log(text)
console.log(paragraphe)

// console.log("Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,".length)
// console.log("mes  yeux se  fermaient si vite  que je  n’avais pas  le temps  de me  dire: «Je".length)

    // return [justifiedText,words]
// }

// Faire en sorte d'enregistrer le token dans la session après connexion
// Ne pas changer le token et mettre toutes les informations dans la session
// Ne pas donner l'accès sans passer par l'authentification
// Ne pas mettre le token dans l'URL mais dans la session ou dans les cookies
// Pouvoir se déconnecter si on a pas rentré de texte


