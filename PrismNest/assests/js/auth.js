document.addEventListener("DOMContentLoaded", function () {
  // --- Real Authentication Logic ---

  const loginForm = document.getElementById("loginForm");
  const loginAlert = document.getElementById("loginAlert");
  const signupForm = document.getElementById("signupForm");
  const signupAlert = document.getElementById("signupAlert");

  // --- LOGIN ---
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (loginAlert) loginAlert.classList.add("d-none");

      // --- START FIREBASE LOGIN ---
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Login successful with Firebase!");

          // 1. Fetch user data from local DB using Firebase UID (user.uid)
          const users = getDBUsers();
          const foundUser = users[user.uid];

          if (foundUser) {
            // Save Session Data
            localStorage.setItem("prismnest_loggedIn", "true");
            localStorage.setItem(
              "prismnest_currentUser",
              JSON.stringify(foundUser)
            );

            // Set Profile Defaults for script.js to use
            localStorage.setItem("profile_name", foundUser.name);
            localStorage.setItem("profile_username", foundUser.username);
            localStorage.setItem("profile_pic", foundUser.pic);
            localStorage.setItem("profile_cover", foundUser.cover);
            localStorage.setItem("profile_bio", foundUser.bio);

            window.location.href = "index.php";
          } else {
            // User exists in Firebase but is missing from local DB
            firebase.auth().signOut();
            if (loginAlert) {
              loginAlert.textContent =
                "Account setup incomplete or data missing. Please try signing up again.";
              loginAlert.classList.remove("d-none");
            }
          }
        })
        .catch((error) => {
          let message = "Login failed. Please check your credentials.";
          if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
          ) {
            message = "Invalid email or password.";
          } else if (error.code === "auth/invalid-email") {
            message = "Invalid email format.";
          }

          if (loginAlert) {
            loginAlert.textContent = message;
            loginAlert.classList.remove("d-none");
          }
        });
      // --- END FIREBASE LOGIN ---
    });
  }

  // --- SIGN UP ---
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;

      if (signupAlert) signupAlert.classList.add("d-none");

      // 1. Check password length
      if (password.length < 6) {
        if (signupAlert) {
          signupAlert.textContent = "Password must be at least 6 characters.";
          signupAlert.classList.remove("d-none");
        }
        return;
      }

      // --- START FIREBASE SIGNUP ---
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const users = getDBUsers();

          // Use Firebase UID as the ID/Key for local DB
          const safeId = user.uid;
          const cleanUsername = username.replace(/\s+/g, "");

          const newUser = {
            id: safeId,
            name: username,
            username: "@" + cleanUsername.toLowerCase(),
            email: email,
            password: password,
            bio: "New to PrismNest!",
            cover: "assets/images/background.png",
            pic: "assets/images/temp-profile.jpg",
            followers: [],
            following: [],
          };

          // Save to Local DB
          users[safeId] = newUser;
          saveDBUsers(users);

          // Update Firebase Profile Display Name
          return user.updateProfile({ displayName: username });
        })
        .then(() => {
          // Auto-Login and Redirect
          const currentUserData = getDBUsers()[firebase.auth().currentUser.uid];

          localStorage.setItem("prismnest_loggedIn", "true");
          localStorage.setItem(
            "prismnest_currentUser",
            JSON.stringify(currentUserData)
          );
          localStorage.setItem("profile_name", currentUserData.name);
          localStorage.setItem("profile_username", currentUserData.username);
          localStorage.setItem("profile_pic", currentUserData.pic);

          alert("Account created successfully!");
          window.location.href = "index.php";
        })
        .catch((error) => {
          let message = "Signup failed. Please try again.";
          if (error.code === "auth/email-already-in-use") {
            message = "User with this email already exists.";
          } else if (error.code === "auth/weak-password") {
            message = "Password is too weak. Must be at least 6 characters.";
          }

          if (signupAlert) {
            signupAlert.textContent = message;
            signupAlert.classList.remove("d-none");
          }
        });
      // --- END FIREBASE SIGNUP ---
    });
  }

  // --- AUTH GUARD (Security) ---
  // Logic to kick out non-logged in users
  // Now relies on LocalStorage state set by successful Firebase login
  const protectedPages = [
    "index.php",
    "profile.php",
    "settings.php",
    "notifications.php",
    "search-results.php",
  ];
  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage) || currentPage === "") {
    const isLoggedIn = localStorage.getItem("prismnest_loggedIn");
    if (!isLoggedIn) {
      window.location.href = "login.php";
    }
  }
});
