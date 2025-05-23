import { getAllDecks, createDeck, updateDeck, deleteDeck } from "./api.js";

let tableBody = document.querySelector('#decks-table tbody');
let form = document.getElementById('create-deck-form');
let input = document.getElementById('new-deck-name');

async function displayDecks() {
  tableBody.innerHTML = '';
  try {
    var decks = await getAllDecks();
  } catch (error) {
    alert('Error: Unable to get decks');
  }
  for (let i = 0; i < decks.length; i++) {
    let deck = decks[i];
    let row = document.createElement('tr');
    row.setAttribute('data-id', deck.deckId);
    let nameCell = document.createElement('td');
    nameCell.innerHTML =
    `
      <p>${deck.name}</p>
    `
    row.appendChild(nameCell);
    addButtons(row);
    tableBody.appendChild(row);
  }
}

function addButtons(row) {
  let buttonCell = document.createElement('td');
  buttonCell.innerHTML =
    `
    <button class="btn btn-success start-btn me-2 mb-2">Start</button>
    <button class="btn btn-warning rename-btn me-2 mb-2">Rename</button>
    <button class="btn btn-primary manage-btn me-2">Manage</button>
    <button class="btn btn-danger delete-btn">Delete</button>
  `
  let startBtn = buttonCell.querySelector('.start-btn');
  startBtn.onclick = function() {
    let deckId = row.getAttribute('data-id');
    window.location = `pages/review-cards.html?deckId=${deckId}`
  };

  let manageBtn = buttonCell.querySelector('.manage-btn');
  manageBtn.onclick = function() {
    let deckId = row.getAttribute('data-id');
    window.location = `pages/manage-cards.html?deckId=${deckId}`;
  }

  let renameBtn = buttonCell.querySelector('.rename-btn');
  renameBtn.onclick = async function () {
    let deckId = row.getAttribute('data-id');
    let newName = prompt("Enter new name for the deck:");
    if (newName) {
      try {
        await updateDeck(deckId, newName);
        await displayDecks();
      } catch (error) {
        alert('Error: Unable to update deck');
      }
    }
  }

  let deleteBtn = buttonCell.querySelector('.delete-btn');
  deleteBtn.onclick = async function () {
    if (confirm("Do you want to delete this deck and associated cards?")) {
      let deckId = row.getAttribute('data-id');
      try {
        await deleteDeck(deckId);
        await displayDecks();
      } catch (error) {
        alert('Error: Unable to delete deck');
      }
    }
  }

  row.appendChild(buttonCell);
}

form.onsubmit = async function (e) {
  e.preventDefault();
  let name = input.value.trim();
  if (!name) {
    alert('Please enter a name for the deck');
    return;
  }
  try {
    await createDeck(name);
    input.value = '';
    await displayDecks();
  } catch (error) {
    alert('Error: Unable to create deck');
  }
};

document.addEventListener('DOMContentLoaded', displayDecks);
