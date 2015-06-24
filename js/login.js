function Trylogin(){
    if(localStorage.getItem('UsersDataBase') == null){
        $.ajaxSetup({ mimeType: "text/plain" });
        $.getJSON("js/json/users.json", function (data) {
            localStorage.setItem('UsersDataBase',JSON.stringify(data));
        });
    }
	var users = JSON.parse(localStorage.getItem('UsersDataBase'));
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	for (i=0;i<users.length;i++){
		console.log("login = "+password);
		console.log("bd = "+users[i].password);
		if(users[i].email == email && users[i].password == password){
			console.log("entrou!");
			localStorage.setItem("logged",1);
			localStorage.setItem("user", users.name);
			location.href="index.html";
			return;
		}
	}
	alert("Email e/ou senha inválido(s)");
}