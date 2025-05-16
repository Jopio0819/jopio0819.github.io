const BASE_URL = "https://script.google.com/macros/s/AKfycbwDMXDkJ1QMI6SpBXOq-CURF2fMAqgPpeTUvuQ8eKdh_Hr2-KMQLcWnVKSR5y4I5foOpA/exec";

function sendCode() {
  const email = document.getElementById("email").value;
  fetch(BASE_URL + "?path=sendEmailCode", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    alert("Code sent to email!");
    document.getElementById("verifySection").style.display = "block";
    sessionStorage.setItem("email", email);
  });
}

function verifyCode() {
  const email = sessionStorage.getItem("email");
  const code = document.getElementById("code").value;

  fetch(BASE_URL + "?path=verifyEmailCode", {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json()).then(data => {
    if (data.success) {
      sessionStorage.setItem("token", data.token);
      window.location.href = "link_roblox.html";
    } else {
      alert("Code is invalid.");
    }
  });
}

function registerRoblox() {
  const token = sessionStorage.getItem("token");
  const username = document.getElementById("robloxUsername").value;

  fetch(BASE_URL + "?path=registerRoblox", {
    method: "POST",
    body: JSON.stringify({ token, username }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json()).then(data => {
    if (data.success) {
      document.getElementById("linkInfo").style.display = "block";
      document.getElementById("linkCode").textContent = data.code;
    } else {
      alert("Something went wrong while linking.");
    }
  });
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}

function createToken() {
  const token = sessionStorage.getItem("token");

  fetch(BASE_URL + "?path=checkPremium", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json()).then(data => {
    if (!data.success) {
      document.getElementById("notPremium").style.display = "block";
      return;
    }

    document.getElementById("premiumSection").style.display = "block";
    document.getElementById("notPremium").style.display = "none";

    fetch(BASE_URL + "?path=generateToken", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json()).then(data => {
      document.getElementById("apiToken").textContent = data.apiToken;
      sessionStorage.setItem("apiToken", data.apiToken);
    });
  });
}

function submitData() {
  const apiToken = sessionStorage.getItem("apiToken");
  const key = document.getElementById("dataKey").value;
  const value = document.getElementById("dataValue").value;

  fetch(BASE_URL + "?path=submitData", {
    method: "POST",
    body: JSON.stringify({ apiToken, key, value }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json()).then(data => {
    if (data.success) {
      alert("Data submitted!");
    } else {
      alert("Invalid API token.");
    }
  });
}
