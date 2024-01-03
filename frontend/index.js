// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 
  
        let allGrid = document.querySelectorAll('.square');
        allGrid.forEach(square => square.classList.remove('targeted'))
        square.classList.add('targeted')
          
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈

    if (evt.key === keys.up){//arrow up!
      let currentSquare = document.querySelector('.targeted');
      let rowX = currentSquare.parentElement
      let rowY = currentSquare.parentElement.previousElementSibling
    
      if (rowY) {
        const i = Array.from(rowX.children).indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        rowY.children[i].classList.add('targeted') 
      }
    }

    if (evt.key === keys.down){//Arrow down!
      let currentSquare = document.querySelector('.targeted');
      let rowX = currentSquare.parentElement
      let rowY = currentSquare.parentElement.nextElementSibling

      if (rowY){
        const i = Array.from(rowX.children).indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        rowY.children[i].classList.add('targeted') 
      }
    }

    if (evt.key === keys.left){//Arrow left!
      let currentSquare = document.querySelector('.targeted');
      let columnY = currentSquare.previousElementSibling

      if(columnY){
        currentSquare.classList.remove('targeted');
        columnY.classList.add('targeted')
      } 
    }

    if (evt.key === keys.right){//Arrow right!
      let currentSquare = document.querySelector('.targeted');
      let columnY = currentSquare.nextElementSibling

      if(columnY){
        currentSquare.classList.remove('targeted');
        columnY.classList.add('targeted')
      } 
    }


    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    if (evt.key === keys.space){//space bar exerminate
      let currentSquare = document.querySelector('.targeted');
      let image = document.querySelector('.targeted img')
      
      if (currentSquare.children.length > 0){
        currentSquare.style.backgroundColor = 'red';
        image.setAttribute('data-status', 'dead')
      }
    }

    // 👉 TASK 5 - End the game 👈

    if (evt.key === keys.space){
    
      const allMosquitoSquares = Array.from(document.querySelectorAll('img'));
      const paraInfo = document.querySelector('.info');
      const headerTwo = document.querySelector('h2');

      let count = allMosquitoSquares.length
      
      for (i = 0; i < allMosquitoSquares.length; i++){
        if(allMosquitoSquares[i].getAttribute('data-status') === 'dead'){
          count--  
        }
      }

      if (count === 0){//end game
        paraInfo.textContent = `Extermination completed in ${getTimeElapsed() * .001} seconds!`
  
        const restartButton = document.createElement('button')
        restartButton.textContent = 'Restart'
        headerTwo.appendChild(restartButton)

        restartButton.addEventListener('click', evt => { 
        window.location.reload();
        })  
      }

    } 

  })
 
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
