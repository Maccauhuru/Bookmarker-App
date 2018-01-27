/*jshint esversion:6 */
var myForm = document.getElementById("myForm");


const savebookmark = (e) => {
    //save the bookmark
    let siteName = document.getElementById('siteName').value;
    let siteAddress = document.getElementById("siteAddress").value;

    if(!siteName || !siteAddress){
        alert("Fields cannot be blank");
        return false;
    }
   var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression);

   if(!siteAddress.match(regex)){
alert("Error , enter a valid URL");
return false;
   }


    //create object array to store on local storage
    let bookmark = {
        name: siteName,
        url: siteAddress
    };

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

    //re-fetch bookmarks
    fetchBookmarks();
};


myForm.addEventListener('submit',savebookmark);

//Delete bookmarks
const deleteBookmark = (url)=>{
//get bmarks from local storage
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
for (let i = 0; i < bookmarks.length; i++) {
if(bookmarks[i].url ==url){
   bookmarks.splice(i,1);
}
}
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

//re-fetch bookmarks
fetchBookmarks();
};


//function to fetch bookmarks
const fetchBookmarks = () =>{
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
let bookmarksResults = document.getElementById("bookmarksResults");
bookmarksResults.innerHTML ="";
for(let i=0; i<bookmarks.length;i++){
let name = bookmarks[i].name;
let url = bookmarks[i].url;
bookmarksResults.innerHTML+='<div class="well">'+
                            '<h3>'+name+
                            '<a class="btn btn-default" target="_blank" href="'+url+'">visit</a> '+
                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">delete</a> ' +
                            '</h3>'+
                            '</div>';
}
}





//LOCALSTORAGE CRASH COURSE

//work with localStorage
// localStorage.setItem('test','Humpty Dance');
// console.log(localStorage.getItem('test'));
// localStorage.removeItem('test');
// console.log(localStorage.getItem('test'),"item removed");