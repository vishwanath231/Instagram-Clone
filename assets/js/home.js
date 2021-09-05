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
const postContainer = document.querySelector('.post__container');
const storyContainerUL = document.querySelector('.story__container_ul');
const rightBox = document.querySelector('.right__box');
const userPostContainer = document.querySelector('.user__post_container');
const profileImg = document.querySelector('.profile__img');
const profileBox = document.querySelector('.profile__box');

// PROFILE 
profileImg.addEventListener('click', () => {
     profileBox.classList.toggle('active');
});



// LOGIN USERNAME 
var post__username = localStorage.getItem('loginName');


// DISPLAY THE POST
function getUserData(){
    firebase.database().ref('instaPost').orderByChild('Time').limitToLast(1).on('value', function(records){

        let output = '';

        records.forEach(data => {
            var image = data.val().Image;
            var comment = data.val().Comments;
            var postID = data.val().Id;

            output += `
                <div class="post__box">
                    <div class="post__header">
                        <a href="account/cleverqazi.html" class="post__profile_container">
                            <div class="post__profile">
                                <img src="../assets/img/profile.jpg" alt="">
                            </div>
                            <div class="post__username">${post__username}</div>
                        </a>
                        <div class="post__dot">
                            <i class="fas fa-times" id=${postID} onclick="dotFun(this.id)"></i>
                        </div>
                    </div>
                    <div class="post__img">
                        <img src="${image}" alt="">
                    </div>
                    <div class="post__like">
                        <ul>
                            <li>
                                <i id="like__btn" class="far fa-heart "></i>
                            </li>
                            <li>
                                <svg aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                            </li>
                            <li>
                                <svg aria-label="Share Post" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                            </li>
                        </ul>
                        <div>
                            <svg aria-label="Save" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                        </div>
                    </div>

                    <div class="comments_info"><span class="post__com_user">${post__username}</span> ${comment}</div>

                    <div class="post__comment">
                        <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
                        <form class="commentForm" onsubmit="commentForm(this)">
                            <input type="text" placeholder="Add a comment">
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </div>
            `;
        });

        userPostContainer.innerHTML = output;
    })
}

getUserData();







// ALREADY INSET THE POST
function getData(){
    firebase.database().ref('pictures').once('value', function(records){
        let output = '';
        let output_1 = '';
        let output_2 = '';

        records.forEach(data => {
            var image = data.val().Image;
            var name = data.val().name;
            var comment = data.val().Comments;
            var profile = data.val().profile;

            output += `
            
                <div class="post__box">
                    <div class="post__header">
                        <a class="post__profile_container">
                            <div class="post__profile">
                                <img src="${profile}" alt="">
                            </div>
                            <div class="post__username">${name}</div>
                        </a>
                        <div class="post__dot">
                            <svg aria-label="More options" class="_8-yf5 " fill="#262626" height="16" role="img" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
                        </div>
                    </div>
                    <div class="post__img">
                        <img src="${image}" alt="">
                    </div>
                    <div class="post__like">
                        <ul>
                            <li>
                                <i id="like__btn" class="far fa-heart "></i>
                            </li>
                            <li>
                                <svg aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                            </li>
                            <li>
                                <svg aria-label="Share Post" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                            </li>
                        </ul>
                        <div>
                            <svg aria-label="Save" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                        </div>
                    </div>

                    <div class="comments_info"><span class="post__com_user">${name}</span> ${comment}</div>

                    <div class="post__comment">
                        <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
                        <form class="commentForm">
                            <input type="text" placeholder="Add a comment" id="comment">
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </div>
            `;

            output_1 += `
                <li>
                    <img src="${profile}" alt="">
                    <div class="uname">${name}</div>
                </li>
            `;

            output_2 += `
                <div class="suggestion">
                    <a href="account/cleverqazi.html" class="user__info">
                        <img src="${profile}" alt="">
                        <div class="info">
                            <div class="name">${name}</div>
                            <p>Follows You</p>
                        </div>
                    </a>
                    <a href="#">Follow</a>
                </div>
            `;

        });
        postContainer.innerHTML = output;
        storyContainerUL.innerHTML  =output_1;
        rightBox.innerHTML  =output_2;
    })
}
getData();


   
// DELETE THE POST
function dotFun(id){
    firebase.database().ref('userPost/'+id).remove();
    getUserData();
}



