window.onload = home
var user_name;
function home(){
  login_section()
  var login_bt = document.getElementById('login_button');
  var login_success = document.getElementById('login');
  
  login_bt.onclick = function(){
    var user_name_text = document.getElementById('user_name').value;
    var password_text = document.getElementById('password').value;
    if (user_name_text != "" && password_text!= ""){
    user_name = user_name_text;
    if(isUserValid(user_name_text,password_text)=='True'){
      //alert("login Successful");

      login_success.innerHTML = 'Hello '+user_name_text;

      var signout_btn = document.createElement('a');
      signout_btn.className = "btn btn-sm btn-success float-right";
      signout_btn.innerHTML = "Logout";
      signout_btn.id = "logout_button";

      login_success.appendChild(signout_btn);
      signout_btn.href = "";

      activity_section();
    }
    else{
      alert("Username & Password is not valid");
    }
  }
  else{
    alert("Username & Password cannot be blank");
  }
  }

  var register_bt = document.getElementById('register_button');
  register_bt.onclick = registerSection

}


function registerSection(){
  var popup_div = document.createElement('div');
  popup_div.className = "form-control p-3 m-3 border mx-auto";
  popup_div.innerHTML = "Register";
  popup_div.id = "popup_div";

  var register_user_name = document.createElement('input');
  register_user_name.className = "form-control p-3 m-3 border mx-auto";
  register_user_name.setAttribute("type", "text");
  register_user_name.setAttribute("placeholder", "username");
  register_user_name.id = "register_user_name";
  var register_email = document.createElement('input');
  register_email.className = "form-control p-3 m-3 border mx-auto";
  register_email.setAttribute("type", "email");
  register_email.setAttribute("placeholder", "Email");
  register_email.id = "register_email";
  var register_password = document.createElement('input');
  register_password.className = "form-control p-3 m-3 border mx-auto";
  register_password.setAttribute("type", "text");
  register_password.setAttribute("placeholder", "password");
  register_password.id = "register_password";
  var register_confirm_password = document.createElement('input');
  register_confirm_password.className = "form-control p-3 m-3 border mx-auto";
  register_confirm_password.setAttribute("type", "text");
  register_confirm_password.setAttribute("placeholder", "confirm password");
  register_confirm_password.id = "register_confirm_password";
  var register_div_btn = document.createElement('button');
  register_div_btn.className = "btn btn-md p-2 m-1 btn-success float-right";
  register_div_btn.innerHTML = "Register";
  register_div_btn.id = "register_div_button";

  var cancel_btn = document.createElement('button');
  cancel_btn.className = "btn btn-md p-2 m-1 btn-success float-right";
  cancel_btn.innerHTML = "Cancel";
  cancel_btn.id = "cancel_button";

  popup_div.appendChild(register_user_name);
  popup_div.appendChild(register_email);
  popup_div.appendChild(register_password);
  popup_div.appendChild(register_confirm_password);
  popup_div.appendChild(cancel_btn);
  popup_div.appendChild(register_div_btn);
  popup_div.style = "display:block;position:fixed;z-index:1;padding:50px;margin:50px;top:0;left:5%;width:90%;height:400px;background-color:white ; ";
  document.body.appendChild(popup_div);

  var register_div_bt = document.getElementById('register_div_button')
  register_div_bt.onclick = registerActivity

  var cancel_bt = document.getElementById('cancel_button')
  cancel_bt.onclick = cancel
}

function registerActivity(){
  var register_user_name = document.getElementById('register_user_name').value
  var register_email = document.getElementById('register_email').value
  var register_password = document.getElementById('register_password').value
  var register_confirm_password = document.getElementById('register_confirm_password').value
  if (register_user_name,register_email,register_password,register_confirm_password!= ""){
  if (register_password == register_confirm_password){
    var register_response = register(register_user_name,register_email,register_password) 
    if (register_response=='True') {
      alert("registration Successfull");
      cancel();
    }
    else{
      alert("username is already existing");
    }

  }
  else {
    alert("password mismatch");
  }
  }
  else{
    alert("Some Fields are blank");
  }
}

function cancel(){
  document.getElementById('popup_div').style = "display:none";
  document.body.removeChild(popup_div);
}

function login_section(){
  var login_div=document.getElementById('login');
  login_div.className = "col-lg-8 p-1 m-1 mx-auto";
  login_div.innerHTML = "Login";
  var user_name = document.createElement('input');
  user_name.className = "form-control p-3 m-3 border mx-auto";
  user_name.setAttribute("type", "text");
  user_name.setAttribute("placeholder", "username");
  user_name.id = "user_name";
  var password = document.createElement('input');
  password.className = "form-control p-3 m-3 border mx-auto";
  password.setAttribute("type", "text");
  password.setAttribute("placeholder", "password");
  password.id = "password";
  var login_btn = document.createElement('button');
  login_btn.className = "btn btn-md p-2 m-1 btn-success float-right";
  login_btn.innerHTML = "Login";
  login_btn.id = "login_button";
  var register_btn = document.createElement('button');
  register_btn.className = "btn btn-md p-2 m-1 btn-warning float-right";
  register_btn.innerHTML = "Register";
  register_btn.id = "register_button";

  login_div.appendChild(user_name);
  login_div.appendChild(password);
  login_div.appendChild(register_btn);
  login_div.appendChild(login_btn);
}

function register(register_user_name,register_email,register_password){
  var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  var url = 'register/';
  var response_text ;
  //var params = 'name=' +name+'&amp;pw='+pw;
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response_text = this.responseText;
    }
  };

  req.open("POST", url, false);
  req.setRequestHeader("X-CSRFToken", csrftoken);
  req.send(JSON.stringify({"name":register_user_name,"email":register_email,"pw":register_password}));
  return response_text  
}

