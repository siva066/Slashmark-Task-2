# Slashmark-Task-2




Make sure you have Node.js installed on your system. You can download it from nodejs.org. 2)Package Installation:

Create a new directory for your project. Inside this directory, initialize a new Node.js project by running:

npm init -y

Install necessary packages (iohook and keycode) using npm:

npm install iohook keycode

****Creating a Test File: Create a new file, let's say index.js, where you'll instantiate the Keyboard class and handle its events:

javascript

const Keyboard = require('./keyboard');

const keyboard = new Keyboard();

keyboard.on('keydown', (event) => { console.log('Key pressed:', event.key, '(', event.combinedKey, ')'); });

keyboard.on('keyup', (event) => { console.log('Key released:', event.key); });

keyboard.start();

// Gracefully stop the keyboard listener on process exit process.on('exit', () => { keyboard.stop(); });

Running the Application: In your terminal or command prompt, navigate to the directory where you saved keyboard.js and index.js, then run:

node index.js
