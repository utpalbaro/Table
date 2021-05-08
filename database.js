/**
 * Supports CRUD operations
 */

class DatabaseManager {
    constructor(database) {
        this._database = database;
    }

    /**
     * @param {JSON} data In JSON format 
     */
    insert(data) {
        this._database.insert(data);
    }

    /**
     * @returns JSON
     */
    fetchAll() {
        return this._database.fetchAll();
    }

    /**
     * @param {JSON} data Search query in the form of JSON
     * @returns JSON
     */
    fetch(data) {
        return this._database.fetch(data);
    }

    /**
     * @param {JSON} data Search query in the form of JSON
     */
    delete(data) {
        this._database.delete(data);
    }
}

module.exports = DatabaseManager;