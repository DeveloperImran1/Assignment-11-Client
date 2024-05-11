import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// react toast: 
const notify = () => toast("Wow Added Successfully !");
const exist = () => toast.error("Allready Bookmark this Room !");
const remove = () => toast.error("Remove this Room in Bookmarks!");

// get gob key
export const homeGet = () => {
    let homes = [];
    const storedHome = localStorage.getItem('homes');
    if (storedHome) {
        homes = JSON.parse(storedHome);
    }
    return homes;
};


// set or update job;  aikhane localStore a full job er object k set na kore sudho job er id ta set kore dila better hoi. Kinto tokhon stored kora job UI te show korer jonno abar oi id dia fetch kore nia aste hobe.
export const setHome = (home) => {
    let homes = homeGet();
    const isExist = homes.find(j => j._id === home._id);
    if (isExist) {
        return exist()
    }
    homes.push(home);
    const stringHome = JSON.stringify(homes);
    localStorage.setItem('homes', stringHome);
    notify();
}


// remove job in localStorage
export const removeHome = (home) => {
    const homes = homeGet();
    const currentHome = homes.filter(j => j._id !== home._id);
    const stringHome = JSON.stringify(currentHome);
    localStorage.setItem('homes', stringHome);
    remove();
}