const ds = LocalStorageAPI
showUsers()

const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault()

  firstName = form.elements["firstName"].value
  lastName = form.elements["lastName"].value

  if (firstName.length === 0 || lastName.length === 0) {
    alert("Please enter a first and last name")
    return
  }

  const user = ds.create("users", {
    firstName,
    lastName
  })

  showUsers()
  form.elements["firstName"].value = ""
  form.elements["lastName"].value = ""
}

function clearUsers() {
  ds.deleteCollection("users")
  console.log("here")
  showUsers()
}

function showUsers() {
  let users = ds.get("users")
  if (!users) {
    users = ds.createCollection("users")
  }
  const tbody = document.querySelector("#users tbody")
  tbody.innerHTML = ""

  users.map(user => {
    const tr = document.createElement("tr")
    const firstName = document.createElement("td")
    const lastName = document.createElement("td")

    firstName.innerHTML = user.firstName
    lastName.innerHTML = user.lastName

    tr.appendChild(firstName)
    tr.appendChild(lastName)

    tbody.appendChild(tr)
  })
}