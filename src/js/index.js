import "../sass/styles.scss";
import 'bootstrap';
import { PageList } from "./PageList";
import { routes } from "./routes";

let pageArgument;

const keyino = prompt("What's your key ?");

// Prevent the form from being sent with an event handler
document.getElementById('submit-btn').onclick = (e) => {
  e.preventDefault();
  let stringSearch = document.getElementById('searchbar').value;
  stringSearch = stringSearch.toLowerCase().replace(/\s+/g, "-");
  window.location.hash=`#game/${stringSearch}`;
}


// Cuts the original url and splits it to manipulate it
const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  routes[path[0]](pageArgument);
  return true;
};

// Intersection Observer exported in PageList
const CreateInspector = () => {
  const allGames = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px",
  };

  const pastScroll = new IntersectionObserver((
    entries,
    pastScroll
    ) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting){
          return;
        } else {
          entry.target.classList.add('appear');
          pastScroll.unobserve(entry.target);
        }
      })
    }, options)

  allGames.forEach(game => {
    pastScroll.observe(game);
  })
}

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

export { CreateInspector , keyino};
