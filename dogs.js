// js/dogs.js

document.addEventListener('DOMContentLoaded', () => {
    const dogCarousel = document.getElementById('dogCarousel');
    const breedsContainer = document.getElementById('dogBreedsContainer');
    const breedInfo = document.getElementById('dogBreedInfo');
    const breedName = document.getElementById('breedName');
    const breedDescription = document.getElementById('breedDescription');
    const breedLifeSpan = document.getElementById('breedLifeSpan');
  
    // Load 10 random dog images
    fetch('https://dog.ceo/api/breeds/image/random/10')
      .then(res => res.json())
      .then(data => {
        data.message.forEach(imgUrl => {
          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = "Dog Image";
          img.style.width = '100%';
          dogCarousel.appendChild(img);
        });
  
        // Initialize simple-slider (or alternative slider)
        if (typeof SimpleSlider === 'function') {
          new SimpleSlider(dogCarousel, {
            autoplay: true,
            interval: 3000
          });
        }
      });
  
    // Load dog breed list
    fetch('https://api.thedogapi.com/v1/breeds')
      .then(res => res.json())
      .then(breeds => {
        breeds.forEach(breed => {
          const btn = document.createElement('button');
          btn.classList.add('custom-btn', 'breed-btn');
          btn.innerText = breed.name;
          btn.addEventListener('click', () => {
            breedName.innerText = breed.name;
            breedDescription.innerText = breed.temperament || "No description available.";
            breedLifeSpan.innerText = `Life Span: ${breed.life_span}`;
            breedInfo.style.display = 'block';
          });
          breedsContainer.appendChild(btn);
        });
      });
  });
  