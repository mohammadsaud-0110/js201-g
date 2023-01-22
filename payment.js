let form1 = document.getElementById("form");
let form2 = document.getElementById("form2");
let btn1 = document.getElementById("btn");
let btn2 = document.getElementById("btn2");
let div1 = document.querySelector(".addDiv");
let div2 = document.querySelector(".cardDiv");
let Buy = document.getElementById("buy");
let userMail = document.getElementById("userMail");
let userName = document.getElementById("userName");
let selectCountry = document.getElementById("country");
let country = document.getElementById("rink");

userName.innerText = localStorage.getItem("loggedinuser");
userMail.innerText = localStorage.getItem("loggedinusermail");

div2.style.display = "none";
Buy.style.display = "none";

form1.addEventListener("submit", (e) => {
    e.preventDefault();
    form1.style.display = "none";
    div2.style.display = "";
    let img = document.createElement("img");
    img.setAttribute(
        "src",
        "https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
    );
    img.style.width = "30px";
    div1.append(img);
});

form2.addEventListener("submit", (e) => {
    e.preventDefault();
    form2.style.display = "none";
    Buy.style.display = "";
    let img = document.createElement("img");
    img.setAttribute(
        "src",
        "https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
    );
    img.style.width = "30px";
    div2.append(img);
});

Buy.addEventListener("click", () => {
    swal("Congratulations...🎉", "ordered placed successfully", "success");
    setTimeout(() => {
        window.location = "feedback.html"; //feedback page...
    }, 1000);
});

selectCountry.addEventListener("change", () => {
    country.textContent = selectCountry.value;
});
