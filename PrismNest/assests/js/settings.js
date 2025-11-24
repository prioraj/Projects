document.addEventListener("DOMContentLoaded", function () {
  // ===================================================================
  // 1. ELEMENT SELECTION
  // ===================================================================
  // Account Management Form
  const accountForm = document.querySelector("#v-pills-account form");
  const emailInput = document.getElementById("email");
  const currentPasswordInput = document.getElementById("currentPassword");
  const newPasswordInput = document.getElementById("newPassword");

  // Privacy & Security Inputs
  const privateAccountSwitch = document.getElementById("privateAccountSwitch");

  // Notifications Inputs
  const newFollowerCheck = document.getElementById("newFollowerCheck");
  const postLikesCheck = document.getElementById("postLikesCheck");
  const postCommentsCheck = document.getElementById("postCommentsCheck");

  const allCheckboxes = [
    privateAccountSwitch,
    newFollowerCheck,
    postLikesCheck,
    postCommentsCheck,
  ];

  // ===================================================================
  // 2. CORE FUNCTIONS
  // ===================================================================

  /**
   * Saves the current state of all settings to localStorage.
   */
  function saveSettings() {
    const settings = {
      email: emailInput.value,
      isPrivate: privateAccountSwitch.checked,
      notifications: {
        newFollowers: newFollowerCheck.checked,
        postLikes: postLikesCheck.checked,
        postComments: postCommentsCheck.checked,
      },
    };

    localStorage.setItem("prismnest_settings", JSON.stringify(settings));
    console.log("Settings saved!");
  }

  /**
   * Loads saved settings from localStorage and applies them to the form inputs.
   */
  function loadSettings() {
    const savedSettings = JSON.parse(
      localStorage.getItem("prismnest_settings")
    );

    if (savedSettings) {
      emailInput.value = savedSettings.email || "your-email@example.com";
      privateAccountSwitch.checked = savedSettings.isPrivate || false;

      if (savedSettings.notifications) {
        newFollowerCheck.checked =
          savedSettings.notifications.newFollowers || false;
        postLikesCheck.checked = savedSettings.notifications.postLikes || false;
        postCommentsCheck.checked =
          savedSettings.notifications.postComments || false;
      }
      console.log("Settings loaded!");
    }
  }

  // ===================================================================
  // 3. EVENT LISTENERS
  // ===================================================================

  // Listen for submissions on the account form
  if (accountForm) {
    accountForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from actually submitting
      saveSettings();
      alert("Account settings saved successfully!");

      // Clear password fields after submission for security
      currentPasswordInput.value = "";
      newPasswordInput.value = "";
    });
  }

  // Listen for changes on all individual switches and checkboxes
  allCheckboxes.forEach((checkbox) => {
    if (checkbox) {
      checkbox.addEventListener("change", saveSettings);
    }
  });

  // ===================================================================
  // 4. INITIAL EXECUTION
  // ===================================================================

  // Load any saved settings as soon as the page is ready
  loadSettings();
});
