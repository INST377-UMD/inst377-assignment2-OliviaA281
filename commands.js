// js/annyang-commands.js
if (annyang) {
    const commands = {
      'hello': () => {
        alert('Hello World');
      },
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        const p = page.toLowerCase();
        if (p === 'home') location.href = 'assignment2_Awumah.html';
        else if (p === 'stocks') location.href = 'stocks.html';
        else if (p === 'dogs') location.href = 'dogs.html';
      },
      'lookup *stock': (stock) => {
        const input = document.querySelector('#stockInput');
        const btn = document.querySelector('#lookupBtn');
        if (input && btn) {
          input.value = stock.toUpperCase();
          btn.click();
        }
      },
      'load dog breed *breed': (breed) => {
        const buttons = document.querySelectorAll('.breed-btn');
        buttons.forEach(btn => {
          if (btn.innerText.toLowerCase() === breed.toLowerCase()) {
            btn.click();
          }
        });
      }
    };
  
    annyang.addCommands(commands);
    annyang.start();
  }
  