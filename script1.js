var presTimer, artModel, presOp=0.1;
var modSel = "";
var videoHeight=0;

function changePresentation(article) {
    if(videoHeight == 0) {
        videoHeight = document.getElementsByTagName("video")[0].clientHeight;
    }
    
    artModel = article.getElementsByClassName("vehicle-name");
    window.scrollTo({'behavior': 'smooth', 'left': 0, 'top': 0});
    
    if(modSel == artModel[0].innerHTML)
        return;
    
    modSel = artModel[0].innerHTML;
    presTimer = setInterval(setPresentationOpacity, 50);
    presOp=-0.1;
}

function setPresentationOpacity() {
    var pres = document.getElementById("presentation");
    artModel[0].style.opacity = Number(artModel[0].style.opacity) + presOp;
    pres.style.opacity = Number(pres.style.opacity) + presOp;
    
    if(Number(artModel[0].style.opacity) <=0) {
        artModel[0].style.opacity=0;
        presOp=0.1;
        
        pres.style.opacity =0;
        change();
    }
    if(Number(artModel[0].style.opacity) >=1) {
        artModel[0].style.opacity=1;
        
        pres.style.opacity = 1;
        clearInterval(presTimer);
    }
}

function change() {
    var model = artModel;
    if(model[0].innerHTML == "Model S") {
        document.getElementById("presentation").getElementsByTagName("video")[0].style.display = "none";
        document.getElementById("presentation").getElementsByTagName("p")[0].style.display = "none";
        document.getElementById("presentation").getElementsByTagName("img")[0].src = "data/models_background.jpg";
        document.getElementById("presentation").getElementsByTagName("img")[0].style.display = "block";
        document.getElementById("presentation").getElementsByTagName("img")[0].style.maxHeight = videoHeight;
        
        window.scrollTo({'behavior': 'smooth', 'left': 0, 'top': 0});
        document.getElementById("presentation-vehicle").style.display="block";
        document.getElementsByClassName("vehicle-prop")[0].innerHTML = "4,4 s";
        document.getElementsByClassName("vehicle-prop")[1].innerHTML = "230 km/h";
        document.getElementsByClassName("vehicle-prop")[2].innerHTML = "400 km";
        document.getElementById("presentation-vehicle").getElementsByTagName("p")[0].innerHTML = "Model S";
        
    } else if(model[0].innerHTML == "Model X") {
        document.getElementById("presentation").getElementsByTagName("video")[0].style.display = "none";
        document.getElementById("presentation").getElementsByTagName("p")[0].style.display = "none";
        document.getElementById("presentation").getElementsByTagName("img")[0].src = "data/modelx_background.jpg";
        document.getElementById("presentation").getElementsByTagName("img")[0].style.display = "block";
        document.getElementById("presentation").getElementsByTagName("img")[0].style.maxHeight = videoHeight;
        
        window.scrollTo({'behavior': 'smooth', 'left': 0, 'top': 0});
        document.getElementById("presentation-vehicle").style.display="block";
        document.getElementsByClassName("vehicle-prop")[0].innerHTML = "3,1 s";
        document.getElementsByClassName("vehicle-prop")[1].innerHTML = "250 km/h";
        document.getElementsByClassName("vehicle-prop")[2].innerHTML = "542 km";
        
        document.getElementById("presentation-vehicle").getElementsByTagName("p")[0].innerHTML = "Model X";
    } else {
        document.getElementById("presentation").getElementsByTagName("img")[0].style.display = "none";
        document.getElementById("presentation-vehicle").style.display="none";
        document.getElementById("presentation").getElementsByTagName("video")[0].style.display = "block";
        document.getElementById("presentation").getElementsByTagName("p")[0].style.display = "block";
    }
}

var onConDiv=0, connTime=0, connOp, connectionInterval;
function dispConnection() {
    var date = new Date();
    document.getElementById("connection-div").style.display = "block";
    document.getElementById("connection-div").style.opacity = 0;
    
    if(!onConDiv) {
        connOp=0.1;
        connectionInterval = setInterval(setConnectionOpacity, 60);
        onConDiv=1;
    } else {
        hideConnection();
        onConDiv=0;
    }
}

function setConnectionOpacity() {
    var opacity = Number(document.getElementById("connection-div").style.opacity) + connOp;
    document.getElementById("connection-div").style.opacity = opacity;
        
    if (document.getElementById("connection-div").style.opacity >= 1) {
        document.getElementById("connection-div").style.opacity = 1;
        clearInterval(connectionInterval);
    } else if (document.getElementById("connection-div").style.opacity <= 0) {
        document.getElementById("connection-div").style.opacity = 1;
        document.getElementById("connection-div").style.display = "none";
        clearInterval(connectionInterval);
    }
}

