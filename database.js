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
     * @param {JSON} search Search query in the form of JSON
     * @param {function} searchCriteria Search function
     */
    get(search, searchCriteria) {
        let data = JSON.parse(search);

        let results = [];
        this._data.forEach(element => {
            if (searchCriteria(element, data)) {
                results.push(element);
            }
        });
        return JSON.stringify(results);
    }

    /**
     * 
     * @param {JSON} search Search query in the form of JSON
     * @param {function} searchCriteria Search function
     */
    delete(search, searchCriteria) {
        let data = JSON.parse(search);
        // Creates a new array
        let newArray = this._data.filter(element => {
            return !searchCriteria(element, data); 
        });
        
        this._data = newArray;
    }
}

module.exports = Database;