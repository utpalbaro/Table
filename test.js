const WorkLog = require('./database');

const w = new WorkLog();
w.add('{"name": "Dahlia",   "role": "Support"}');
w.add('{"name": "Chaac",    "role": "Duelist"}');
w.add('{"name": "Anvil",    "role": "Defender"}');
w.add('{"name": "Dallas",   "role": "Intel"}');
w.add('{"name": "Saint",    "role": "Support"}');
w.add('{"name": "Sigrid",   "role": "Breacher"}');
w.add('{"name": "Trench",   "role": "Support"}');

console.log(w.getAll());

console.log(w.get('{"role": "Support"}', search));

w.delete('{"role": "Defender"}', search);

console.log(w.getAll());

function search(element, data) {
    return element.role === data.role;
}
