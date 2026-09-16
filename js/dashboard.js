let books =
    JSON.parse(localStorage.getItem("books")) || [];

let members =
    JSON.parse(localStorage.getItem("members")) || [];

let issues =
    JSON.parse(localStorage.getItem("issues")) || [];





function showSection(sectionId, button) {

    document.querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document.getElementById(sectionId)
        .classList.add("active");


    document.querySelectorAll(".menu button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    let titles = {

        dashboard: "Dashboard",

        books: "Book Management",

        members: "Member Management",

        issue: "Issue Book",

        return: "Return Book",

        reports: "Reports",

        about: "About"

    };


    document.getElementById("pageTitle")
        .textContent = titles[sectionId];


    updateAll();

}



/* =====================================================
   BOOK MANAGEMENT
===================================================== */

document.getElementById("bookForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    let id =
        document.getElementById("bookId").value.trim();

    let name =
        document.getElementById("bookName").value.trim();

    let author =
        document.getElementById("author").value.trim();

    let category =
        document.getElementById("category").value.trim();

    let publisher =
        document.getElementById("publisher").value.trim();

    let year =
        document.getElementById("year").value;

    let quantity =
        Number(document.getElementById("quantity").value);


    let editIndex =
        document.getElementById("editBookIndex").value;


    if (quantity <= 0) {

        showMessage(
            "bookMessage",
            "Quantity must be greater than zero.",
            "error"
        );

        return;
    }


    let duplicate =
        books.some((book, index) =>
            book.id === id &&
            index != editIndex
        );


    if (duplicate) {

        showMessage(
            "bookMessage",
            "Book ID must be unique.",
            "error"
        );

        return;
    }


    let book = {

        id,
        name,
        author,
        category,
        publisher,
        year,
        quantity

    };


    if (editIndex === "") {

        books.push(book);

        showMessage(
            "bookMessage",
            "Book added successfully!",
            "success"
        );

    } else {

        books[editIndex] = book;

        showMessage(
            "bookMessage",
            "Book updated successfully!",
            "success"
        );

    }


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    this.reset();

    document.getElementById("editBookIndex")
        .value = "";


    displayBooks();

    updateAll();

});



/* DISPLAY BOOKS */

