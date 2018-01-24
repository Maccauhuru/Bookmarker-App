/*jshint esversion:6 */
var myForm = document.getElementById("myForm");


const savebookmark = (e) => {
    //save the bookmark
    let siteName = document.getElementById('siteName').value;
    let siteAddress = document.getElementById("siteAddress").value;
   
    //create object array to store on local storage
    let bookmark = {
        name: siteName,
        url: siteAddress
    }

    //test if bookmark object is null in localStorage
    if(localStorage.getItem('bookmarks') == null){
        let bookmarks = [];
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        //get items from localStorage
       let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       bookmarks.push(bookmark);
        //reset to localStorage as string
       localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    //prevent form from submitting
    e.preventDefault();
};


myForm.addEventListener('submit',savebookmark);




//LOCALSTORAGE CRASH COURSE

//work with localStorage
// localStorage.setItem('test','Humpty Dance');
// console.log(localStorage.getItem('test'));
// localStorage.removeItem('test');
// console.log(localStorage.getItem('test'),"item removed");