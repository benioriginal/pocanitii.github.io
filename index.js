
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'; // Import auth module
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js'; // Import database module
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
const auth = getAuth(app);
const main = document.getElementById("main")
const registerForm = document.getElementById("login-form"); 

const adsRef = ref(db, 'Ads');

get(adsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const ads = snapshot.val();

      for (const ad in ads) {
        const main = document.getElementById('main')
        console.log(ads[ad].pret)
        main.innerHTML += `
        <div class="ad" onclick="window.location.href='yes.html?title=${encodeURIComponent(ad)}'">
          <img src="${ads[ad].imagini[0]}" alt="" />
          <p>${ad}</p>
          <h1>${ads[ad].pret} Lei</h1>
          <p class="date">${ads[ad].Data}</p>
          <h1 class="${ads[ad].vandut ? 'vandut' : 'nevandut'}">${ads[ad].vandut ? 'VANDUT' : 'NEVANDUT'}</h1>
        </div>
        `;
        

      }
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
