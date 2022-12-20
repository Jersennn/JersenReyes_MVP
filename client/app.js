//make global variables
const allSaiyan = document.querySelector(".all");
const allBtn = document.querySelector(".allBtn");
const create = document.querySelector(".createSaiyan");
const deleter = document.querySelector(".delete");

allBtn.addEventListener("click", () => {
    allSaiyan.innerText = "";
    fetch("/saiyan")
    .then((res) => res.json())
    .then((saiyans) => {
    for (let saiyan of saiyans) {
    const div = document.createElement("div");
    div.textContent = `${saiyan.username}: ${saiyan.power_level}`;
    allSaiyan.append(div);
    console.log(saiyan);
    }
   })
});

create.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newSaiyan = { username: data.get("username"), power_level: Number(data.get("power_level")) };
    console.log(newSaiyan);
    fetch("/saiyan", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newSaiyan),
    });
});

deleter.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = new FormData(event.target);
    const erase = { username: result.get("username") };
    console.log(erase.username);
    fetch(`/saiyan/${erase.username}`, {
        method: "DELETE",
    })
})