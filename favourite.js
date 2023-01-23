const URLallusers = "https://63ca4b894f53a00420202b84.mockapi.io/allusers";

let area = document.querySelector(".nbox");


let gotofav = document.querySelector(".index-fav-btn");
  
    gotofav.addEventListener("click",()=>{
        window.location.href = "favourite.html";
    })
    let gotocart = document.querySelector(".index-cart-btn");
  
    gotocart.addEventListener("click",()=>{
        window.location.href = "cart.html";
    })

let uid = localStorage.getItem("loggedinuseid");
let fav = [];
fetchFav();

function fetchFav(){                               //-----to fetch all fav items of the user---------
  fetch(`${URLallusers}/${uid}`)
  .then((res)=>  { return res.json(); } )
  .then((data)=>{ fav=data.fav; console.log(fav); displayFavItems(data.fav) });
}

let cart = [];
fetchCart();

function fetchCart(){                               //-----to fetch all cart items of the user---------
  fetch(`${URLallusers}/${uid}`)
  .then((res)=>  { return res.json(); } )
  .then((data)=>{ cart=data.cart; console.log(cart); });
}

function displayFavItems(fav){
    area.innerHTML = null;
    fav.forEach((ele) => {
        let card = document.createElement("div");
        card.className = "new-card";
        
        let img = document.createElement("img");
        img.setAttribute("src",`https://${ele.image}`);

        let name = document.createElement("p");
        name.textContent = ele.name;
        name.style.fontSize = "11px"
        let hr = document.createElement("hr");
        let hr1 = document.createElement("hr");

        let price = document.createElement("h4");
        price.textContent = "$ "+ele.price;

        let color = document.createElement("p");
        color.textContent = ele.color;
        color.style.opacity = "70%";

        let deletebtn = document.createElement("button");
        deletebtn.textContent = "REMOVE FROM FAVORITES";
        deletebtn.className = "deletebtn"
        deletebtn.addEventListener("click",()=>{
            deleteItem(ele);
        })
        // let addbtn = document.createElement("button");
        // addbtn.textContent = "MOVE TO CART";
        // addbtn.className = "addbtn"
        // addbtn.addEventListener("click",()=>{
        //     addtoCart(ele);
        // })

        card.append(img,name,hr,price,hr1,color,deletebtn);
        area.append(card);
    });
    
}

function deleteItem(ele){
    let newfav = fav.filter((e,i)=>{
        return e.name!=ele.name;
    });
    console.log(newfav);
    
    alert("Product removed from Favorites");
    findFavUser(newfav);
}

function findFavUser(fav){
    fetch(`${URLallusers}/${uid}`)
    .then((res)=>  { return res.json(); } )
    .then((userdata)=>{ updateFav(userdata, fav) });
}

function updateFav(userdata, favData){                     //-----to PUT cart item data to api----
    let obj = {
      "first-name": `${userdata["first-name"]}`,
      "last-name": `${userdata["last-name"]}`,
      "email": `${userdata["email"]}`,
      "password": `${userdata["password"]}`,
      "gender": `${userdata["gender"]}`,
      "d-o-b": `${userdata["d-o-b"]}`,
      "id": `${userdata["id"]}`,
      "cart": userdata.cart,
      "history": userdata.history,
      "fav": favData
      };
  
      fetch(`${URLallusers}/${uid}`,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      }).then((res)=>{ return res.json(); })
        .then((data)=>{ 
          fetchFav();
        })
  }

  
function addtoCart(ele){
    let flag = false;
    if(cart.length!==0){
      cart.forEach((e)=>{
        if(ele.name == e.item.name){
          flag = true;
        }
      })
    }
    if(flag){
      alert("Item already present in Cart..!");
    }
    else{
      let nobj = {};
      nobj.quantity = 1;
      nobj.item = ele;
      console.log(nobj);
      cart.push(nobj);
      console.log(cart)
      findUser(cart);
    }
  }

  function findUser(cart){
    fetch(`${URLallusers}/${uid}`)
    .then((res)=>  { return res.json(); } )
    .then((userdata)=>{ postToCart(userdata, cart) });
  }

  function postToCart(userdata, cartData){                     //-----to PUT cart item data to api----
    // let mobj = {};
    // mobj.quantity = 1;
    let obj = {
      "first-name": `${userdata["first-name"]}`,
      "last-name": `${userdata["last-name"]}`,
      "email": `${userdata["email"]}`,
      "password": `${userdata["password"]}`,
      "gender": `${userdata["gender"]}`,
      "d-o-b": `${userdata["d-o-b"]}`,
      "id": `${userdata["id"]}`,
      "cart": cartData,
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
          alert("Product Added to Cart");
          fetchCart();
         })
  }