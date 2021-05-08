/**
 * Supports CRUD operations
 */

class Database {
    constructor() {
        this._data = [];
    }

    /**
     * Add data
     * @param {JSON} data In JSON format 
     */
    add(data) {
        this._data.push(JSON.parse(data));
    }

    /**
     * Fetches all the data present
     * @returns JSON
     */
    getAll() {
        return JSON.stringify(this._data);
    }

    /**
     * 
     * @param {function} searchCriteria 
     * @param {JSON} data 
     */
    get(data, searchCriteria) {
        let results = [];
        data.forEach(element => {
            if (searchCriteria(element, data)) {
                results.push(element);
            }
        });
        return JSON.stringify(results);
    }

    /**
     * 
     * @param {function} searchCriteria 
     * @param {JSON} data 
     */
    delete(data, searchCriteria) {
        // Creates a new array
        let newArray = this._data.filter(element => {
            return !searchCriteria(element, data); 
        });
        
        this._data = newArray;
    }
}

module.exports = Database;