function hideConnection() {
    connOp=-0.1;
    if(onConDiv)
        connectionInterval = setInterval(setConnectionOpacity, 60);
    
    onConDiv=0;
}

function findClosest (element, fn) {
	if (!element) return undefined;
	return fn(element) ? element : findClosest(element.parentElement, fn);
}

document.addEventListener("click", function(event) {
    var date = new Date();
    
	var connectDiv = findClosest(event.target, function(el) {
		return el.id == 'connection-div' && onConDiv;
	});
    
    var cartDiv = findClosest(event.target, function(el) {
		return el.id == 'cart-div' && onCartDiv;
	});
    
	if (!connectDiv && (date.getTime() > connTime + 200) && document.getElementById("connection-div").style.opacity != 0) {
		hideConnection();
        onConDiv=0;
	}
    
    if (!cartDiv && (date.getTime() > cartTime + 200) && document.getElementById("cart-div").style.opacity !=0) {
		hideCart();
        onCartDiv=0;
	}
}, false);






var onCartDiv=0, cartTime=0, cartOp, cartInterval;
function setCartOpacity() {
    var opacity = Number(document.getElementById("cart-div").style.opacity) + cartOp;
    document.getElementById("cart-div").style.opacity = opacity;
        
    if (document.getElementById("cart-div").style.opacity >= 1) {
        document.getElementById("cart-div").style.opacity = 1;
        clearInterval(cartInterval);
    } else if (document.getElementById("cart-div").style.opacity <= 0) {
        document.getElementById("cart-div").style.opacity = 1;
        document.getElementById("cart-div").style.display = "none";
        clearInterval(cartInterval);
    }
}


function dispCart() {
    document.getElementById("cart-div").style.display = "block";
    
    var date = new Date();
    document.getElementById("cart-div").style.display = "block";
    document.getElementById("cart-div").style.opacity = 0;
    cartTime = date.getTime();
    
    if(!onCartDiv) {
        cartOp=0.1;
        cartInterval = setInterval(setCartOpacity, 60);
        onCartDiv=1;
    } else {
        hideCart();
        onCartDiv=0;
    }
}

function hideCart() {
    cartOp=-0.1;
    if(onCartDiv)
        cartInterval = setInterval(setCartOpacity, 60);
    
    onCartDiv=0;
}


var cars = [];
function addItemToCart(article) {
    var model = article.parentElement.parentElement;
    
    var title = model.getElementsByClassName("vehicle-title")[0].getElementsByClassName("vehicle-name")[0].innerHTML;
    var image = model.getElementsByTagName("img")[0].getAttribute("src");
    
    for(var i=0; i<cars.length; i++) {
        if(cars[i].image == image) {
            cars[i].quantity++;
            displayItemInCart();
            return;
        } 
    }
    
    cars.push({
        title: title,
        image: image,
        quantity: 1
    });
    
    displayItemInCart();
}

function cartNotEmpty() {
    if("cars" in sessionStorage) {
        cars = JSON.parse(sessionStorage.cars);
        displayItemInCart();
    }
}

function displayItemInCart() {
    var itemsDiv = document.getElementById("cart-div");
    var count=0;
    
    if(cars.length == 0) {
        itemsDiv.innerHTML = "<p>Aucun élément dans le panier.</p>";
        document.getElementById("cart").getElementsByTagName("div")[0].innerHTML = "Panier <img src=\"data/cart.png\" alt=\"cart\" style=\"vertical-align:sub;\">";
    } else {
        var list="";
        for(var i=0; i<cars.length; i++) {
            list += 
                "<div class=\"cart-element\" style=\"clear: both;\">"
            +   "   <img src=\""+ cars[i].image+"\">"
            +   "   <span style=\"text-align: left; float: left; margin: 5px;\">"+ cars[i].title+"</span>"
            +   "   <span style=\"text-align: right; float: right; margin: 5px;\">Qt: "+ cars[i].quantity+"</span>"
            +   "</div>"
            
            count += cars[i].quantity;
        }
        
        list += "<p onclick=\"endOrder()\" style=\"cursor: pointer\">Terminer la commande</a></p>"
        itemsDiv.innerHTML = list;
        
        document.getElementById("cart").getElementsByTagName("div")[0].innerHTML = "Panier ("+count+") <img src=\"data/cart.png\" alt=\"cart\" style=\"vertical-align:sub;\">";
        document.getElementById("cart-div").style.textAlign = "right";
        document.getElementById("cart-div").getElementsByTagName("p")[0].style.margin = "15px";
        document.getElementById("cart-div").getElementsByTagName("p")[0].style.textDecoration = "underline";
    }
}

function endOrder() {
    sessionStorage.cars = JSON.stringify(cars);
    
    window.location.href = "cart.html";
    //var data = JSON.parse(sessionStorage.cars);
    //alert(data.length);
}