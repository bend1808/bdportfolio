// Animation for skill bars
const skillBars =  document.querySelectorAll('.skill-progress'); 
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
} , { threshold: 0.5 });

skillBars.forEach(bar => {
    observer.observe(bar);
});
   
//Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Like Button Functionality
// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, onSnapshot, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCVLmP131L8fPqcFwfSxJeIUXDfWFWD1",
  authDomain: "portfolio-4638d.firebaseapp.com",
  projectId: "portfolio-4638d",
  storageBucket: "portfolio-4638d.appspot.com",
  messagingSenderId: "1057466917851",
  appId: "1:1057466917851:web:992a7821f72e7a5c1c7dfe",
  measurementId: "G-WQ5PV1CNMD"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const likeRef = doc(db, "counters", "portfolio");

const countEl = document.getElementById("likeCount");
const BTN = document.getElementById("likeBtn");
const KEY = "liked_portfolio";

onSnapshot(likeRef, (snap) => {
  countEl.textContent = snap.data()?.likes ?? 0;
});


if (localStorage.getItem(KEY) === "1") BTN.setAttribute("disabled", "");


BTN.addEventListener("click", async () => {
  if (localStorage.getItem(KEY) === "1") return;
  BTN.disabled = true;
  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(likeRef);
      const current = snap.data()?.likes ?? 0;
      tx.update(likeRef, { likes: current + 1 });
    });
    localStorage.setItem(KEY, "1");
  } catch (e) {
    console.error("Like failed:", e);
    BTN.disabled = false;
  }
});
