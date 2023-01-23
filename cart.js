const URLallusers = "https://63ca4b894f53a00420202b84.mockapi.io/allusers";

let area = document.querySelector(".new-left-child2");
let viewsubtotoal1 = document.querySelector(".new-sub-total1");
let viewsubtotoal2 = document.querySelector(".new-sub-total2");
let viewtotoalquantity = document.querySelector(".new-total-quantity");


let gotofav = document.querySelector(".index-fav-btn");
  
    gotofav.addEventListener("click",()=>{
        window.location.href = "favourite.html";
    })
    let gotocart = document.querySelector(".index-cart-btn");
  
    gotocart.addEventListener("click",()=>{
        window.location.href = "cart.html";
    })

let uid = localStorage.getItem("loggedinuseid");
let cart = [];
fetchCart();

function fetchCart(){                               //-----to fetch all cart items of the user---------
  fetch(`${URLallusers}/${uid}`)
  .then((res)=>  { return res.json(); } )
  .then((data)=>{ cart=data.cart; console.log(cart); displayCartItems(data.cart) });
}

function displayCartItems(cart){
    area.innerHTML = null;
    cart.forEach((ele) => {
        let card = document.createElement("div");
        card.className = "new-card";
        
        let img = document.createElement("img");
        img.setAttribute("src",`https://${ele.item.image}`);

        let cardchild = document.createElement("div");
        cardchild.style.display = "flex";
        cardchild.style.flexDirection = "column";
        let price = document.createElement("h4");
        price.textContent = "$ "+ele.item.price;
        let name = document.createElement("p");
        name.textContent = ele.item.name;
        let color = document.createElement("p");
        color.textContent = ele.item.color;

        let cardchild1 = document.createElement("div");
        cardchild1.style.display = "flex";
        let minusbtn = document.createElement("button");
        minusbtn.textContent = "-";
        minusbtn.addEventListener("click",()=>{
            minusQ(ele);
        });
        let quantity = document.createElement("p");
        quantity.textContent = ele.quantity;
        let plusbtn = document.createElement("button");
        plusbtn.textContent = "+";
        plusbtn.addEventListener("click",()=>{
            plusQ(ele);
        });

        let deletebtn = document.createElement("button");
        deletebtn.textContent = "X";
        deletebtn.className = "deletebtn"
        deletebtn.addEventListener("click",()=>{
            deleteItem(ele);
        })

        cardchild1.append(minusbtn,quantity,plusbtn);
        cardchild.append(price,name,color,cardchild1);
        card.append(img,cardchild,deletebtn);
        area.append(card);
    });
    // let q = 0;
    let t = 0;
    cart.forEach((ele)=>{
        // q = q +  +(ele.quantity);
        t = t + ((ele.quantity) * +(ele.item.price) );
    })
    t = t.toFixed(2);
    viewtotoalquantity.textContent = cart.length;
    viewsubtotoal1.textContent = "$ "+t;
    viewsubtotoal2.textContent = "$ "+t;
}
function minusQ(ele){
    if(ele.quantity==1){
        deleteItem(ele);
    }
    else{
        // ele.quantity--;
        // console.log(ele);
        cart.forEach((e,i)=>{
            if(ele.item.name == e.item.name){
                e.quantity--;
            }
        })
        findUser(cart);
    }
}
function plusQ(ele){
        // ele.quantity++;
        // console.log(ele);
    cart.forEach((e,i)=>{
        if(ele.item.name == e.item.name){
            e.quantity++;
        }
    })
    findUser(cart);
        
}

function deleteItem(ele){
    let newcart = cart.filter((e,i)=>{
        return ele.item.name!== e.item.name;
    });
    console.log(newcart);
    alert("Product removed from Cart");
    findUser(newcart);
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
          fetchCart();
        })
  }