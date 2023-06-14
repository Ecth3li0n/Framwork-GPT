// src/main/models/Metadata.js

const Datastore = require("nedb-promises");

// Separate DB for each model class for data isolation and improved DB performance
const db = Datastore.create({
  filename: "./databases/Metadata.db",
  autoload: true,
});

/**
 * Represents a Metadata.
 */
class Metadata {
  /**
   * Create a Metadata.
   * @param {string} name - The name of the metadata.
   * @param {string} description - The description of the metadata.
   * @param {string} author - The author of the metadata.
   * @param {string[]} tags - The tags associated with the metadata.
   */
  constructor(name, description, author, tags) {
    this.name = name.toLowerCase();
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.author = author.toLowerCase();
    this.tags = tags.map((tag) => tag.toLowerCase());
  }

  /**
   * Save a new metadata object in the database.
   * @returns {Promise} The newly created metadata object.
   */
  async save() {
    try {
      this.updatedAt = new Date();
      const newDoc = await db.insert(this);
      this._id = newDoc._id;
      return newDoc;
    } catch (error) {
      console.error("Failed to save Metadata:", error);
      throw error;
    }
  }

  /**
   * Update an existing metadata object in the database.
   * @param {object} changes - The changes to be updated in the metadata object.
   * @returns {Promise} The number of updated documents.
   */
  async update(changes) {
    try {
      this.updatedAt = new Date();
      return db.update({ _id: this._id }, { $set: changes });
    } catch (error) {
      console.error("Failed to update Metadata:", error);
      throw error;
    }
  }

  /**
   * Retrieve a metadata object by ID from the database.
   * @param {string} id - The ID of the metadata object to be retrieved.
   * @returns {Promise} The requested metadata object.
   */
  static async get(id) {
    try {
      return db.findOne({ _id: id });
    } catch (error) {
      console.error("Failed to get Metadata:", error);
      throw error;
    }
  }

  /**
   * Delete a metadata object by ID from the database.
   * @param {string} id - The ID of the metadata object to be deleted.
   * @returns {Promise} The number of deleted documents.
   */
  static async delete(id) {
    try {
      return db.remove({ _id: id });
    } catch (error) {
      console.error("Failed to delete Metadata:", error);
      throw error;
    }
  }
}

module.exports = Metadata;
