const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const subtitle = document.getElementById("subtitle");
const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

function setMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.className = "message";
    if (type) {
        element.classList.add(type);
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem("libraryUsers") || "[]");
}

function ensureDefaultAdmin() {
    const users = getUsers();
    const adminExists = users.some(user => user.email.toLowerCase() === "admin@library.com");

    if (!adminExists) {
        users.push({
            name: "Admin",
            email: "admin@library.com",
            phone: "1234567890",
            password: "admin123",
            role: "Admin"
        });
        localStorage.setItem("libraryUsers", JSON.stringify(users));
    }
}

function showRegister() {
    if (loginForm) loginForm.style.display = "none";
    if (registerForm) registerForm.style.display = "block";
    if (subtitle) subtitle.textContent = "Create your account";
    setMessage(loginMessage, "", "");
    setMessage(registerMessage, "", "");
}

function showLogin() {
    if (registerForm) registerForm.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
    if (subtitle) subtitle.textContent = "Welcome back";
    setMessage(loginMessage, "", "");
    setMessage(registerMessage, "", "");
}

function clearUserSession() {
    localStorage.removeItem("libraryUsers");
    sessionStorage.clear();
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
    setMessage(loginMessage, "Logged out successfully.", "success");
    setMessage(registerMessage, "", "");
}

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("registerPhone").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const role = document.getElementById("registerRole").value;

        if (!name || !email || !phone || !password || !role) {
            setMessage(registerMessage, "Please fill all registration fields.", "error");
            return;
        }

        if (password.length < 6) {
            setMessage(registerMessage, "Password must contain at least 6 characters.", "error");
            return;
        }

        const users = getUsers();
        const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
            setMessage(registerMessage, "This email is already registered.", "error");
            return;
        }

        users.push({ name, email, phone, password, role });
        localStorage.setItem("libraryUsers", JSON.stringify(users));

        setMessage(registerMessage, "Registration successful! Please login.", "success");
        registerForm.reset();

        setTimeout(() => showLogin(), 1200);
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const role = document.getElementById("loginRole").value;

        if (!email || !password || !role) {
            setMessage(loginMessage, "Please fill all login fields.", "error");
            return;
        }

        ensureDefaultAdmin();

        const users = getUsers();
        const matchedUser = users.find(user =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password &&
            user.role === role
        );

        if (!matchedUser) {
            setMessage(loginMessage, "Invalid email, password, or role.", "error");
            return;
        }

        setMessage(loginMessage, "Login successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = "../page/dashboard.html";
        }, 500);
    });
}

ensureDefaultAdmin();
