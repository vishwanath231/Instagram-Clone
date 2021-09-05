// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBs9gIH9eAHIJ4liXl7zJFsKYzP2PSrF14",
    authDomain: "basicform-5b712.firebaseapp.com",
    databaseURL: "https://basicform-5b712-default-rtdb.firebaseio.com",
    projectId: "basicform-5b712",
    storageBucket: "basicform-5b712.appspot.com",
    messagingSenderId: "672972270504",
    appId: "1:672972270504:web:01d3f6857d5dfc001dcb9d"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// DOM Element's
const namevalue = document.querySelector('.name');
const username = document.querySelector('.username');
const gridbox = document.querySelector('.gridbox');
const profileImg = document.querySelector('.profile__img');
const profileBox = document.querySelector('.profile__box');


// DISPLAY USERNAME
namevalue.innerHTML = localStorage.getItem('loginName');
username.innerHTML = localStorage.getItem('loginName');



// PROFILE 
profileImg.addEventListener('click', () => {
     profileBox.classList.toggle('active');
});






// DISPLAY THE POST
function getUserData(){
    firebase.database().ref('instaPost').once('value', function(records){
        let output = '';
        
        records.forEach(data => {
            var image = data.val().Image;
            var id = data.val().Id;

            output += `
            <div class="box">
                <img src="${image}" alt="">
                <i class="fas fa-trash" id=${id} onclick="deletePost(this.id)"></i>
            </div>
            `;
            
        });
        gridbox.innerHTML = output;
    })
}

getUserData();


function deletePost(id){
    firebase.database().ref('instaPost/'+id).remove();
    getUserData();
}







// const likeBtn = document.querySelector('#like__btn');
    
// likeBtn.addEventListener('click', () => {
//     if (likeBtn.classList.contains("far")) {
//         likeBtn.classList.add("fas");
//         likeBtn.classList.remove("far");
//         likeBtn.style.color= "#ED4956";
//     }else{
//         likeBtn.classList.remove("fas");
//         likeBtn.classList.add("far");
//         likeBtn.style.color= "#262626";
//     }
// });