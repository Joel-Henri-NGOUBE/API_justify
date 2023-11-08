document.querySelector("input[type=submit]").addEventListener("click", (e) => {
    e.preventDefault()
    email = document.querySelector("input[type=text]").value
    fetch("/api/token",{
        method: "POST",
        // mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email})
        // body: JSON.stringify(`{"email": "${email}"}`)
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.length !== 0){
            document.querySelector("form").remove()
            // fetch("api/justify")
            createForm()
            document.querySelector("input[type=submit]").addEventListener("click", (e) => {
                e.preventDefault()
                text = document.querySelector("textarea").value
                fetch(`/api/justify/${result.token}`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({text: text})
                })
                .then((response) => response.text())
                .then((response) => {
                    document.querySelector("form").remove()
                    h3 = document.createElement("h3")
                    h3Text = document.createTextNode('Le rendu est meilleur dans "Preview" dans sur le "Network" de la console.')
                    h3.appendChild(h3Text)
                    p = document.createElement("p")
                    texte = document.createTextNode(response)
                    console.log(response)
                    p.appendChild(texte)
                    document.querySelector("body").appendChild(h3)
                    document.querySelector("body").appendChild(p)
                })
                // .then((result) => {
                //     if(result.length !== 0){
                //         // fetch("api/justify")
                //     }
                // })
            })
        }
    })
})

function createForm(){
    form = document.createElement("form")
    textArea = document.createElement("textarea")
    textArea.setAttribute("cols",30)
    textArea.setAttribute("rows",15)
    form.appendChild(textArea)
    inputSubmit = document.createElement("input")
    inputSubmit.setAttribute("type","submit")
    inputSubmit.setAttribute("value","Send")
    inputSubmit.setAttribute("class","submit")
    form.appendChild(inputSubmit)
    document.querySelector("body").appendChild(form)
}   