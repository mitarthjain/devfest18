function socialSignIn(provider) {
  console.log('social sign in');
  console.log(provider);
  var fnError = function (error) {
    // console.log(error);
    if (error && error.message) {
      $("#usererror_modal_body").html(error.message);
    }
    $("#usererror_modal").modal("show");
  };
  var fnSuccess = function (result) {
    console.log("login success");
    console.log(result);
    // check if user is new
    if (result.additionalUserInfo.isNewUser) {
      // create profile from facebook info
      var profile = result.additionalUserInfo.profile;
      var ref = firebase.database().ref("users/" + result.user.uid);
      var email = profile.email;
      var first_name = null;
      if (typeof profile.first_name !== "undefined") {
        first_name = profile.first_name;
      }
      if (typeof profile.given_name !== "undefined") {
        first_name = profile.given_name;
      }
      var last_name = null;
      if (typeof profile.last_name !== "undefined") {
        last_name = profile.last_name;
      }
      if (typeof profile.family_name !== "undefined") {
        last_name = profile.family_name;
      }
      var birthdate = null;
      if (typeof profile.birthdate !== "undefined") {
        birthdate = profile.birthdate;
      }
      var gender = null;
      if (typeof profile.gender !== "undefined") {
        gender = profile.gender;
      }
      // call migrate function
      // console.log('migration ....')
      result.user.getIdToken().then(function (token) {
        // console.log(token);
        jQuery
          .ajax({
            url: "https://i.rappler.com/prod/init",
            method: "GET",
            headers: {
              Authorization: token
            }
          })
          .done(function (data) {
            // console.log('migration done');
            // console.log(data);
            ref
              .update({
                email: email,
                first_name: first_name,
                last_name: last_name,
                birthdate: birthdate,
                gender: gender
              })
              .then(function (user) {
                // console.log("profile created");
                // console.log(user);
                // call i.rappler.com for r_tkn
                jQuery
                  .ajax({
                    url: "https://i.rappler.com/prod/token",
                    method: "GET",
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    },
                    headers: {
                      Authorization: token
                    }
                  })
                  .done(function (data) {
                    // cookie is now set
                  })
              })
              .catch(function (error) {
                console.log("error creating user profile");
                console.log(error);
              });
          });
      });
    } else {
      // user is not new no need to call profile endpoint
      // but we need to get the rappler token
      result.user.getIdToken().then(function (token) {
        jQuery
          .ajax({
            url: "https://i.rappler.com/prod/token",
            method: "GET",
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            headers: {
              Authorization: token
            }
          })
          .done(function (data) {
            // cookie is now set
          })
      });
    }
    // TODO : what to do after succesful login
    // - update the UI to show that the user is logged in
  };
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(fnSuccess)
        .catch(fnError);
    })
    .catch(fnError);
}

function fbSignIn() {
  // console.log('fb provider');
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("user_birthday");
  socialSignIn(provider);
}

function twitterSignIn() {
  // console.log('twitter provider');
  var provider = new firebase.auth.TwitterAuthProvider();
  socialSignIn(provider);
}

function googleSignIn() {
  // console.log('google provider');
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  socialSignIn(provider);
}

function signOut() {
  jQuery
    .ajax({
      url: 'https://i.rappler.com/prod/signout',
      method: "GET",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function () {
      firebase.auth().signOut();
      window.location.reload();
    })
}