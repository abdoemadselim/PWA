import app from "/js/initFirebase.js"
import {
    collection,
    onSnapshot,
    getDocs,
    initializeFirestore,
    enableIndexedDbPersistence, 
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Enable offline persistence
const db = getFirestore();
enableIndexedDbPersistence(db)
    .catch(err => {
        if (err.code == "failed-precondition") {
            console.log("failed-precondition");
        } else if (err.code == "unimplemented") {
            console.log("Not supported in this browser");
        } else {
            console.error('Error enabling persistence:', err);
        }
    })

// Get data from the "recipes" collection
async function getRecipes() {
    const recipesCol = collection(db, "recipes");
    const recipesSnapshot = await getDocs(recipesCol);
    const recipes = recipesSnapshot.docs.map((doc) => doc.data());
    return recipes;
}

const data = await getRecipes();

const unsub = onSnapshot(collection(db, "recipes"), (snapshot) => {
    let recipes = snapshot.docChanges().map((change) => ({ recipe: change.doc.data(), id: change.doc.id, changeType: change.type }))

    recipes.forEach(({ changeType, recipe, id }) => {
        switch (changeType) {
            case "added":
                document.querySelector(".recipes").innerHTML += `<div class="card-panel recipe white row" data-id=${id}>
                            <img src="/img/dish.png" alt="recipe thumb" />
                            <div class="recipe-details">
                            <div class="recipe-title">${recipe.title || "great dish"}</div>
                            <div class="recipe-ingredients">${recipe.ingredients || "Great details"}</div>
                            </div>
                            <div class="recipe-delete">
                            <i class="material-icons" data-id=${id}>delete_outline</i>
                            </div>
                        </div>`
                break;
            case "removed":
                break;
        }
    })
});