function displayBooks() {

    let table =
        document.getElementById("bookTable");


    let search =
        document.getElementById("bookSearch")
        .value
        .toLowerCase();


    table.innerHTML = "";


    books
        .filter(book =>
            book.name.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search) ||
            book.category.toLowerCase().includes(search)
        )
        .forEach((book, index) => {

            table.innerHTML += `

                <tr>

                    <td>${book.id}</td>

                    <td>${book.name}</td>

                    <td>${book.author}</td>

                    <td>${book.category}</td>

                    <td>${book.publisher}</td>

                    <td>${book.year}</td>

                    <td>${book.quantity}</td>


                    <td>


                        <button
                            class="action-btn edit"
                            onclick="editBook(${index})">
                            Edit
                        </button>

                        <button
                            class="action-btn delete"
                            onclick="deleteBook(${index})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });

}



/* EDIT BOOK */

function editBook(index) {

    let book = books[index];


    document.getElementById("bookId")
        .value = book.id;

    document.getElementById("bookName")
        .value = book.name;

    document.getElementById("author")
        .value = book.author;

    document.getElementById("category")
        .value = book.category;

    document.getElementById("publisher")
        .value = book.publisher;

    document.getElementById("year")
        .value = book.year;

    document.getElementById("quantity")
        .value = book.quantity;


    document.getElementById("editBookIndex")
        .value = index;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* DELETE BOOK */

function deleteBook(index) {

    if (
        confirm(
            "Are you sure you want to delete this book?"
        )
    ) {

        books.splice(index, 1);


        localStorage.setItem(
            "books",
            JSON.stringify(books)
        );


        displayBooks();

        updateAll();

    }

}



/* =====================================================
   MEMBER MANAGEMENT
===================================================== */

document.getElementById("memberForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    let id =
        document.getElementById("memberId")
        .value.trim();

    let name =
        document.getElementById("memberName")
        .value.trim();

    let department =
        document.getElementById("department")
        .value.trim();

    let email =
        document.getElementById("email")
        .value.trim();

    let mobile =
        document.getElementById("mobile")
        .value.trim();


    let editIndex =
        document.getElementById("editMemberIndex")
        .value;


    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showMessage(
            "memberMessage",
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        showMessage(
            "memberMessage",
            "Mobile number must contain exactly 10 digits.",
            "error"
        );

        return;

    }


    let duplicate =
        members.some((member, index) =>
            member.id === id &&
            index != editIndex
        );


    if (duplicate) {

        showMessage(
            "memberMessage",
            "Member ID must be unique.",
            "error"
        );

        return;

    }


    let member = {

        id,
        name,
        department,
        email,
        mobile

    };


    if (editIndex === "") {

        members.push(member);

        showMessage(
            "memberMessage",
            "Member added successfully!",
            "success"
        );

    } else {

        members[editIndex] = member;

        showMessage(
            "memberMessage",
            "Member updated successfully!",
            "success"
        );

    }


    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );


    this.reset();


    document.getElementById("editMemberIndex")
        .value = "";


    displayMembers();

    updateAll();

});



/* DISPLAY MEMBERS */

function displayMembers() {

    let table =
        document.getElementById("memberTable");


    let search =
        document.getElementById("memberSearch")
        .value
        .toLowerCase();


    table.innerHTML = "";


    members
        .filter(member =>
            member.name.toLowerCase().includes(search) ||
            member.department.toLowerCase().includes(search) ||
            member.id.toLowerCase().includes(search)
        )
        .forEach((member, index) => {

            table.innerHTML += `

                <tr>

                    <td>${member.id}</td>

                    <td>${member.name}</td>

                    <td>${member.department}</td>

                    <td>${member.email}</td>

                    <td>${member.mobile}</td>

                    <td>

                        <button
                            class="action-btn edit"
                            onclick="editMember(${index})">
                            Edit
                        </button>

                        <button
                            class="action-btn delete"
                            onclick="deleteMember(${index})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });

}



/* EDIT MEMBER */

function editMember(index) {

    let member = members[index];


    document.getElementById("memberId")
        .value = member.id;

    document.getElementById("memberName")
        .value = member.name;

    document.getElementById("department")
        .value = member.department;

    document.getElementById("email")
        .value = member.email;

    document.getElementById("mobile")
        .value = member.mobile;


    document.getElementById("editMemberIndex")
        .value = index;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* DELETE MEMBER */

function deleteMember(index) {

    if (
        confirm(
            "Are you sure you want to delete this member?"
        )
    ) {

        members.splice(index, 1);


        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );


        displayMembers();

        updateAll();

    }

}



/* =====================================================
   ISSUE BOOK
===================================================== */

function loadIssueOptions() {

    let memberSelect =
        document.getElementById("issueMember");

    let bookSelect =
        document.getElementById("issueBook");


    memberSelect.innerHTML =
        `<option value="">Select Member</option>`;

    bookSelect.innerHTML =
        `<option value="">Select Book</option>`;


    members.forEach((member, index) => {

        memberSelect.innerHTML += `

            <option value="${index}">
                ${member.id} - ${member.name}
            </option>

        `;

    });


    books.forEach((book, index) => {

        if (book.quantity > 0) {

            bookSelect.innerHTML += `

                <option value="${index}">
                    ${book.id} - ${book.name}
                </option>

            `;

        }

    });

}



/* ISSUE FORM */

document.getElementById("issueForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    let memberIndex =
        document.getElementById("issueMember")
        .value;


    let bookIndex =
        document.getElementById("issueBook")
        .value;


    let issueDate =
        document.getElementById("issueDate")
        .value;


    let returnDate =
        document.getElementById("returnDate")
        .value;


    if (
        memberIndex === "" ||
        bookIndex === ""
    ) {

        showMessage(
            "issueMessage",
            "Please select a member and book.",
            "error"
        );

        return;

    }


    let book =
        books[bookIndex];


    if (book.quantity <= 0) {

        showMessage(
            "issueMessage",
            "Book is currently unavailable.",
            "error"
        );

        return;

    }


    let member =
        members[memberIndex];


    book.quantity--;


    issues.push({

        memberId: member.id,

        memberName: member.name,

        bookId: book.id,

        bookName: book.name,

        issueDate,

        returnDate,

        status: "Issued"

    });


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    localStorage.setItem(
        "issues",
        JSON.stringify(issues)
    );


    this.reset();


    showMessage(
        "issueMessage",
        "Book issued successfully!",
        "success"
    );


    displayIssues();

    updateAll();

    loadIssueOptions();

});



