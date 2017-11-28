var x = document.getElementById("fetchCurrentLocation");
var firstDiv = document.getElementById('firstDiv');
var secondDiv = document.getElementById('secondDiv');
var latitude = null;
var longitude = null;
// var allowLocationAccessButton = document.getElementById("allowLocationAccessButton");
var pos = document.getElementById('divForPositionMap');
function getLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPositionOnMap,showError);
	}
	else{
		pos.innerHTML = "Geolocation is not Supported by Your Browser !"
	}
}
function showPositionOnMap(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log("showPositionOnMap()");
	var latlon = latitude+","+longitude;
	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=12&size=600x400&sensor=false&key=AIzaSyDjgKOE6WARQyp-6UWwTNbSf1eB7aQO8XU";
	document.getElementById('firstPage').style.visibility = 'hidden';
	var mapImage = "<img src='"+img_url+"' alt='Location' />";
	// pos.appendChild(mapImage);
	$(pos).append(mapImage);
	$('.secondPage').css("visibility",'visible');
	// document.getElementsByClassName('secondPage').style.visibility = 'visible';
}

function showError(error){
	switch(error.code){
		case error.PERMISSION_DENIED:
			pos.innerHTML = "Permission for location access is denied by user !";
		break;
		case error.POSITON_UNAVAILABLE:
			pos.innerHTML = "The current position is unavailable/could be fetched !";
		break;
		case error.TIMEOUT:
			pos.innerHTML = "The request to get user's location timed out !";
		break;
		case error.UNKNOWN_ERROR:
			pos.innerHTML = "An unknown error occurred !";
		break;				
	}
}

function getWeatherInfo(latitude,longitude){
	$.ajax({
		dataType: "json",
		type : "GET",
		url : "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude+"",//Math.round(parseFloat(longitude))+"",
		success : function(data){
			console.log(data);
			console.log("Coordinates :- "+data.coord.lon);
			console.log("Temperature :- "+data.main.temp);
			console.log("Weather :- "+data.weather[0].main);
			$('.secondPage').css("visibility",'hidden');
			document.getElementById('city').innerHTML = data.name;
			document.getElementById('temperature').innerHTML = data.main.temp;
			document.getElementById('humidity').innerHTML = data.main.humidity;
			document.getElementById('visibility').innerHTML = data.visibility;
			document.getElementById('weatherDescription').innerHTML = data.weather[0].description;
			$('#thirdPage').css("visibility",'visible');
		},
		cache : false,
		crossDomain : true
	});
}

$(x).on('click',function(){
	console.log("Button Clicked !");
	// document.getElementById('firstPage').style.display = "none";
	getLocation();
	// showPositionOnMap(position);
	// showPosition();
	// getWeatherInfo(latitude,longitude);
});
$('#fetchWeatherDetails').on('click',function(){

	getWeatherInfo(latitude,longitude);
	console.log("Weather details fetched !");
});

function showPosition(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	
	var latlon = latitude+","+longitude;
	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=12&size=600x400&sensor=false&key=AIzaSyDjgKOE6WARQyp-6UWwTNbSf1eB7aQO8XU";
	firstDiv.style.display = "none";
	// document.getElementsByClassName('allowLocationAccess').style.display = "none";
	var mapImage = "<img src='"+img_url+"' alt='Location' />";
	// pos.appendChild(mapImage);

	$(pos).append(mapImage);

	// firstDiv.innerHTML = "<h3>Your Current Location is :- </h3>"
	// pos.innerHTML = "Latitude :- "+latitude + "<br />Longitude :- " + longitude;

	// m.innerHTML = "<img id='positionOnMapImage' src='"+img_url+"' />";
	// secondDiv.innerHTML = "";
	// secondDiv.removeChild(document.getElementById('accessLocationButton'));
	// secondDiv.innerHTML = "<img id='positionOnMapImage' src='"+img_url+"' />";
}
