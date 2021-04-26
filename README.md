# TFM
const Iota = require('@iota/core');
const iota = Iota.composeAPI({
provider: 'https://nodes.devnet.iota.org:443'
});
const depth = 3;
const minimumWeightMagnitude = 9;
const address =
'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed =
'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
const message = JSON.stringify({"message": "Hello world"});
const messageInTrytes = Converter.asciiToTrytes(message);
const transfers = [
{
    value: 0,
    address: address,
    message: messageInTrytes
}
];
Iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        console.log(bundle[0].hash)
    })
    .catch(err => {
        console.error(err)
    });