/* DISPLAY ISSUES */

function displayIssues() {

    let table =
        document.getElementById("issueTable");


    table.innerHTML = "";


    issues
        .filter(issue =>
            issue.status === "Issued"
        )
        .forEach(issue => {

            table.innerHTML += `

                <tr>

                    <td>${issue.memberName}</td>

                    <td>${issue.bookName}</td>

                    <td>${issue.issueDate}</td>

                    <td>${issue.returnDate}</td>

                    <td>
                        <strong style="color:#dc2626">
                            ${issue.status}
                        </strong>
                    </td>

                </tr>

            `;

        });

}



/* =====================================================
   RETURN BOOK
===================================================== */

function displayReturns() {

    let table =
        document.getElementById("returnTable");


    table.innerHTML = "";


    issues
        .forEach((issue, index) => {

            if (issue.status === "Issued") {

                table.innerHTML += `

                    <tr>

                        <td>${issue.memberName}</td>

                        <td>${issue.bookName}</td>

                        <td>${issue.issueDate}</td>

                        <td>${issue.returnDate}</td>

                        <td>

                            <button
                                class="action-btn delete"
                                onclick="returnBook(${index})">

                                Return

                            </button>

                        </td>

                    </tr>

                `;

            }

        });

}




function returnBook(index) {

    if (
        !confirm(
            "Confirm book return?"
        )
    ) {
        return;
    }


    let issue =
        issues[index];


    let book =
        books.find(
            book =>
                book.id === issue.bookId
        );


    if (book) {

        book.quantity++;

    }


    issue.status = "Returned";


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    localStorage.setItem(
        "issues",
        JSON.stringify(issues)
    );


    showMessage(
        "returnMessage",
        "Book returned successfully!",
        "success"
    );


    displayReturns();

    displayIssues();

    updateAll();

    loadIssueOptions();

}




function updateReports() {

    let totalBooks =
        books.reduce(
            (sum, book) =>
                sum + Number(book.quantity),
            0
        );


    let issued =
        issues.filter(
            issue =>
                issue.status === "Issued"
        ).length;


    let available =
        totalBooks - issued;


    document.getElementById("totalBooks")
        .textContent = totalBooks;


    document.getElementById("totalMembers")
        .textContent = members.length;


    document.getElementById("availableBooks")
        .textContent = available;


    document.getElementById("issuedBooks")
        .textContent = issued;
    

    document.getElementById("reportBooks")
        .textContent = totalBooks;


    document.getElementById("reportMembers")
        .textContent = members.length;


    document.getElementById("reportAvailable")
        .textContent = available;


    document.getElementById("reportIssued")
        .textContent = issued;

}



function showMessage(
    id,
    text,
    type
) {

    let message =
        document.getElementById(id);


    message.textContent = text;


    message.className =
        "message " + type;


    setTimeout(() => {

        message.className =
            "message";

    }, 3000);

}




function updateAll() {

    displayBooks();

    displayMembers();

    displayIssues();

    displayReturns();

    loadIssueOptions();

    updateReports();

}


function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        sessionStorage.clear();

        window.location.href ="../page/login.html";

    }

}





updateAll();


