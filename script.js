document.querySelector("input[type=submit]").addEventListener("click", () => {
    email = document.querySelector("input[type=text]").value
    fetch("/api/token",{
        method: "POST",
        body: `{"email": "${email}"}`
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.length !== 0){
            // fetch("api/justify")
        }
    })
})