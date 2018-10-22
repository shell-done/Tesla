function showCart() {
    var cars = JSON.parse(sessionStorage.cars);
    
    var list="";
    for(var i=0; i<cars.length; i++) {
        list += 
            "<div class=\"cart-elementList\" style=\"clear: both;\">"
        +   "   <img src=\""+ cars[i].image+"\">"
        +   "   <span style=\"text-align: left; float: left; margin: 5px;\">"+ cars[i].title+"</span>"
        +   "   <span style=\"text-align: right; float: right; margin: 5px;\">Qt: "+ cars[i].quantity+"<img src=\"data/add.png\" class=\"addRemove\" onclick=addCars("+i+")><img src=\"data/remove.png\" class=\"addRemove\" onclick=removeCars("+i+")></span>"
        +   "</div>"
    }
    
    document.getElementById("cart-list").innerHTML = list;
    displayItemInCart();
    
    var p = document.getElementById("priceTime").getElementsByTagName("p");
    
    var date = new Date();
    date.setDate(date.getDate() + 14);
    var day = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "decembre"];
    var delay = day[date.getDay()] + " " + date.getDay() + " " + months[date.getMonth()] + " " + date.getFullYear();
    
    var price=0;
    var pModelS=100000;
    var pModelX=130000;
    for(var i=0; i<cars.length; i++) {
        if(cars[i].title == "Model S")
            price += cars[i].quantity * pModelS;
        else if(cars[i].title == "Model X")
            price += cars[i].quantity * pModelX;
    }
    
    p[0].innerHTML = "Livraison prévue pour le : "+delay;
    p[1].innerHTML = "Prix total : "+price+" €";
}

function addCars(i) {
    i=Number(i);

    var cars = JSON.parse(sessionStorage.cars);
    cars[i].quantity++;
    sessionStorage.cars = JSON.stringify(cars);
    
    showCart();
}

function removeCars(i) {
    i=Number(i);
    
    var cars = JSON.parse(sessionStorage.cars);
    
    var carsLeft = cars.length;
    
    if(cars[i].quantity > 1)
        cars[i].quantity--;
    else if(carsLeft != 1)
        cars.splice(i, 1);
    else
        alert("Vous ne pouvez pas avoir un panier vide !");
    
    sessionStorage.cars = JSON.stringify(cars);
    showCart();
}

function Submit(){
    var c1 = check1();
    var c2 = check2();
    var c3 = check3();
    
    if(c1 && c2 && c3) {
        startDrawCanvas(4, "blue");
        window.location.href = "livraison.html";
    } else
        startDrawCanvas(4, "red");
}

var name="", firstName="", numP="", mail="", PropName="", PropFirstname="", bancaire="", expiration1="", expiration2="", crypt="", numR="", streetR="", complement="", postalCodeR="", cityR="", regionR="", countryR="";

function clearFields() {
    var form = document.getElementById("form1");
    form["name"].value="";
    form["firstname"].value="";
    form["numP"].value=""; 
    form["mail"].value="";
    removeRed(form["name"]);
    removeRed(form["firstname"]);
    removeRed(form["numP"]);
    removeRed(form["mail"]);
    
    form = document.getElementById("form2");
    form["PropName"].value="";
    form["PropFirstname"].value="";
    form["bancaire"].value="";
    form["expiration1"].value="";
    form["expiration2"].value="";
    form["crypto"].value="";
    removeRed(form["PropName"]);
    removeRed(form["PropFirstname"]);
    removeRed(form["bancaire"]);
    removeRed(form["expiration1"]);
    removeRed(form["expiration2"]);
    removeRed(form["crypto"]);
    
    form = document.getElementById("form3");
    form["num"].value="";
    form["street"].value="";
    form["complement"].value="";
    form["postalCode"].value="";
    form["city"].value="";
    form["region"].value="";
    removeRed(form["num"]);
    removeRed(form["street"]);
    removeRed(form["postalCode"]);
    removeRed(form["city"]);
    
    startDrawCanvas(1, "black");
    startDrawCanvas(2, "black");
    startDrawCanvas(3, "black");
}

function fields1Complete() {
    var form = document.getElementById("form1");
    if(form["name"].value!="" && form["firstname"].value!="" && form["numP"].value!="" && form["mail"].value!="")
        check1();
}

