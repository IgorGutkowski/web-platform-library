var tableBody = document.getElementById('table-body');
var form = document.getElementById('form');
var title = document.getElementById('title');
var author = document.getElementById('author');
var releaseDate = document.getElementById('release-date');
var isEditMode = false;
var rowToEdit;

document.getElementById('release-date').type = 'date';
document.getElementById('release-date').style.width = '170px';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!isEditMode) {
    var row = document.createElement('tr');
    var titleColumn = document.createElement('td');
    titleColumn.innerHTML = title.value;
    var authorColumn = document.createElement('td');
    authorColumn.innerHTML = author.value;
    var releaseDateColumn = document.createElement('td');
    releaseDateColumn.innerHTML = releaseDate.value;
    var options = document.createElement('td');
    options.setAttribute('class', 'options');

    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.innerHTML = 'Usuń';

    var editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    editButton.innerHTML = 'Edytuj';

    options.appendChild(deleteButton);
    options.appendChild(editButton);
    row.appendChild(titleColumn);
    row.appendChild(authorColumn);
    row.appendChild(releaseDateColumn);
    row.appendChild(options);

    deleteButton.addEventListener('click', () => {
      if (confirm('Czy na pewno chcesz usunąć książkę?')) {
        let rowToDelete = deleteButton.closest('tr');
        rowToDelete.remove();
      }
    });

    editButton.addEventListener('click', () => {
      if (confirm('Czy na pewno chcesz przejść w tryb edycji?')) {
        isEditMode = true;
        rowToEdit = editButton.closest('tr');
        rowToEdit.style.backgroundColor = 'rgb(230,230,230)';
        let options = document.querySelectorAll('.options');
        Array.from(options).forEach((element) => {
           element.style.display = 'none';
          });
        let columns = rowToEdit.childNodes;
        title.value = columns[0].innerHTML;
        author.value = columns[1].innerHTML;
        releaseDate.value = columns[2].innerHTML;
        form.getElementsByTagName('button')[0].innerHTML = 'Aktualizuj książkę';
      }
    });

    tableBody.appendChild(row);
  } else {
    let columns = rowToEdit.childNodes;
    columns[0].innerHTML = title.value;
    columns[1].innerHTML = author.value;
    columns[2].innerHTML = releaseDate.value;
    form.getElementsByTagName('button')[0].innerHTML = 'Dodaj książkę';
    isEditMode = false;
    rowToEdit.style.backgroundColor = 'rgb(255,255,255)';
    let options = document.querySelectorAll('.options');
    Array.from(options).forEach((element) => {
      element.style.display = 'table-cell';
    });
  }

  form.reset();
});
