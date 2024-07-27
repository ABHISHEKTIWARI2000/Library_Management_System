// console.log('hello')

//function to take book detail constructor
showData();
//Add method to display prototype
// var i = 0;
Display.prototype.add = function (book) {
    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(book);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    // console.log(book.title);
    // i = i + 1;    
    tableBody = document.getElementById('tableBody');
    showData();
}
function Book(title, author, type) {
    this.title = title;
    this.author = author;
    this.type = type;
}

//function to display 
function Display() {

}

function showData(){
    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    // notesObj.push(book);
    // localStorage.setItem("notes",JSON.stringify(notesObj));
    let uistring="";
    notesObj.forEach(function(element,index) {
        uistring += `<tr>
                        <th scope="row">${index+1}</th>
                        <th>${element.title}</th>
                        <th>${element.author}</th>
                        <th>${element.type}</th>
                        <th><button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button></th>
                    </tr>`
        
    });
    let tableBody=document.getElementById("tableBody");
    if(notesObj.length>=0){
        tableBody.innerHTML = uistring;
    }
    
}

//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//Implement the validate function
Display.prototype.validate = function (book) {
    if (book.title.length < 3 || book.author.length < 3) {
        return false;
    }
    else {
        return true;
    }
}
//Implement the show function
Display.prototype.show = function (type, message) {
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong>${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    setTimeout(() => {
        alert.innerHTML = "";
    }, 1000);
}



//Add submit event listerner for libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log('submit')
        let title = document.getElementById('bookName').value;
        let author = document.getElementById('author').value;
        let type;
        let ee = document.getElementById('EE');
        let cse = document.getElementById('CSE');
        let it = document.getElementById('IT');
        let civil = document.getElementById('civil');
        let me = document.getElementById('ME');
        
        if (ee.checked) {
            type = ee.value;
        }
        else if (cse.checked) {
            type = cse.value;
        }
        else if (it.checked) {
            type = it.value;
        }
        else if (civil.checked) {
            type = civil.value;
        }
        else if (me.checked) {
            type = me.value;
        }
        let book = new Book(title, author, type);
    
        // console.log(book)
        let display = new Display(); 
        if (display.validate(book)) {
            display.add(book);
            display.clear();
            display.show('success', 'Thanks for Your Service');
        }
        else {
            display.show('danger', 'Sorry! Books detail is invalid. Please Enter valid Data');
        }
    e.preventDefault();
}
// delete value to local storage
function deleteNote(index){
    // console.log('delete', index);

    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showData();
}
