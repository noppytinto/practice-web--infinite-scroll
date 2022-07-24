
const mainPhotosElement = document.querySelector('.main__photos');
console.log('ELEMENT',mainPhotosElement);






/////////////////////////
// LOGIC
/////////////////////////

(async ()=> {
    await attachPhoto();
})();



/////////////////////////
// FUNCTIONS
/////////////////////////

async function attachPhoto() {
    try {
        // fetching
        const urlPhoto = await fetchUrlPhoto();

        // creating photo element
        const photoElement = createPhotoElement();
        photoElement.src = urlPhoto;
        photoElement.addEventListener('load', (event) => {
            console.log('photo loaded!');
            mainPhotosElement.append(photoElement);

            // adding intersection
            const callback = (entries, observer) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    console.log('INTERSECTING');
                    observer.unobserve(entry.target);
                    attachPhoto();

                }
            }

            attachIntersectionObserver(photoElement, callback);

        });

        //

    } catch (err) {
        console.log('ERROR:', err);
    }
}

async function fetchUrlPhoto() {
    const API_KEY = '?client_id=Ysf60Jr7uiOeky0KrSZZ9ySQCKNT2UFk2Nh3GwfPbes';
    const API_BASE_URL = 'https://api.unsplash.com';
    const RANDOM_PHOTOS_PATH = '/photos/random';
    const RANDOM_PHOTOS_URL = API_BASE_URL + RANDOM_PHOTOS_PATH + API_KEY;

    const response = await fetch(RANDOM_PHOTOS_URL);
    if (!response.ok) throw new Error('Error Fetching Image');
    const data = await response.json();

    return data.urls.small;
}





function createPhotoElement(urlPhoto) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('photo');


    return photoElement;
}

function createPhotoElement_2(urlPhoto) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('photo');
    photoElement.src = urlPhoto;
    photoElement.addEventListener('load', (event) => {
        console.log('photo loaded!');
        attachIntersectionObserver(photoElement);
    });

    return photoElement;
}

function attachIntersectionObserver(element, callback) {
    const options = {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    // const coords = element.getBoundingClientRect();
    // const x = coords.x;
    // const y = coords.y;
}