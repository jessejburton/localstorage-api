import { ls } from '../localStorageAPI.js'

showUsers()

const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit);

const clearBtn = document.querySelector("#clear")
clearBtn.addEventListener("click", clearUsers);

function handleSubmit(e) {
  e.preventDefault()

  const firstName = form.elements["firstName"].value
  const lastName = form.elements["lastName"].value

  if (firstName.length === 0 || lastName.length === 0) {
    alert("Please enter a first and last name")
    return
  }

  const user = ls.create("users", {
    firstName,
    lastName
  })

  showUsers()
  form.elements["firstName"].value = ""
  form.elements["lastName"].value = ""
}

function clearUsers() {
  ls.deleteCollection("users")
  showUsers()
}

function showUsers() {
  let users = ls.get("users", null, {
    sort: "firstName",
    order: "ASC" // default
  })

  if (!users) {
    users = ls.createCollection("users")
  }
  const tbody = document.querySelector("#users tbody")
  tbody.innerHTML = ""

  users.map(user => {
    const tr = document.createElement("tr")
    const id = document.createElement("td")
    const firstName = document.createElement("td")
    const lastName = document.createElement("td")
    const created = document.createElement("td")

    id.innerHTML = user.id
    firstName.innerHTML = user.firstName
    lastName.innerHTML = user.lastName
    created.innerHTML = dateFormat(user.createdAt)

    tr.appendChild(id)
    tr.appendChild(firstName)
    tr.appendChild(lastName)
    tr.appendChild(created)

    tbody.appendChild(tr)
  })
}

function dateFormat(dateAsString) {
  const date = new Date(dateAsString);

  let hours = date.getHours();
  let ampm = "AM"
  if (hours > 12) {
    hours -= 12
    ampm = "PM"
  }
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let month = date.getMonth() + 1

  return month + "/" + date.getDate() + "/" + date.getFullYear() + " at " + hours + ":" + minutes + " " + ampm;
}