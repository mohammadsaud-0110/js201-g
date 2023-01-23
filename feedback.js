// let form = document.querySelector("form")

//       form.addEventListener("submit",(e)=>{
//         e.preventDefault();
//         swal("Feedback Recorded Successfully...!", "☺️...Thank You...☺️", "success");
//         setTimeout(() => {
//             window.location = "index.html";
//         }, 2500);
//       })

const URLallusers = "https://63ca4b894f53a00420202b84.mockapi.io/allusers";

let uid = localStorage.getItem("loggedinuseid");
let cart = [];
fetchCart();

function fetchCart(){                               //-----to fetch all cart items of the user---------
  fetch(`${URLallusers}/${uid}`)
  .then((res)=>  { return res.json(); } )
  .then((data)=>{ cart=data.cart; findUser(cart); });
}

function findUser(cart){
    fetch(`${URLallusers}/${uid}`)
    .then((res)=>  { return res.json(); } )
    .then((userdata)=>{ updateCart(userdata, cart) });
}


function updateCart(userdata, cartData){                     //-----to PUT cart item data to api----
    let obj = {
      "first-name": `${userdata["first-name"]}`,
      "last-name": `${userdata["last-name"]}`,
      "email": `${userdata["email"]}`,
      "password": `${userdata["password"]}`,
      "gender": `${userdata["gender"]}`,
      "d-o-b": `${userdata["d-o-b"]}`,
      "id": `${userdata["id"]}`,
      "cart": [],
      "history": userdata.history,
      "fav": userdata.fav
      };
  
      fetch(`${URLallusers}/${uid}`,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      }).then((res)=>{ return res.json(); })
        .then((data)=>{ 
        //   fetchCart();
        })
  }