function isUserValid(name,pw){
  var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  var url = 'is_user_exist/';
  var response_text ;
  //var params = 'name=' +name+'&amp;pw='+pw;
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response_text = this.responseText;
    }
  };

  req.open("POST", url, false);
  req.setRequestHeader("X-CSRFToken", csrftoken);
  req.send(JSON.stringify({"name":name,"pw":pw}));
  return response_text
}

function activity_section(){
  activity_form();  
  var saveActivityButton = document.getElementById('activity_save_button');
  saveActivityButton.onclick = saveActivity
  //saveActivityButton.onclick = save
  showActivity();
}


function activity_form(){
  var activity_div=document.getElementById('activity');
  activity_div.className = "col-lg-10 p-3 m-3 border mx-auto";

  var section_name = document.createElement('p');
  section_name.innerText = "Add Activity";

  var activity_txt = document.createElement('input');
  activity_txt.className = "form-control p-1 m-1 border mx-auto";
  activity_txt.setAttribute("type", "text");
  activity_txt.setAttribute("placeholder", "Type To Do Activity");
  activity_txt.id = "activity_text";

  var date_label = document.createElement('label');
  date_label.className = "p-1 mx-auto";
  date_label.innerText = "Target date : ";
  date_label.setAttribute("for", "activity_date");

  var target_date = document.createElement('input');
  target_date.className = "p-1 border mx-auto";
  target_date.setAttribute("type", "datetime-local");
  target_date.id = "target_date";

  var activity_save_btn = document.createElement('button');
  activity_save_btn.className = "btn btn-md btn-success float-right";
  activity_save_btn.innerHTML = "Save Activity";
  activity_save_btn.id = "activity_save_button";
  activity_div.appendChild(section_name);
  activity_div.appendChild(activity_txt);
  activity_div.appendChild(date_label);
  activity_div.appendChild(target_date);
  activity_div.appendChild(activity_save_btn);
}

function showActivity(){
    //alert('Show activity');
    var url = 'get_activity?user_name='+user_name;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //alert(this.responseText);
          var data = eval(this.responseText);
          createTable(data);
      }
    };
    req.open("GET", url, true);
    req.send();
}

function saveActivity(){
    var activity = document.getElementById('activity_text').value;
    var target_date = document.getElementById('target_date').value;
    //alert('activity '+activity+' has been saved');

    if (activity != "" && target_date!= ""){
    var url = 'add_activity?activity='+activity+'&user_name='+user_name+'&target_date='+target_date;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //alert(this.responseText);
          var data = eval(this.responseText);
          createTable(data);
          document.getElementById('activity_text').value = '';
          document.getElementById('target_date').value = '';
      }
    };
    req.open("GET", url, true);
    req.send();
  }
  else{
    alert("Activity & Target date cannot be blank");
  }
}


function createTable(data){
    var data = data
    var show_activity_div = document.getElementById('show-activities');
    show_activity_div.className = "col-lg-10 mx-auto p-1 m-3";
    show_activity_div.innerHTML= "";
    var table = document.createElement('TABLE');

    var row_title = table.insertRow(0);
    row_title.style = "text-align:center;font-weight:bold"
    var target_date_title = row_title.insertCell(0);
    var activity_title = row_title.insertCell(1);
    var complete_activity_title = row_title.insertCell(2);
    var delete_activiy_title = row_title.insertCell(3);
    //assgining cell variables with data
    target_date_title.innerHTML = "Target Date";
    activity_title.innerHTML = "Activity";
    complete_activity_title.innerHTML = "Complete";
    delete_activiy_title.innerHTML = "Delete";

    for (var i=0;i<data.length;i++){
        //creating a row
        var row = table.insertRow(i+1);
        row.style = "text-align:center;font-weight:normal;"
        row.className = "text-break"
        //creating cells for rows
        var target_date = row.insertCell(0);
        var activity = row.insertCell(1);
        var complete_activiy = row.insertCell(2);
        var delete_activiy = row.insertCell(3);
        //assgining cell variables with data///
        target_date.innerHTML = data[i].target_date.slice(0,10)+" "+data[i].target_date.slice(11,-3);
        activity.innerHTML = data[i].activity;
        complete_activiy.id = data[i].id;
        delete_activiy.id = data[i].id;
        //complete activity styling
        if (data[i].completed.length==2){
        complete_activiy.innerHTML = '&#10004;';
        complete_activiy.className = "text-success text-center";
        complete_activiy.style.cursor = "pointer";
        complete_activiy.onclick = completeActivity
        }
        else{
          complete_activiy.innerHTML = data[i].completed;
          complete_activiy.className = "text-success text-center";
          target_date.className = "text-success text-center";
          activity.className = "text-success text-center";
          complete_activiy.style="text-decoration: line-through;";
          target_date.style = "text-decoration: line-through;";
          activity.style = "text-decoration: line-through;";
        }
        //delete activity styling
        delete_activiy.innerHTML = '&times;';
        delete_activiy.className = "text-danger text-center";
        delete_activiy.style.cursor = "pointer";
        //calling delelte activity function 
        delete_activiy.onclick = deleteActivity
    }
    table.className = 'table table-striped'
    show_activity_div.appendChild(table);
}


function completeActivity(){
  var id = this.id;
  var url = 'complete_activity?id='+id+'&user_name='+user_name;
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = eval(this.responseText);
      createTable(data);
    }
  };
  req.open("GET", url, true);
  req.send();
}


function deleteActivity(){
    var id = this.id;
    var url = 'delete_activity?id='+id+'&user_name='+user_name;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = eval(this.responseText);
        createTable(data);
      }
    };
    req.open("GET", url, true);
    req.send();
} 