document.querySelector("input[type=submit]").addEventListener("click", () => {
    email = document.querySelector("input[type=text]").value
    fetch("/api/token",{
        method: "POST",
        data: `{"email": "${email}"}`
    })
})