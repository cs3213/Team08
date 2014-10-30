    //Dev Parameters
    var CLIENT_ID = '762525072987-jvj4k7qp586b3ro93dfq3ieiegjo6f37.apps.googleusercontent.com';
    var developerKey = 'AIzaSyDBKs5GQEYcqvHSTvlRKu_hs9JhanUdu3o';
    var SCOPES = 'https://www.googleapis.com/auth/drive';
 
    
hello.init({ 
	google   : CLIENT_ID}
, {redirect_uri: 'http://localhost:9000/index.html'}
);

//test login
    function toggleLog(myVal, btId){
        
    if(myVal == "Login"){
        hello('google').login();
        getGoogleProfileName();
        document.getElementById(btId).value = "Logout";
        
    }
    else if(myVal == "logout"){
         window.location.assign("https://accounts.google.com/logout")
    }
}

  /*  
//when user click login
hello.on('auth.login', function(auth){
	console.log("You are signed in to Google");
	getGoogleProfileName();
});
      */           
    
//when user click logout
    //listener for authenticator to logout
hello.on('auth.logout', function(auth){
	console.log("You are signed out from Google");    
    document.getElementById('login-area').innerHTML = "<a ng-href=\"#\" onclick=\"hello('google').login();getGoogleProfileName();\">Log In</a>";
  
}, function(e){
	alert( "Signed out error: " + e.error.message );
});



//input username
function getGoogleProfileName(){
	hello( "google" ).api("me").then(function(json){
        document.getElementById('login-area').innerHTML = "Signed in as <a href='" + json.url + "'>" + json.name + "</a></br><a onclick=\"hello.logout()\">log out</a>";
		/*$(".login-area").html("Signed in as <a href='" + json.url + "'>" + json.name + "</a>");*/
		//$(".login-area").removeClass("no-margin");
		console.log("Your name is "+ json.name + ", " + json.url);
       onApiLoad();
	}, function(e){
		console.log("Whoops! " + e.error.message );
	});
}
    
    //Start Google Picker
    //=============================================
    // The Browser API key obtained from the Google Developers Console.
      

      // The Client ID obtained from the Google Developers Console.

      // Scope to use to access user's photos.
   //   var scope = ['https://www.googleapis.com/auth/drive.readonly'];

      var pickerApiLoaded = false;
      var oauthToken;

      // Use the API Loader script to load google.picker and gapi.auth.
      function onApiLoad() {
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker',{'callback': onPickerApiLoad});
      }

      function onAuthApiLoad() {
         window.gapi.auth.authorize(
            {
              'client_id': CLIENT_ID,
              'scope': SCOPES,
              'immediate': false
            },
            handleAuthResultG);
      }

      function onPickerApiLoad() {
        pickerApiLoaded = true;
      //  createPicker();
      }

      function handleAuthResultG(authResult) {
        
        if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
        }
      }

      // Create and render a Picker object for loading items from drive.
      function createPicker() {
        if (pickerApiLoaded && oauthToken) {
          var picker = new google.picker.PickerBuilder().
              addView(google.picker.ViewId.DOCS).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              build();
          picker.setVisible(true);
        }
      }
    
      function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          url = doc[google.picker.Document.URL];
          
        }
          $.getJSON(url, function(resp) {
    console.log(resp);
    
    
});
        // document.getElementById('result').innerHTML = message;
      }
    //end Google Picker
        
function insertFile(stmtLst) {
       const boundary = '-------314159265358979323846264';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var fileName = 'RebroCommands.txt';
        var contentType = 'application/json';
        var metadata = {
          'title': fileName,
          'mimeType': contentType
        };
        var base64Data = btoa(stmtLst);
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        var request = gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});
        request.execute(function(arg) {
          console.log(arg);
            alert("Commands Saved as RebroCommands.txt");
        });
      };
    

    
    