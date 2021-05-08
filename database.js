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
    get(searchCriteria, data) {
        let results = [];
        data.forEach(element => {
            if (searchCriteria(element, data)) {
                results.push(element);
            }
        });
        return results;
    }

    delete(searchCriteria, data) {
        // Creates a new array
        let newArray = this._data.filter((element, index, array) => {
            return searchCriteria(element, data); 
        });
    }
}

module.exports = WorkLog;