 /* Forçando as primeiras letras do nome e da cidade serem maiuscula */
function firstLetter(){
	var name = document.getElementById("name");
	var city = document.getElementById("city");
	name.style.textTransform="capitalize";
	city.style.textTransform="capitalize";
}

/*validação do nome*/
function validateName(){
	var name = document.getElementById("name");
	var validName = new RegExp("^[a-zA-Z]*( [a-zA-Z]*)+$");
	return (validName.test(name.value));
}

/*colocando '/' automaticamente na data*/
function dateFormat(date){
	if(date.value.length == 2)
    	date.value =  date.value + '/'; 
    if(date.value.length == 5)
      	date.value = date.value + '/';
}


/* O comando abaixo garante que ao pressionar backspace a '/' sera apagada.
Também garante que ao usuário pressionar '/' nada acontecerá*/
$(document).ready(function(){
$('#birthday').keypress(function(event) {	
  if (event.which == '8') {	
    date = document.getElementById('birthday');
	if(date.value.length == 6){
    	event.preventDefault();
    	date.value = date.value.substring(0,4);
    }
    if(date.value.length == 3){
    	event.preventDefault();
    	date.value = date.value.substring(0,1);
    }
   }
   if (event.which == '47'){
   		event.preventDefault();
   }
});
});

$(function() {
    $( "#birthday" ).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: "-100Y", 
      maxDate: "-13Y"
    });
  });
   
/*Função chamada para validar a data*/
function validateDate(){
	var date = document.getElementById("birthday").value;
	now = new Date;
	if(date.substring(3,5) > 31){ //Dia maior que 31
		return false;
	}
	if(date.substring(0,2) > 12 || date.substring(0,2) == 0){ //Mes maior que 12 ou igual a 0
		return false;
	}
	if(date.substring(6) > now.getFullYear()-13){ //Ano maior que o atual
		return false;
	}
	console.log(now.getFullYear()-13);
	if(date.substring(6) == now.getFullYear()-13 &&  //faz(fez) 13 anos esse ano
		((date.substring(0,2) == (now.getMonth()+1) && date.substring(3,5) > now.getDate()) /*faz 13 anos esse mês mas num dia futuro*/
			|| date.substring(0,2) > now.getMonth())) { /*faz 13 anos esse ano mas em mês futuro*/
		alert("Data inválida");	
		return false;	
	}
	return true;
}

/*Função para validar a cidade*/
function validateCity(){
	var city = document.getElementById("city").value;
	var validCity = new RegExp("^([a-zA-Z]*)+$");
	return (validCity.test(city));
}

/* Função que coloca '()' e '-' automaticamente no numero de telefone*/ 
function phoneFormat(phone){
	if(phone.value.length == 0)
    	phone.value =  phone.value + '('; 
    if(phone.value.length == 3)
      	phone.value = phone.value + ')';
 	if(phone.value.length == 8)
      	phone.value = phone.value + '-';
}
/*  O comando abaixo garante que ao pressionar backspace o '()' ou '-' será apagado.*/
$(document).ready(function(){
$('#phone').keypress(function(event) {	
  if (event.which == '8') {	
    date = document.getElementById("phone");
	if(date.value.length == 1){
    	event.preventDefault();
    	date.value = date.value.substring(0,0);
    }
    if(date.value.length == 4){
    	event.preventDefault();
    	date.value = date.value.substring(0,2);
    }
    if(date.value.length == 9){
    	event.preventDefault();
    	date.value = date.value.substring(0,7);
    }
   }
   if ((event.which == '45')|| (event.which == '40') || (event.which == '41')){
   		event.preventDefault();
   }
});
});

function validatePhone(){
	var phone = document.getElementById("phone").value;
	var validPhone = new RegExp(/\(([0-9]){2}\)([0-9]){4}\-([0-9]){4}/);
	return validPhone.test(phone);
}

function validateEmail(){
	var email = document.getElementById("email");
	var validEmail = new RegExp(/[a-z]([a-z]|[0-9]|_|\.)*@([a-z])+([\.]([a-z])+)+/);
	return (validEmail.test(email));
}

/*Função chamada para validar todos os campos do formulário*/
function validateForm(){
	if(!validateName()){
		$("#nameBox").append("<div class='alert alert-danger col-sm-6'><strong>Nome inválido. </strong>Esse campo deve ter nome e sobrenome, sem numeros ou caracteres especiais</div>"); 	
	}
	if(!validateDate()){
		$("#birthdayBox").append("<div class='alert alert-danger col-sm-6'><strong>Data inválida. </strong>Data deve ser no formato mm/dd/yyyy e pessoa deve ter mais de 13 anos</div>"); 	
	}
	if(!validateCity()){
		$("#cityBox").append("<div class='alert alert-danger col-sm-6'><strong>Cidade inválida. </strong>Campo cidade deve ter apenas caracteres. </div>"); 	
	}
	if(!validatePhone()){
		$("#phoneBox").append("<div class='alert alert-danger col-sm-6'><strong>Telefone inválido. </strong>Campo telefone deve ter apenas números. </div>"); 	
	}
	if(!validateEmail()){
		$("#emailBox").append("<div class='alert alert-danger col-sm-6'><strong>Email inválido. </strong>Campo email deve ser no formato email@dominio.com(.br) </div>"); 	
	}
}

	
$(document).ready(function(){
	$("#name").focus(function(){
		$("#nameBox .alert-danger").alert("close");
   	});  
});

$(document).ready(function(){
	$("#birthday").focus(function(){
		$("#birthdayBox .alert-danger").alert("close");
   	});  
});

$(document).ready(function(){
	$("#city").focus(function(){
		$("#cityBox .alert-danger").alert("close");
   	});  
});

$(document).ready(function(){
	$("#phone").focus(function(){
		$("#phoneBox .alert-danger").alert("close");
   	});  
});

$(document).ready(function(){
	$("#email").focus(function(){
		$("#emailBox .alert-danger").alert("close");
   	});  
});
    