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


const selectImgBtn = document.getElementById('select');
const selectImg = document.getElementById('img');
const progressBar = document.querySelector('.progress__bar');
const commentField = document.getElementById('comment');
const uploadBtn = document.getElementById('upload');
const uploadPercentage = document.querySelector('.upload_percentage');
const imgBox = document.querySelector('.img__box');





let comment, imgURL;
let files = [];
let reader;


// SELECT AND DISPLAY THE IMAGE
selectImgBtn.onclick = (e) => {

    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
        files = e.target.files;
        reader = new FileReader();

        reader.onload = () => {
            imgBox.classList.add('active');
            commentField.classList.add('active');
            selectImg.src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }

    input.click();
}


// UPLOAD THE IMAGE TO FIREBASE
uploadBtn.onclick = () => {
    comment = commentField.value;
    
    var uploadTask = firebase.storage().ref('instagramPost/'+ files[0].name).put(files[0]);

    var random = Math.floor((Math.random() * 1000) + 1);

    var now = new Date();
    var amPM = now.toLocaleString('en-US', {hour:"numeric", minute:"numeric", hour12:true});
    var timeDate = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} || ${amPM}`;


    uploadTask.on('state_changed', 
        function(snapshot){
            var load = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = load +'%';
            uploadPercentage.innerHTML = 'upload &nbsp;'+Math.floor(load)+'%';
        }, 
        function(err){
            alert(err);
        }, 
        function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                imgURL = url;

                firebase.database().ref('instaPost/'+ random).set({
                    Id: random,
                    Image: imgURL,
                    Comments: comment,
                    Time: timeDate 
                }).then(() => {

                    window.location.pathname = "../../inc/home.html";
                });

            });
        }
    )
}