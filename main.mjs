import category from "./category.mjs";
const body = document.querySelector("body");

function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            document.getElementById("roadAddress").innerText = data.roadAddress;
            detailAddress.style.display = "flex";
            completelocation.style.display = "block";
        }
    }).open();
}

completelocation.onclick=()=>{
    localStorage.setItem('location',roadAddress.innerText +" "+ detailAddress.value);
    currentlocation.innerText = localStorage.getItem('location')
    locationpopup.style.display="none";
    main.style['pointer-events'] = "unset";
    main.style.filter="unset";
    header.style.filter="unset";
}

if (localStorage.getItem('location')) {
    locationpopup.style.display="none"
    currentlocation.innerText = localStorage.getItem('location');
}


searchlocation.onclick=sample4_execDaumPostcode;
categorylist.onclick= (e) => {
    if (!e.target.matches('#categorylist>li')) return;
    const x = document.createElement("ul");
    x.innerHTML = e.target.outerHTML;
    x.setAttribute("class",`selectedcategory ${e.target.id}`);
    x.setAttribute("id",e.target.id);
    for (let i=0 ; i<category[e.target.id].name.length; i++) {
        const a = document.createElement('li');
        a.setAttribute("id",i);
        a.innerHTML=`${category[e.target.id].name[i]}<div> ${category[e.target.id].price[i]} 원</div>`; 
        x.appendChild(a)
    }
    main.innerHTML = '';
    main.appendChild(x);
}


let count = 1;
let cost = 0;
main.onclick= (e) => {
    if (e.target.matches('.selectedcategory>li')) {
        if (localStorage.getItem('user') == null) {
            loginpopup.style.display = "flex";
        } else {
        const popup = document.createElement("div");
        const dishname = document.createElement("div");
        const price = document.createElement("div");
        const pricevalue = document.createElement("div");
        const foodcount = document.createElement("div");
        const increase = document.createElement("input");
        const decrease = document.createElement("input");
        const select = document.createElement("input");
        const close = document.createElement("input");
        close.setAttribute("id","close");
        close.setAttribute("type","button");
        close.setAttribute("value","X");
        dishname.setAttribute("id","foodname");
        popup.setAttribute("id","orderpopup");
        increase.setAttribute("type","button");
        increase.setAttribute("value","+");
        decrease.setAttribute("type","button");
        decrease.setAttribute("value","-");
        select.setAttribute("type","button");
        select.setAttribute("value","장바구니에 담기");
        pricevalue.setAttribute("id","pricevalue");
        foodcount.setAttribute("id","foodcount");
        price.setAttribute("id","price");
        dishname.innerText = e.target.innerHTML.slice(0,e.target.innerHTML.indexOf("<"));
        pricevalue.innerText = category[e.target.parentNode.id].price[e.target.id] + "원";
        cost = category[e.target.parentNode.id].price[e.target.id];
        foodcount.innerText = count + "개";
        price.appendChild(decrease);
        price.appendChild(foodcount);
        price.appendChild(increase);
        popup.appendChild(dishname);
        popup.appendChild(price);
        popup.appendChild(pricevalue);
        popup.appendChild(select);
        popup.appendChild(close);
        body.appendChild(popup);
        }
        eventblock();
        
    }
}

function eventblock() {
    main.style['pointer-events'] = "none"
    header.style['pointer-events'] = "none"
    main.style.filter="blur(10px)";
    header.style.filter="blur(10px)";
    body.style.overflow="hidden";
    header.style['user-select'] = "none"
    main.style['user-select'] = "none"
}

function unblock() {
    main.style['pointer-events'] = "";
    header.style['pointer-events'] = "";
    main.style.filter="";
    header.style.filter="";
    body.style.overflow="";
    header.style['user-select'] = ""
    main.style['user-select'] = ""
}


if(locationpopup.style.display != "none") {
    eventblock();
}

resetlocation.onclick = e => {
    locationpopup.style.display="flex";
    eventblock();
}

