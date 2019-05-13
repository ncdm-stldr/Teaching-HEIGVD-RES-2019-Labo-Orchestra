  /*
   * We use a standard Node.js module to work with UDP
   */
  var dgram = require('dgram');

  /*
   * Let's create a datagram socket. We will use it to send our UDP datagrams
   */
  var s = dgram.createSocket('udp4');

  /*
   * Used to generate unique ids
   */
  const uuidv1 = require('uuid/v1');

  function Musician(instrument){
    this.uuid = uuidv1();
    this.instrument = instrument;
    switch (instrument) {
      case "piano":
        this.sound = "ti-ta-ti";
        break;
      case "trumpet":
        this.sound = "pouet";
        break;
      case "flute":
        this.sound = "trulu";
      case "violin":
        this.sound = "gzi-gzi";
        break;
      case "drum":
        this.sound = "boum.boum";
        break;
      default:
      this.sound = "???";
    }


    Musician.prototype.update = function(){

    /*
    	  * Let's create a played sound as a dynamic javascript object,
    	  * add properties
    	  * and serialize the object to a JSON string
    	  */
    var note = {
      instrument_uuid: this.uuid,
      instrument: this.instrument,
      sound: this.sound,
      timestamp: Date.now()
    };
    var payload = JSON.stringify(note);

    message = new Buffer(payload);
    s.send(message, 0, message.length, 2222, "239.255.22.5", function(err, bytes) {
      console.log("Sending payload: " + payload + " via port " + s.address().port);
    });

  }

  setInterval(this.update.bind(this), 1000);

  }

  var instrument = process.argv[2];

  var m1 = new Musician(instrument);
