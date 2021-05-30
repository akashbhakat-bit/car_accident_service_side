firebase.auth().onAuthStateChanged(function(user) {
    if (user) {


      // User is signed in.
      //location.replace('main.html');

      document.getElementById("Authentication").style.display = "none";
      document.getElementById("Authentication").className = "menuof";
     
      document.getElementById("Citizen_page").className = "menuon";
      document.getElementById("Citizen_page").style.display = "block";

      document.getElementById("Hospital_page").className= "menuof";
      document.getElementById("Hospital_page").style.display = "block";

      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var name =document.getElementById("name_field").value;
        ;
        firebase.database().ref('/service_center/'+name).on('value',function(snapshot){

            var register=snapshot.val().registered_as;
            if(register=="Citizen"){
                document.getElementById("Citizen_page").className = "menuon";
                document.getElementById("Citizen_page").style.display = "block";

                //document.getElementById('Citizen_page_name').innerHTML=snapshot.val().name;
                // document.getElementById('Citizen_page_mobile').innerHTML=snapshot.val().mobile;
                // document.getElementById('Citizen_page_age').innerHTML=snapshot.val().patients_strength;
                // document.getElementById('Citizen_page_car_name').innerHTML=snapshot.val().longitude;
                // document.getElementById('Citizen_page_car_number').innerHTML=snapshot.val().latitude;

            }else{
                document.getElementById("Hospital_page").className= "menuof";
                document.getElementById("Hospital_page").style.display = "block";

            }

        })
        //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
       // document.getElementById("name").innerHTML="Welcome "+ name;
      }
      
        firebase.auth().signOut();
      
      
      
  
    } else {
      // No user is signed in.
  
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  
  
function handleSignUp() {
    var email = document.getElementById('sign_email').value;
    var password = document.getElementById('sign_password').value;
    var name= document.getElementById('fullname').value;
    var mobile= document.getElementById('mobileno').value;
    var age = document.getElementById('age').value;
    var car_name=document.getElementById('car_name').value;
    var car_number=document.getElementById('car_number').value;
    var registered_as=document.getElementById('select_user').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  
  
  firebase.database().ref('/service_center/'+name).set({
    name: name,
    email: email,
    mobile: mobile,
    patients_strength: age,
    longitude:car_name,
    latitude:car_number,
    registered_as:registered_as
  });
  
  
  alert("Account Created Successfully.");
  
  
  
  
  
  }

  function showSignUp(){

    document.getElementById("login_part").style.display = "none";
    document.getElementById("login_part").className = "menuof";
    
    document.getElementById("signup_div").style.display = "block";
    document.getElementById('signup_div').className="menuon";
 
    


    
  }

  
  function respondSOS(){
    var curr_x=navigator.geolocation.getCurrentPosition(showPosition)

    

  }
  function showPosition(position){
    var curr_x=position.coords.latitude;
    var curr_y=position.coords.longitude;
    //var ref = firebase.database().ref('/sos/');

    // ref.on("value", function(snapshot) {
    //   var name=snapshot.val().name;
    //   var mobile=snapshot.val().mobile;
    //   var age=snapshot.val().age;
    //   var car_name=snapshot.val().car_name;
    //   var car_number=snapshot.val().car_number;
    //   var x=snapshot.val().x_latitude
    //   var y=snapshot.val().y_longitude
    
    
      var dist;

      var lat1=document.getElementById("lat").value;
      var lon1=document.getElementById("long").value;
      var lat2= curr_x;
      var lon2= curr_y;

      if ((lat1 == lat2) && (lon1 == lon2)) {
        dist= 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
      }
    
      console.log(dist);
      //document.getElementById('patient_name_1').innerHTML=name;
      //document.getElementById('patient_mobile_1').innerHTML=mobile;
      //document.getElementById('patient_age_1').innerHTML=age;
      //document.getElementById('patient_car_name_1').innerHTML=car_name;
      //document.getElementById('patient_car_number_1').innerHTML=car_number;
      //document.getElementById('patient_x_1').innerHTML=document.getElementById("lat").value;
      //document.getElementById('patient_y_1').innerHTML=document.getElementById("long").value;
      document.getElementById('patient_distance_1').innerHTML=dist;


       //console.log(snapshot.val());
    

  
  }

  
  
function responded(){
  firebase.database().ref('/sos/').remove();

}

  function myFunction(){

    document.getElementById("signup_div").style.display = "none";

    document.getElementById('signup_div').className="menuof";

    
    document.getElementById("Citizen_page").style.display = "none";

    document.getElementById('Citizen_page').className="menuof";

    
    document.getElementById("Hospital_page").style.display = "none";

    document.getElementById('Hospital_page').className="menuof";
  }