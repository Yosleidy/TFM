export async function encriptar(text, password) {
  let encrypted = '';
  const IOTA = require('iota.lib.js');
  const Mam = require('@iota/mam');

  const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443' });

  const MODE = 'public'; // public, private or restricted
  const SECURITYLEVEL = 3; // 1, 2 or 3

  // Ininicializar MAM State
  let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

  // Establecer el modo del canal
  mamState = Mam.changeMode(mamState, MODE);

  

  const {
    scrypt,
    //randomFill,
    createCipheriv
  } = await import('crypto');

  const algorithm = 'aes-192-cbc';

  const iv = Buffer.alloc(16, 0);
  
 const derivedKey= scrypt(password, 'salt', 24);
       

    var cipher = createCipheriv(algorithm, derivedKey, iv);
    
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write(text);
    cipher.end();

    enviardatos(encrypted);

    
  async function enviardatos(encrypted) {
    publish(encrypted);

  }
  async function publish(packet) {
    // Crear MAM Payload
    const trytes = iota.utils.toTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    // Guardar el nuevo mamState
    mamState = message.state;
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);

    // Adjuntar el payload.
    await Mam.attach(message.payload, message.address, 3, 9);

    return message.root;
  }

  
};