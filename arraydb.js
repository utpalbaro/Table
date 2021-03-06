// A simple array based database

class ArrayDB {
    constructor() {
        this._data = []
    }

    insert(data) {
        this._data.push(JSON.parse(data));
    }

    fetchAll() {
        return JSON.stringify(this._data);
    }

    fetch(search) {
        let data = JSON.parse(search);
        const self = this;

        let results = [];
        this._data.forEach(element => {
            if (self.searchCriteria(element, data)) {
                results.push(element);
            }
        });
        return JSON.stringify(results);
    }

    searchCriteria(element, data) {
        try {
            for (const property in data) {
                if (data[property] !== element[property]) {
                    return false;
                }
            }
        } catch {
            return false;
        }

        return true;
    }

    delete(search) {
        let data = JSON.parse(search);
        const self = this;
        // Creates a new array
        let newArray = this._data.filter(element => {
            return !self.searchCriteria(element, data); 
        });
        
        this._data = newArray;
    }

    update(search, replacement) {
        const data = JSON.parse(search);
        const replace = JSON.parse(replacement);

        const self = this;

        this._data.forEach(element => {
            if (self.searchCriteria(element, data)) {
                for (const property in replace) {
                    element[property] = replace[property];
                }
            }
        });
    }
}

module.exports = ArrayDB;