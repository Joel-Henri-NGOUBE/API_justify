function justify(word){

// Nombre de mots du texte
numWords = word.split(" ").length

let text = word.split("\n")

let words = []
// Sectionnement de tous les mots du texte
text.forEach((element) => {
    words.push(element.split(" "))
});

// Correspond à une ligne de 80 caractères
let line = []

// Correspond au nombre de mots d'une ligne
let wordsLength = 0;

// Correspond à tous les paragraphes du texte
let paragraphe = []


for(let i = 0;i<words.length;i++){

    for(let j = 0;j<words[i].length;j++){
       
        if(words[i][j].length + wordsLength <= 80 && words[i][j] !== "" && words[i][j] !== " "){
           
            words[i][j]+=" "
            wordsLength+=words[i][j].length
            line.push(words[i][j])

        }
        else{

            line[line.length-1] = line[line.length-1].trim() 
            paragraphe.push(line)
            line = [words[i][j]+" "]
            wordsLength = words[i][j].length + 1

        }
        if(i === words.length - 1 && j === words[i].length - 1){

            line[line.length-1] = line[line.length-1].trim() 
            paragraphe.push(line)
            line = [words[i][j]+" "]
            wordsLength = words[i][j].length + 1

        }
    }
}

let finalLine = []

paragraphe.forEach(element => {
    
    if(element.join("").length === 80){
        finalLine.push(element.join(""))
    }
    else{

        do{
            let num = Math.ceil(((element.length - 1) * Math.random())) 
            element[num] = " " + element[num]
        }while(element.join("").length < 80)

        finalLine.push(element.join(""))
        
    }
});


for(let i = 0;i<finalLine.length;i++){

    if(finalLine[i].trim()){

        finalLine[i] = finalLine[i].trim()

    }
    else{
        finalLine[i] = ""
    }
}
    return [finalLine.join("\n"),numWords]
}

module.exports = justify

// let word = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

// Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
//  Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.`

// let texte = justify(word)
// console.log(texte[0])

