This is a simple event emitter implementation that enhances any existing object to be an event emitter.

  Evented is a module that
    can create a new evented object
        ✓ from no parameter
    can add events to existing object
        ✓ accepts object parameter
        ✓ keeps nested properties
        ✓ keeps parent functions
    behaves as an event emitter
      ✓ can emit and receive events
      ✓ event can pass custom information
      ✓ has once
      ✓ can disable observers

```javascript
const evented = require('dgaya_evented');
const e = evented();
e.on('event_name', () => console.log('Hi!'));
e.emit('event_name');

```
