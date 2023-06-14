const Datastore = require("nedb-promises");
const Metadata = require("./Metadata");
const db = Datastore.create({
  filename: "./database/InstructionModel.db",
  autoload: true,
});

/**
 * Class representing an instruction model.
 */
class InstructionModel extends Metadata {
  /**
   * Create an instruction model.
   * @param {string} name - The name of the instruction model.
   * @param {string} description - The description of the instruction model.
   * @param {string} author - The author of the instruction model.
   * @param {Array<string>} tags - The tags of the instruction model.
   * @param {string} type - The type of the instruction. Must be one of: 'init', 'language', 'profession', 'beginInstructions', 'job', 'endInstructions'.
   * @param {string} instruction - The instruction.
   * @throws {Error} If the given type is not valid.
   */
  constructor(name, description, author, tags, type, instruction) {
    super(name, description, author, tags);
    const validTypes = [
      "init",
      "language",
      "profession",
      "beginInstructions",
      "job",
      "endInstructions",
    ];
    if (!validTypes.includes(type)) {
      throw new Error(
        `Invalid type '${type}', must be one of: ${validTypes.join(", ")}`
      );
    }

    this.type = type;
    this.instruction = instruction;
  }

  /**
   * Save the instruction model to the database.
   * @return {Promise<InstructionModel>} The saved instruction model.
   */
  async save() {
    try {
      const newDoc = await db.insert(this);
      this._id = newDoc._id;
      return newDoc;
    } catch (err) {
      console.error(`Failed to save InstructionModel: ${err}`);
    }
  }

  /**
   * Update the instruction model in the database.
   * @param {Object} changes - The changes to update.
   * @return {Promise<number>} The number of affected documents.
   */
  async update(changes) {
    try {
      return db.update({ _id: this._id }, { $set: changes });
    } catch (err) {
      console.error(`Failed to update InstructionModel: ${err}`);
    }
  }

  /**
   * Get an instruction model by ID from the database.
   * @param {string} id - The ID of the instruction model.
   * @return {Promise<InstructionModel>} The found instruction model.
   */
  static async get(id) {
    try {
      return db.findOne({ _id: id });
    } catch (err) {
      console.error(`Failed to get InstructionModel: ${err}`);
    }
  }

  /**
   * Delete an instruction model by ID from the database.
   * @param {string} id - The ID of the instruction model.
   * @return {Promise<number>} The number of affected documents.
   */
  static async delete(id) {
    try {
      return db.remove({ _id: id });
    } catch (err) {
      console.error(`Failed to delete InstructionModel: ${err}`);
    }
  }
}

module.exports = InstructionModel;