for (let i=0 ; i<categorylist.children.length ; i++) {
    const bgurl = categorylist.children[i].id 
    categorylist.children[i].style.backgroundImage = `url(" ${category[bgurl].bg}")`;
}
body.onclick = e => {
    if (e.target.matches('#orderpopup input')) {
        if (e.target.value=="+") {
            foodcount.innerText = ++count + "개";
        } else if (e.target.value=="-") {
            if (count == 1) {
                foodcount.innerText = count + "개";
            } else {
                foodcount.innerText = --count + "개";
            }
    }
    pricevalue.innerText = cost * count + "원";
    }
    if (e.target.matches('#orderpopup input[value="장바구니에 담기"]')) {
        const end = document.createElement("div");
        const endmsg = document.createElement("div")
        const corimg = document.createElement("img");
        let cartstorage = JSON.parse(localStorage.getItem("food"));
        if(cartstorage==null){
            cartstorage = [];
        }
        cartstorage.push({"fdname" : foodname.innerText, "fdcount" : foodcount.innerText,"fdprice":pricevalue.innerText})
        localStorage.setItem("food",JSON.stringify(cartstorage));
        corimg.setAttribute("src","https://image.flaticon.com/icons/png/512/1828/1828643.png");
        corimg.setAttribute("id","orderEnd");
        endmsg.setAttribute("id", "endmsg");
        end.setAttribute("id","end");
        end.innerText = "장바구니에 추가되었습니다."
        main.innerHTML = '';
        endmsg.appendChild(corimg);
        endmsg.appendChild(end);
        main.appendChild(endmsg);
        orderpopup.remove();
        unblock();
        cartlist.innerHTML = "";
        JSON.parse(localStorage.getItem("food")).map(value => {
            const a = document.createElement("li");
            const b = document.createElement("input");
            b.setAttribute("type","button");
            b.setAttribute('class',"deletecart");
            b.setAttribute("value","X");
            a.innerHTML = value.fdname + " / " + value.fdcount + " / " + value.fdprice;
            a.appendChild(b);
            cartlist.appendChild(a);
        });
    }
    if (e.target.matches('#orderpopup input[value="X"]')) {
        orderpopup.remove();
        unblock();
    }
}

loginX.onclick = () => {
    unblock();
    loginpopup.style.display = "none"
    logarea.style.display = "flex"
    regpopup.style.display = "none"
}

login.onclick = () => {
    loginpopup.style.display = "flex"
    if (localStorage.getItem("user") != null) {
        welcometext.innerText = localStorage.getItem("user") + "님 반갑습니다";
        logarea.style.display = "none";
        userwelcome.style.display ="flex";
    } else {
        logarea.style.display = "flex"
    }
    eventblock();
}
regbutton.onclick = e => {
    logarea.style.display = "none"
    regpopup.style.display = "flex"
}

let logininfo = "";
let pwinfo = "";

idinput.onchange = e => {
    let a = e.target.value
    if(!(a.match(/[@]/) && a.match(/\./))) {
        let x = document.createElement("div")
        x.setAttribute("id","iderror");
        x.innerText="올바른 형식의 이메일 주소를 입력하세요."
        x.style.color = "red";
        if (iderrormsg == false) {
            logarea.insertBefore(x,pwinput);
        }
        e.target.style.border = "red 1px solid";
        e.target.value = "";
        iderrormsg=true;
    } else {
        if (iderrormsg) {
            e.target.style.border = 'none'
            iderror.remove();
            iderrormsg = false;
        }
    }
}
let iderrormsg = false;
let pwerrormsg = false;
pwinput.onchange = e => {
    if(!e.target.value.match(/.{8,}/)) {
        let x = document.createElement("div")
        x.setAttribute("id","pwerror");
        x.innerText="비밀번호는 8자리 이상입니다."
        x.style.color = "red";
        if (pwerrormsg == false) {
            logarea.insertBefore(x,loginbutton);
        }
        e.target.style.border = "red 1px solid";
        e.target.value = "";
        pwerrormsg=true;
    } else {
        if (pwerrormsg) {
            e.target.style.border = 'none'
            pwerror.remove();
            pwerrormsg = false;
        }
    }
}

let regiderr = false;
let regpwerr = false;
let regnickerr = false;


