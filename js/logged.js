$(document).ready(function () {
	
	var isLogged;
	if(localStorage.getItem("logged") == null)
		isLogged = 0;
	else
		isLogged = localStorage.getItem("logged");
	console.log(isLogged);
	if(isLogged){
		$("#loginRegister").append('<button type="button" class="btn btn-primary" id="registerSerie">Cadastrar Série</button>')
	}
	else{
		$("#loginRegister").append('<button type="button" class="btn btn-primary" id="login">Login</button> <button type="button" class="btn btn-primary" id="registerUser">Cadastrar</button>')
	}

	$('#registerSerie').click(function(){
		location.href="cadastro_serie.html"
	});

	$('#registerUser').click(function(){
		location.href="cadastro.html"
	});

	$('#login').click(function(){
		location.href="login.html"
	});
});