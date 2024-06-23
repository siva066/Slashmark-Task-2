const EventEmitter = require('events');
const iohook = require('iohook');
const keycode = require('keycode');

class Keyboard extends EventEmitter {
  constructor() {
    super();
    this.hooked = false;

    // Bind iohook events
    ['keydown', 'keyup', 'keypress'].forEach(event => {
      iohook.on(event, (data) => this.emit(event, this.formatEvent(data)));
    });

    // Error handling
    iohook.on('error', (error) => {
      this.emit('error', error);
      console.error('iohook error:', error);
    });
  }

  start() {
    if (!this.hooked) {
      try {
        iohook.start();
        this.hooked = true;
        console.log('Keyboard listener started.');
      } catch (error) {
        this.emit('error', error);
        console.error('Failed to start keyboard listener:', error);
      }
    }
  }

  stop() {
    if (this.hooked) {
      iohook.stop();
      this.hooked = false;
      console.log('Keyboard listener stopped.');
    }
  }

  // Event formatting (with key combination logic)
  formatEvent(data) {
    const key = keycode(data.keycode);
    const modifiers = {
      altKey: data.altKey,
      ctrlKey: data.ctrlKey,
      metaKey: data.metaKey,
      shiftKey: data.shiftKey
    };

    // Construct the combined key string
    const combinedKey = Object.keys(modifiers)
      .filter(mod => modifiers[mod])
      .map(mod => mod.replace('Key', '')) 
      .concat(key)
      .join('+');

    return {
      key,
      rawcode: data.keycode,
      combinedKey, 
      ...modifiers
    };
  }
}

export default Keyboard; // Export for module usage