loginbutton.onclick = e => {
    if(!iderrormsg && !pwerrormsg && pwinput.value && idinput.value) {
        if(localStorage.getItem(idinput.value)) {
            if(pwinput.value == JSON.parse(localStorage.getItem(idinput.value)).pw) {
                localStorage.setItem("user",JSON.parse(localStorage.getItem(idinput.value)).nick);
                unblock();
                loginpopup.style.display = "none";

            } 
        } else {
            alert("이메일, 비밀번호를 다시 확인해주세요.")
        }
    } else {
        alert("이메일, 비밀번호를 다시 확인해주세요.")
    }
}


idinputReg.onchange = e => {
    let a = e.target.value
    if(!(a.match(/[@]/) && a.match(/\./))) {
        let x = document.createElement("div")
        x.setAttribute("id","regiderror");
        x.innerText="올바른 형식의 이메일 주소를 입력하세요."
        x.style.color = "red";
        if (regiderr == false) {
            regpopup.insertBefore(x,pwinputReg);
        }
        e.target.style.border = "red 1px solid";
        e.target.value = "";
        regiderr=true;
    } else {
        if (regiderr) {
            e.target.style.border = 'none'
            regiderror.remove();
            regiderr = false;
        }
    }
}

pwinputReg.onchange = e => {
    if(!e.target.value.match(/.{8,}/)) {
        let x = document.createElement("div")
        x.setAttribute("id","regpwerror");
        x.innerText="비밀번호는 8자리 이상입니다."
        x.style.color = "red";
        if (regpwerr == false) {
            regpopup.insertBefore(x,nicknameinput);
        }
        e.target.style.border = "red 1px solid";
        e.target.value = "";
        regpwerr=true;
    } else {
        if (regpwerr) {
            e.target.style.border = 'none'
            regpwerror.remove();
            regpwerr = false;
        }
    }
}

nicknameinput.onchange = e => {
    if(!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
        let x = document.createElement("div")
        x.setAttribute("id","nickerror");
        x.innerText="닉네임은 영문, 숫자만 가능합니다."
        x.style.color = "red";
        if (regnickerr == false) {
            regpopup.insertBefore(x,endreg);
        }
        e.target.style.border = "red 1px solid";
        e.target.value = "";
        regnickerr=true;
    } else {
        if (regnickerr) {
            e.target.style.border = 'none'
            nickerror.remove();
            regnickerr = false;
        }
    }
}

endreg.onclick = e => {
    if (!regiderr && !regpwerr && !regnickerr && idinputReg.value &&pwinputReg.value && nicknameinput.value) {
        localStorage.setItem(idinputReg.value,JSON.stringify({"nick" : nicknameinput.value, "pw" : pwinputReg.value}));
        regpopup.style.display = "none";
        logarea.style.display = "flex";
    }
}

logout.onclick = e =>{
    localStorage.removeItem("user");
    loginpopup.style.display="none";
    userwelcome.style.display = "none";
    unblock();
}

cart.onclick = e => {
    cartpopup.style.display="flex";
    ordered.style.display="none";
    if(localStorage.getItem("food")) {
        if(cartlist.innerText == "") {
            JSON.parse(localStorage.getItem("food")).map(value => {
                const a = document.createElement("li");
                const b = document.createElement("input");
                b.setAttribute("type","button");
                b.setAttribute('class',"deletecart");
                b.setAttribute("value","X");
                a.innerHTML = value.fdname + " / " + value.fdcount + " / " + value.fdprice;
                a.appendChild(b);
                cartlist.appendChild(a);
                
            });
        }
        cartempty.style.display="none";
        ordered.style.display="block";
    } 
    if (!localStorage.getItem("food") || JSON.parse(localStorage.getItem("food")).length == 0 ) {
        cartempty.style.display="block";
        ordered.style.display="none";
    }
    eventblock();
}

cartX.onclick = e => {
    cartpopup.style.display="none";
    unblock();
}

cartlist.onclick = e => {
    if (e.target.className == "deletecart"){
        const a = JSON.parse(localStorage.getItem("food"));
        a.splice([Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode)],1);
        localStorage.setItem("food",JSON.stringify(a));
        e.target.parentNode.remove();
        if (JSON.parse(localStorage.getItem("food")).length == 0 ) {
            cartempty.style.display="block";
            ordered.style.display="none";
        }
    }
    
}

ordered.onclick = e=> {
    cartpopup.style.display="none";
    ending.style.display="flex"
    setTimeout(e=>{
        unblock();
        ending.style.display="none";
    },1500)
}