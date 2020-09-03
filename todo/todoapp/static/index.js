window.onload = home
var user_name;
function home(){
  login_section()
  var login_bt = document.getElementById('login_button');
  var login_success = document.getElementById('login');
  login_bt.onclick = function(){
    var user_name_text = document.getElementById('user_name').value;
    var password_text = document.getElementById('password').value;
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
      alert("Entered name or password is not valid");
    }
  }
}

function login_section(){
  var login_div=document.getElementById('login');
  login_div.className = "col-lg-6 p-3 m-3 border mx-auto";
  login_div.innerHTML = "Login Form";
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
  login_btn.className = "btn btn-lg btn-success float-right";
  login_btn.innerHTML = "Login";
  login_btn.id = "login_button";
  login_div.appendChild(user_name);
  login_div.appendChild(password);
  login_div.appendChild(login_btn);
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
  activity_div.className = "col-lg-6 p-3 m-3 border mx-auto";

  var section_name = document.createElement('p');
  section_name.innerText = "Add Activity";

  var activity_txt = document.createElement('input');
  activity_txt.className = "form-control p-3 m-3 border mx-auto";
  activity_txt.setAttribute("type", "text");
  activity_txt.setAttribute("placeholder", "Type To Do Activity");
  activity_txt.id = "activity_text";

  var date_label = document.createElement('label');
  date_label.className = "p-3 mx-auto";
  date_label.innerText = "Target date : ";
  date_label.setAttribute("for", "activity_date");

  var activity_date = document.createElement('input');
  activity_date.className = "p-1 border mx-auto";
  activity_date.setAttribute("type", "date");
  activity_date.id = "activity_date";

  var activity_save_btn = document.createElement('button');
  activity_save_btn.className = "btn btn-lg btn-success float-right";
  activity_save_btn.innerHTML = "Save Activity";
  activity_save_btn.id = "activity_save_button";
  activity_div.appendChild(section_name);
  activity_div.appendChild(activity_txt);
  activity_div.appendChild(date_label);
  activity_div.appendChild(activity_date);
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
    //alert('activity '+activity+' has been saved');
    var url = 'add_activity?activity='+activity+'&user_name='+user_name;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //alert(this.responseText);
          var data = eval(this.responseText);
          createTable(data);
          document.getElementById('activity_text').value = '';
      }
    };
    req.open("GET", url, true);
    req.send();
}


function createTable(data){
    var data = data
    var show_activity_div = document.getElementById('show-activities');
    show_activity_div.className = "col-lg-10 mx-auto p-3 m-3";
    show_activity_div.innerHTML= "";
    var table = document.createElement('TABLE');
    for (var i=0;i<data.length;i++){
        //creating a row
        var row = table.insertRow(i);
        //creating cells for rows
        var id = row.insertCell(0);
        var activity = row.insertCell(1);
        var removeActiviy = row.insertCell(2);
        //assgining cell variables with data
        id.innerHTML = data[i].id;
        activity.innerHTML = data[i].activity;
        removeActiviy.id = data[i].id;
        //remove activity styling
        removeActiviy.innerHTML = '&times;';
        removeActiviy.className = "text-danger text-center";
        removeActiviy.style.cursor = "pointer";
        //calling delelte activity function 
        removeActiviy.onclick = deleteActivity
    }
    table.className = 'table table-striped'
    show_activity_div.appendChild(table);
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