//contructor for making book objects


const testtitle2 = new Book('Examplebook', 'Great Author', '9001', false);

//to add book create  div containing book info
let myLibrary = [];
const librarydisplay = document.querySelector('.librarydisplay');
const form = document.forms[0]
const addBookButton = document.getElementById('addBook');
const closeFormButton = document.getElementById('closeForm');
const submitSuccessMessage = document.getElementById('submitSuccess');
console.log(librarydisplay);


//test code//
addBookToLibrary(testtitle2);
console.log(myLibrary)
//end test code//

closeFormButton.addEventListener('click', (event)=> {
    event.preventDefault();
    console.log('closebutton hit');
    form.style.visibility = "hidden";
});

form.addEventListener("submit",function(event){
    event.preventDefault(); //get info from form
    const formData = new FormData(this);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
    const title = new Book(data.title, data.author, data.pages, Boolean(data.read));
    submitSuccessMessage.textContent =  data.title + " successfully added!";
    addBookToLibrary(title);
    console.log(title);
});
addBookButton.addEventListener('click', showForm);

function showForm(){
    form.style.visibility ="visible";
} 


function createBookCard(book){ //currently p 
    const bookCard = document.createElement("div"); //create div
    bookCard.id = book.Title; //assign id to div with the book title
    bookContent(book);
    console.log("bookinfo  " + book.Read);  
    function bookContent(e) {
        for (let i=0; i < Object.values(e).length-2; i++){
            let newline = document.createElement("ul");
            newline.textContent = Object.keys(book)[i] + `:\t` + Object.values(e)[i];
            bookCard.appendChild(newline);
            console.log(e[i]);}}; 
    
    // text content is the array of the book object 
    const removeButton = document.createElement('button')
    const readButton = document.createElement('button')
    removeButton.textContent = "Remove";
    readButton.textContent= book.Read? "Read":"Not Read";
    readButton.style.backgroundColor = book.Read? 'green':'red';
    readButton.addEventListener('click', () => {
        book.Read = !book.Read
        readButton.textContent= book.Read? "Read":"Not Read";
        readButton.style.backgroundColor = book.Read? 'green':'red';
    })

    removeButton.addEventListener('click',()=>bookCard.remove())
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);//add remove function
    librarydisplay.appendChild(bookCard); //replace with addbooktolibrary
    //just create element for now
}


function Book(title, author, pages, read){
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
    this.info = () => {
        return [this.title, this.author, this.pages, this.read];
    }
}

function addBookToLibrary (booktitle){
    myLibrary.push(booktitle);
    createBookCard(booktitle);
}
