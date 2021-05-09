const WorkLog = require('./database');
const ArrayDB = require('./arraydb');

const w = new WorkLog(new ArrayDB);

w.insert('{"name": "Dahlia",   "role": "Support"}');
w.insert('{"name": "Chaac",    "role": "Duelist"}');
w.insert('{"name": "Anvil",    "role": "Defender"}');
w.insert('{"name": "Dallas",   "role": "Intel"}');
w.insert('{"name": "Saint",    "role": "Support"}');
w.insert('{"name": "Sigrid",   "role": "Breacher"}');
w.insert('{"name": "Trench",   "role": "Defender"}');

console.log(w.fetchAll());

console.log(w.fetch('{"role": "Support"}'));

w.delete('{"role": "Defender"}');
w.update('{"role": "Support"}', '{"role": "Defender"}');

console.log(w.fetchAll());
