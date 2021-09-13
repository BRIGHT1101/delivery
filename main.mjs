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
        popup.setAttribute("id","orderpopup");
        increase.setAttribute("type","button");
        increase.setAttribute("value","+");
        decrease.setAttribute("type","button");
        decrease.setAttribute("value","-");
        select.setAttribute("type","button");
        select.setAttribute("value","완료");
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
        main.style['pointer-events'] = "none"
        main.style.filter="blur(5px)";
        header.style.filter="blur(5px)";
    }
}

if(locationpopup.style.display != "none") {
    main.style['pointer-events'] = "none"
    main.style.filter="blur(5px)";
    header.style.filter="blur(5px)";
}

resetlocation.onclick = e => {
    locationpopup.style.display="flex";
    main.style['pointer-events'] = "none"
    main.style.filter="blur(5px)";
    header.style.filter="blur(5px)";
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
    if (e.target.matches('#orderpopup input[value="완료"]')) {
        const end = document.createElement("div");
        const endmsg = document.createElement("div")
        const corimg = document.createElement("img");
        corimg.setAttribute("src","https://image.flaticon.com/icons/png/512/1828/1828643.png");
        corimg.setAttribute("id","orderEnd");
        endmsg.setAttribute("id", "endmsg");
        end.setAttribute("id","end");
        end.innerText = "배달접수가 완료되었습니다."
        main.innerHTML = '';
        endmsg.appendChild(corimg);
        endmsg.appendChild(end);
        main.appendChild(endmsg);
        orderpopup.remove();
        main.style['pointer-events'] = "unset";
        main.style.filter="unset";
        header.style.filter="unset";
    }

    if (e.target.matches('#orderpopup input[value="X"]')) {
        orderpopup.remove();
        main.style['pointer-events'] = "unset";
        main.style.filter="unset";
        header.style.filter="unset";
    }


}