function fields2Complete() {
    var form = document.getElementById("form2");
    if(form["PropName"].value!="" && form["PropFirstname"].value!="" && form["expiration1"].value!="" && form["expiration2"].value!="" && form["crypto"].value!="")
        check2();
}

function fields3Complete() {
    var form = document.getElementById("form3");
    if(form["num"].value!="" && form["street"].value!="" && form["postalCode"].value!="" && form["city"].value!="" && form["region"].value!="")
        check3();
}

function check1(){
    var mailRegex = new RegExp("^[A-Za-z0-9\\.]+@{1}[A-Za-z0-9]+\\.{1}[A-Za-z0-9\\.]+$");
	var phoneRegex = new RegExp("^[0-9]{10}$");
	var nameRegex = new RegExp("^[A-Za-zéèëêàâîïù\\- ]+$");
    var tab = [];
    var validForm = 0;
    var form1 = document.getElementById("form1");
    

    if(form1["name"].value == "") {
		tab[validForm]="name";
		validForm++;
        name="";
	} else if(!nameRegex.test(form1["name"].value)) {
		tab[validForm]="name";
		validForm++;
        name="";
    } else {
        name=form1["name"].value;
    }
    
    if(form1["firstname"].value == "") {
		tab[validForm]="firstname";
		validForm++;
        firstName="";
	} else if(!nameRegex.test(form1["firstname"].value)) {
		tab[validForm]="firstname";
		validForm++;
        firstName="";
    } else {
        firstName=form1["firstname"].value;
    }

    if(form1["numP"].value == "") {
		tab[validForm]="numP";
		validForm++;
        numP="";
	} else if(!phoneRegex.test(form1["numP"].value)) {
		tab[validForm]="numP";
		validForm++;
        numP="";
	} else {
        numP=form1["numP"].value;
    }
    
    if(form1["mail"].value == "") {
		tab[validForm]="mail";
		validForm++;
        mail="";
	} else if(!mailRegex.test(form1["mail"].value)) {
		tab[validForm]="mail";
		validForm++;
        mail="";
    } else {
        mail=form1["mail"].value;
    }

    recap();

    if(validForm)
        for(var i=0; i<tab.length; i++)
            form1[tab[i]].style.borderColor="red";
    
    if(validForm)
        startDrawCanvas(1, "red");
    else
        startDrawCanvas(1, "blue");
    
    if(validForm)
        return false;
    else
        return true;
}


function check2(){
	var CardRegex = new RegExp("^[0-9]{16}$");
    var ExpirationRegex = new RegExp("^[0-9]{4}$");
	var nameRegex = new RegExp("[A-Za-zéèëêàâîïù\\- ]+$");
    var tab = [];
    var validForm = 0;
    var CryptoRegex = new RegExp("^[0-9]{3}$");
    var ExpirationRegex = new RegExp("^[0-9]{2}$");
    var form2 = document.getElementById("form2");
    
    if(form2["PropName"].value == "") {
		tab[validForm]="PropName";
		validForm++;
        PropName="";
	} else if(!nameRegex.test(form2["PropName"].value)) {
		tab[validForm]="PropName";
		validForm++;
        PropName="";
    } else {
        PropName=form2["PropName"].value;
    }
    
    if(form2["PropFirstname"].value == "") {
		tab[validForm]="PropFirstname";
		validForm++;
        PropFirstname="";
	} else if(!nameRegex.test(form2["PropFirstname"].value)) {
		tab[validForm]="PropFirstname";
		validForm++;
        PropFirstname="";
    } else {
        PropFirstname=form2["PropFirstname"].value;
    }
            
    if(form2["bancaire"].value == "") {
		tab[validForm]="bancaire";
		validForm++;
        bancaire="";
	} else if(!CardRegex.test(form2["bancaire"].value)) {
		tab[validForm]="bancaire";
		validForm++;
        bancaire="";
	} else {
        bancaire=form2["bancaire"].value;
    }
    
    if(form2["expiration1"].value == "") {
        tab[validForm]="expiration1";
        validForm++;
        expiration1="";
    } else if(!ExpirationRegex.test(form2["expiration1"].value) && form2["expiration1"].value > 0 && form2["expiration1"].value < 13) {
        tab[validForm]="expiration1";
        validForm++;
        expiration1="";
    } else {
        expiration1=form2["expiration1"].value;
    }
    
    if(form2["expiration2"].value == "") {
        tab[validForm]="expiration2";
        validForm++;
        expiration2="";
    } else if(!ExpirationRegex.test(form2["expiration2"].value) && form2["expiration2"].value > 17 && form2["expiration2"].value < 30) {
        tab[validForm]="expiration2";
        validForm++;
        expiration2="";
    } else {
        expiration2=form2["expiration2"].value;
    }
    
    if(form2["crypto"].value == "") {
        tab[validForm]="crypto";
        validForm++;
        crypt="";
    } else if(!CryptoRegex.test(form2["crypto"].value)) {
        tab[validForm]="crypto";
        validForm++;
        crypt="";
    } else {
        crypt=form2["crypto"].value;
    }
    
    recap();
    if(validForm)
		for(var i=0; i<tab.length; i++)
            form2[tab[i]].style.borderColor="red";
    
    if(validForm)
        startDrawCanvas(2, "red");
    else
        startDrawCanvas(2, "blue");
    
    if(validForm)
        return false;
    else
        return true;
}



