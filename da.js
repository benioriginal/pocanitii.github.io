
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
// Import other Firebase modules as needed (auth, database, etc.)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'; // Import auth module
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js'; // Import database module
  // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCp6_PsJxlQaAaF04J18RTNDdrac_rPEJA",
    authDomain: "playground-4bbad.firebaseapp.com",
    databaseURL: "https://playground-4bbad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "playground-4bbad",
    storageBucket: "playground-4bbad.appspot.com",
    messagingSenderId: "292222200783",
    appId: "1:292222200783:web:8fe0eef41ee8d4e7f840ba"
  };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let params = new URLSearchParams(window.location.search);
let title = params.get('title');

const images = document.getElementById("images")
const main = document.getElementById("main")
let imagesRef = ref(db, `Ads/${title}/imagini`);
let descRef = ref(db, `Ads/${title}/desc`);
let pretRef = ref(db, `Ads/${title}/pret`);
let soldRef = ref(db, `Ads/${title}/Vandut`);
let dateRef = ref(db, `Ads/${title}/Data`);

let telRef = ref(db, `Ads/${title}/tel`);

let imgs = []

get(imagesRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const urls = snapshot.val();


      urls.forEach((url) => {
        
        imgs.push(url);
      } 
      
      )
    } 
    else {
        console.log("No data available");
    }
    changeImage();
  })
  .catch((error) => {
    console.error(error);
  });


main.innerHTML += `<h3>${title}</h3>`

get(descRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const desc = snapshot.val();


      main.innerHTML += `<p>${desc}  </p>`
      } 
      
      
    } 

   
  )
  .catch((error) => {
    console.error(error);
  });
get(pretRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const desc = snapshot.val();


      main.innerHTML += `<h1>${desc} Lei</h1>`
      } 
      
      
    } 

   
  )
  .catch((error) => {
    console.error(error);
  });
get(dateRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const desc = snapshot.val();


      main.innerHTML += `<h2>${desc}</h2>`
      } 
      
      
    } 

   
  )
  .catch((error) => {
    console.error(error);
  });
  get(soldRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const desc = snapshot.val();

      
      if (desc) {
        main.innerHTML += `<h1 class="vandut">‎ ‎ VANDUT</h1>`
      }
      else {
        main.innerHTML += `<h1 class="nevandut">‎ ‎ NEVANDUT</h1>`
      }
      } 
      
      
    } 
    
    
    )
    .catch((error) => {
      console.error(error);
    });
get(telRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const desc = snapshot.val();
    
    
          main.innerHTML += `<a href="tel:${desc}">Apel / SMS</a>`
          } 
          
          
        } 
    
       
      )
      .catch((error) => {
        console.error(error);
      });
    

let back = document.getElementById("back")
let forw = document.getElementById("forwards")

back.addEventListener("click", function(){
  current -= 1
  console.log(current)
  changeImage()
  
  })
forw.addEventListener("click", function(){
      current+=1
      changeImage()
      console.log(current)
  })
let current = 0
function changeImage(){
    console.log(current)
    console.log(imgs.length)
    if (current === 0){
        back.disabled = true;
        
    }
    else{
        back.disabled = false;
    }
    if (current === imgs.length - 1){
        forw.disabled = true;
    }
    else{
        forw.disabled = false;
    }
    images.innerHTML = `<img draggable="false", src="${imgs[current]}">`
}
