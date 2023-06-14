// src/main/models/FormatModel.js
const Datastore = require("nedb-promises");
const db = Datastore.create({
  filename: "./database/FormatModel.db",
  autoload: true,
});

const Metadata = require("./Metadata");

/**
 * Class representing a format model.
 * @extends Metadata
 */
class FormatModel extends Metadata {
  /**
   * Create a format model.
   * @param {string} name - The name of the format model.
   * @param {string} description - The description of the format model.
   * @param {string} author - The author of the format model.
   * @param {Array<string>} tags - The tags of the format model.
   * @param {string} format - The format.
   * @param {string} legend - The legend.
   */
  constructor(name, description, author, tags, format, legend) {
    super(name, description, author, tags);
    this.format = format.toLowerCase();
    this.legend = legend.toLowerCase();
  }

  /**
   * Get the format.
   * @return {string} The format.
   */
  getFormat() {
    return this.format;
  }

  /**
   * Set the format and update the database.
   * @param {string} format - The format.
   */
  async setFormat(format) {
    try {
      this.format = format.toLowerCase();
      await this.update({ format: this.format });
    } catch (err) {
      console.error(`Failed to update format: ${err}`);
    }
  }

  /**
   * Get the legend.
   * @return {string} The legend.
   */
  getLegend() {
    return this.legend;
  }

  /**
   * Set the legend and update the database.
   * @param {string} legend - The legend.
   */
  async setLegend(legend) {
    try {
      this.legend = legend.toLowerCase();
      await this.update({ legend: this.legend });
    } catch (err) {
      console.error(`Failed to update legend: ${err}`);
    }
  }

  /**
   * Save the format model to the database.
   * @return {Promise<FormatModel>} The saved format model.
   */
  async save() {
    try {
      this.updatedAt = new Date();
      const newDoc = await db.insert(this);
      this._id = newDoc._id;
      return newDoc;
    } catch (err) {
      console.error(`Failed to save FormatModel: ${err}`);
    }
  }

  /**
   * Update the format model in the database.
   * @param {Object} changes - The changes to update.
   * @return {Promise<number>} The number of affected documents.
   */
  async update(changes) {
    try {
      this.updatedAt = new Date();
      return db.update({ _id: this._id }, { $set: changes });
    } catch (err) {
      console.error(`Failed to update FormatModel: ${err}`);
    }
  }

  /**
   * Get a format model by ID from the database.
   * @param {string} id - The ID of the format model.
   * @return {Promise<FormatModel>} The found format model.
   */
  static async get(id) {
    try {
      return db.findOne({ _id: id });
    } catch (err) {
      console.error(`Failed to get FormatModel: ${err}`);
    }
  }

  /**
   * Delete a format model by ID from the database.
   * @param {string} id - The ID of the format model.
   * @return {Promise<number>} The number of affected documents.
   */
  static async delete(id) {
    try {
      return db.remove({ _id: id });
    } catch (err) {
      console.error(`Failed to delete FormatModel: ${err}`);
    }
  }
}

module.exports = FormatModel;