function check3(){
    var postalCodeRegex = new RegExp("^[0-9]{5}$");
    var numRegex = new RegExp("^[0-9]{1,4}$");
	var nameRegex = new RegExp("^[A-Za-zéèëêàâîïù\\- ]+$");
    var tab = [];
    var validForm = 0;
    var form3 = document.getElementById("form3");
    
    if(form3["num"].value == "") {
		tab[validForm]="num";
		validForm++;
        numR="";
	} else if(!numRegex.test(form3["num"].value)) {
		tab[validForm]="num";
		validForm++;
        numR="";
    } else {
        numR=form3["num"].value;
    }
    
    if(form3["street"].value == "") {
		tab[validForm]="street";
		validForm++;
        streetR="";
	} else if(!nameRegex.test(form3["street"].value)) {
		tab[validForm]="street";
		validForm++;
        streetR="";
    } else {
        streetR = form3["street"].value;
    }
    
    if(form3["postalCode"].value == "") {
		tab[validForm]="postalCode";
		validForm++;
        postalCodeR="";
	} else if(!postalCodeRegex.test(form3["postalCode"].value)) {
		tab[validForm]="postalCode";
		validForm++;  
        postalCodeR="";
	} else {
        postalCodeR=form3["postalCode"].value;
    }
    
    if(form3["city"].value == "") {
		tab[validForm]="city";
		validForm++;
        cityR="";
	} else if(!nameRegex.test(form3["city"].value)) {
		tab[validForm]="city";
		validForm++;
        cityR="";
    } else {
        cityR=form3["city"].value;
    }
    
    if(form3["region"].value == "") {
		tab[validForm]="region";
		validForm++;
        regionR="";
	} else if(!nameRegex.test(form3["region"].value)) {
		tab[validForm]="region";
		validForm++;
        regionR="";
    } else {
        regionR=form3["region"].value;
    }
    
    complement = form3["complement"].value;
    countryR = form3["country"].value;
    
    recap();
    if(validForm)
	   for(var i=0; i<tab.length; i++)
            form3[tab[i]].style.borderColor="red";
    else
        centerOnAddress();
    
    if(validForm)
        startDrawCanvas(3, "red");
    else
        startDrawCanvas(3, "blue");
    
    if(validForm)
        return false;
    else
        return true;
}

function removeRed(el) {
    el.style.borderColor = "black";
}

function recap() {
    var div = document.getElementById("recap1");
    div.innerHTML = " <p><br>Nom :"+name+"<br><br>Prénom : "+firstName+"<br><br>Numéro de contact : "+numP+"<br><br>Adresse mail : "+mail+"<br><br>Nom du propriétaire de la carte : "+PropName+"<br><br>Prénom du propriétaire de la carte : "+PropFirstname+"<br><br>Numéro de la carte : "+bancaire+"<br><br>Date d'expiration : "+expiration1+" / "+expiration2+"<br><br> Crypto : "+crypt+"<br></p>";
    
    div = document.getElementById("recap2");
    div.innerHTML = "<p><br>Numéro : "+numR+"<br><br>Adresse : "+streetR+"<br><br>Complément : "+complement+"<br><br>Code postal : "+postalCodeR+"<br><br>Région : "+regionR+"<br><br>Ville : "+cityR+"<br><br>Pays : "+countryR+"<br></p>";
}

