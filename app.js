const pButton = document.querySelector('.pressed');
const button = document.querySelector('.unpressed');

// Get joke parts from JSON 
class Joke {
    async jokeParts() {
        try {
            let result = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
            let data = await result.json()
            // Return data
            
            // Destructuring data 
            let item = data
            let partOne = ""
            let partTwo = ""
            if(item.type === "single"){
                partOne = item.joke
            }
            if(item.type === "twopart"){
                partOne = item.setup
                partTwo = item.delivery
            }
            console.log(partOne)
            console.log(partTwo)
            return {partOne, partTwo}
        } catch (error) {
            console.log(error)  
        }
    }
}

// Display joke parts
class Display {
    displayJoke(item) {
        jokeList.innerHTML = `
        <ul style="list-style: none;">
            <li>
            ${item.partOne}
            </li>
            <li>
            ${item.partTwo}
            </li>
        </ul>
        `
    }
}

const doFunny = () => {
    const joke  = new Joke()
    const display = new Display()
    joke.jokeParts().then(j => display.displayJoke(j))
}

function playSound(){
    var music = new Audio('pressButton.mp3');
    music.play();
}

var clicks = 0;

button.addEventListener('click', () => {
    doFunny();
    if(pButton.classList.contains('pressed')){
        playSound();
        pButton.classList.add('active');
        button.classList.remove('active');
        clicks += 1;
        setTimeout(() => {          
            playSound();
            button.classList.add('active');
            pButton.classList.remove('active'); 
        }, 250);
        document.getElementById("clicks").innerHTML = clicks;
    }
});


