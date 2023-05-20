let users = [
    {id: 1, name: "john", age: "18", profession: "developer"},
    {id: 2, name: "jack", age: "20", profession: "developer"},
    {id: 3, name: "karen", age: "19", profession: "admin"}
];

let currProfession = ["developer", "admin"];

let dataContainer = document.getElementById("data");
users.forEach(user => {
    addUserToUI(user);
});

let filterBtn = document.getElementById('filter');
filterBtn.addEventListener("click", () => {
    let filter = document.getElementById('profession').value;

    if(filter === "none") {
        alert("Please select Correct Profession");
        return;
    }
    applyFilter(filter);
});

function applyFilter(filterValue) {
    
    let allUsercards = document.querySelectorAll(".card");
    allUsercards.forEach(c => {
        c.classList.remove("hide");
    });

    
    if(filterValue != null) {
        let usersToHide = [...allUsercards].filter(c => {
            return c.getAttribute("data-profession") != filterValue; 
        });

       
        usersToHide.forEach(u => {
            u.classList.add("hide")
        });
    }
}

function addUserToUI(user) {
    let div = document.createElement("div");
    div.setAttribute("data-profession", user.profession)
    div.classList.add("card");

    div.innerHTML = `<span>${user.id}.</span>
    <span>Name: ${user.name}</span>
    <span>Profession: ${user.profession}</span>
    <span>Age: ${user.age}</span>`;

    dataContainer.appendChild(div);
}

function isNew(profession) {
    for (let i = 0; i < currProfession.length; i++) {
        if(currProfession[i] === profession) return false;
    }
    return true;
}

let addUserBtn = document.getElementById("add");
add.addEventListener("click", function(e) {
    let name = document.getElementById("name_input").value;
    let profession = document.getElementById("profession_input").value;
    let age = document.getElementById("age_input").value;

    name = name.trim();
    name = name.toLowerCase();
    profession = profession.trim();
    profession = profession.toLowerCase();
    
    if(name == undefined || name == null || profession == undefined || profession == null || age < 19 || age > 66 || age == null || age == undefined) {
        alert("Please Enter Valid Data");
        return;
    }

    let user = {id: users.length+1, name: name, age: age, profession: profession};
    addUserToUI(user);
    users.push(user);

    if(isNew(profession)) {
        currProfession.push(profession);
        
        let newOption = document.createElement("option");
        newOption.value = profession;
        newOption.innerText = profession.charAt(0).toUpperCase() + profession.substring(1);

        document.getElementById("profession").appendChild(newOption);
    }

    applyFilter(null);
    document.getElementById("profession").value = "none";
});