var nStatus = ["no", "no", "no", "no", "no"];
var prevStatus = ["blue", "black", "black", "black", "black"];
var drawStep = [0,0,0,0,0];
var drawTimer = [0,0,0,0,0];

function firstLoadCanvas() {
    startDrawCanvas(0, "blue");
    startDrawCanvas(1, "black");
    startDrawCanvas(2, "black");
    startDrawCanvas(3, "black");
    startDrawCanvas(4, "black");
}

function startDrawCanvas(form, newStatus) {
    form = Number(form);
    
    if(newStatus == nStatus[form])
        return;
    
    nStatus[form] = newStatus;
    if(drawStep[form] == 0) {
        drawTimer[form] = setInterval(function() {drawCanvas(form);}, 10);
    } else if(status[form] != newStatus) {
        nStatus[form] = newStatus;
        clearInterval(drawTimer[form]);
        drawTimer[form] = setInterval(function() {unDrawCanvas(form);}, 10);
    }
}

function drawCanvas(form) {
    var c = document.getElementById("canvForm"+form);
    var ctx = c.getContext("2d");
    var PI = 3.1415;
    
    if(drawStep[form] <= 125) {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        
        if(nStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(nStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(nStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#555";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.moveTo(50, 60);
        ctx.lineTo(50+10*drawStep[form], 60);
        ctx.stroke();
        
        var str;
        if(form==0) str="Contenu du panier";
        else if(form==1) str="Informations Personnelles";
        else if(form==2) str="Informations de Paiement";
        else if(form==3) str="Informations de Livraison";
        else if(form==4) str="Récapitulatif";
        
        ctx.font = "40px Arial";
        ctx.fillText(str, 100, 40);
        
        ctx.font = "60px Arial";
        ctx.fillText(form+1, 1335, 80);
    } else if(drawStep[form] <= 170) {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        
        if(nStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(nStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(nStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#AAA";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.moveTo(50, 60);
        ctx.lineTo(1300, 60);
        ctx.stroke();
        
        ctx.beginPath();
        if(nStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(nStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(nStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#555";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.arc(1350,60,50, PI, PI+(drawStep[form]-125)*2*PI/40);
        ctx.stroke();
        
        var str;
        if(form==0) str="Contenu du panier";
        else if(form==1) str="Informations Personnelles";
        else if(form==2) str="Informations de Paiement";
        else if(form==3) str="Informations de Livraison";
        else if(form==4) str="Récapitulatif";
        ctx.font = "40px Arial";
        ctx.fillText(str, 100, 40);
        
        ctx.font = "60px Arial";
        ctx.fillText(form+1, 1335, 80);
    } else {
        clearInterval(drawTimer[form]);
        drawTimer[form]=0;
    }
    
    drawStep[form]++;
}


function unDrawCanvas(form) {
    var c = document.getElementById("canvForm"+form);
    var ctx = c.getContext("2d");
    var PI = 3.1415;

    if(drawStep[form] <= 1) {
        clearInterval(drawTimer[form]);
        prevStatus[form] = nStatus[form];
        drawTimer[form] = setInterval(function() {drawCanvas(form);}, 10);
    }
    else if(drawStep[form] <= 125) {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        
        if(prevStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(prevStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(prevStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#555";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.moveTo(50, 60);
        ctx.lineTo(50+10*drawStep[form], 60);
        ctx.stroke();
        
        var str;
        if(form==0) str="Contenu du panier";
        else if(form==1) str="Informations Personnelles";
        else if(form==2) str="Informations de Paiement";
        else if(form==3) str="Informations de Livraison";
        else if(form==4) str="Récapitulatif";
        
        ctx.font = "40px Arial";
        ctx.fillText(str, 100, 40);
        
        ctx.font = "60px Arial";
        ctx.fillText(form+1, 1335, 80);
    } else {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        
        if(prevStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(prevStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(prevStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#555";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.moveTo(50, 60);
        ctx.lineTo(1300, 60);
        ctx.stroke();
        
        ctx.beginPath();
        if(prevStatus[form] == "black")
            ctx.strokeStyle = "black";
        else if(prevStatus[form] == "blue")
            ctx.strokeStyle = "#0099ff";
        else if(prevStatus[form] == "red")
            ctx.strokeStyle = "#ff0000";
        else
            ctx.strokeStyle = "#555";
        
        ctx.lineCap="round";
        ctx.lineWidth = 8;
        ctx.arc(1350,60,50, PI, PI+(drawStep[form]-125)*2*PI/40);
        ctx.stroke();
        
        var str;
        if(form==0) str="Contenu du panier";
        else if(form==1) str="Informations Personnelles";
        else if(form==2) str="Informations de Paiement";
        else if(form==3) str="Informations de Livraison";
        else if(form==4) str="Récapitulatif";
        
        ctx.font = "40px Arial";
        ctx.fillText(str, 100, 40);
        
        ctx.font = "60px Arial";
        ctx.fillText(form+1, 1335, 80);
    }
    
    drawStep[form]--;
}

















//GOOGLE MAP
var map, geocoder, marker=null;

function initMap() {}

function initializeMap() {
    var latlng = new google.maps.LatLng(48.866667, 2.333333);
    var options = {
        zoom: 15,
        center: latlng
    }
    
    geocoder = new google.maps.Geocoder;
    map = new google.maps.Map(document.getElementById("map"), options);
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(centerOnGeolocatedPosition, geolocationError);
    } else {
        geolocationError();
    }
}

function centerOnGeolocatedPosition(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    
    map.setCenter(pos);
    
    if(!marker) {
        marker = new google.maps.Marker({map: map, position: pos});
    } else {
        marker.setPosition(pos);
    }
    
    geocoder.geocode({location: pos}, getDetectedAddress);
}

function geolocationError() {
    console.warn("Geolocation error");
}

function centerOnAddress() {
    var form = document.getElementById("form3");
    var address = form["num"].value + " " + form["street"].value + " " + form["city"].value;
    
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        if(!marker)
            marker = new google.maps.Marker({map: map, position: results[0].geometry.location});
        else
            marker.setPosition(results[0].geometry.location);
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

var num="", street="", postalCode="", city="", region="", country="";
function getDetectedAddress(results, status) {
    var address;
    
    if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            var add_parts = results[0].address_components;
            
            for(var i=0; i<add_parts.length; i++) {
                if(add_parts[i].types[0] == "street_number")
                    num = add_parts[i].short_name;
                
                if(add_parts[i].types[0] == "route")
                    street = add_parts[i].long_name;
                
                if(add_parts[i].types[0] == "postal_code")
                    postalCode = add_parts[i].short_name;
                
                if(add_parts[i].types[0] == "locality")
                    city = add_parts[i].long_name;
                
                if(add_parts[i].types[0] == "administrative_area_level_1")
                    region = add_parts[i].short_name;
                
                if(add_parts[i].types[0] == "country")
                    country = add_parts[i].long_name;
            }
            
            address = num + " " + street + ", " + postalCode + " " + city+ ", " + region + ", " + country;
            
            document.getElementById("detected-address").style.display = "block";
            document.getElementById("detected-address").getElementsByTagName("p")[0].innerHTML = "Nous vous avons détecté à l'addresse : <br/>" + address + " <br/><br/>Voulez vous remplir les champs avec cette addresse ?";
            
            document.getElementById("detected-address").style.opacity=1;
        }
    } else {
        console.warn("Geocoder failed due to: " + status);
    }
}

var height=128;
function removeDetectedAddress() {
    var div = document.getElementById("detected-address").style;
    
    div.opacity -= 0.05;
    height-=0.05*128;
    div.height = height + "px";
    
    var dis = setTimeout(removeDetectedAddress, 40);
    
    if(div.opacity <= 0) {
        div.display = "none";
        clearTimeout(dis);
    }
}

function setToDetectedAddress() {
    //FILL FIELDS
    var form = document.getElementById("form3");
    form["num"].value = num;
    form["street"].value = street;
    form["postalCode"].value = postalCode;
    form["city"].value = city;
    form["region"].value = region;
    form["country"].value = country;
    
    var countryFound=false;
    for(var i=0; i<form["country"].options.length; i++)
        if(form["country"].options[i].value == country) {
            form["country"].value = country;
            countryFound=true;
            break;
        }
    
    if(!countryFound)
        form["country"].value = "Autre";
    
    check3();
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

function displayItemInCart() {
    var cars = JSON.parse(sessionStorage.cars);
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