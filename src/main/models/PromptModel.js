const Datastore = require("nedb-promises");
const db = Datastore.create({
  filename: "./database/PromptModel.db",
  autoload: true,
});

const FormatModel = require("./FormatModel");
const InstructionModel = require("./InstructionModel");
const Metadata = require("./Metadata");

class PromptModel extends Metadata {
  constructor(
    name,
    description,
    author,
    tags,
    init,
    language,
    profession,
    beginInstructions,
    inputsFormat,
    job,
    outputsFormat,
    endInstructions
  ) {
    super(name, description, author, tags);
    this.init = init._id;
    this.language = language._id;
    this.profession = profession._id;
    this.beginInstructions = beginInstructions.map(
      (instruction) => instruction._id
    );
    this.inputsFormat = inputsFormat.map((format) => format._id);
    this.job = job._id;
    this.outputsFormat = outputsFormat.map((format) => format._id);
    this.endInstructions = endInstructions.map(
      (instruction) => instruction._id
    );
  }

  /**
   * Save the prompt model to the database.
   * @returns {Promise<PromptModel>} The saved prompt model.
   */
  async save() {
    try {
      this.updatedAt = new Date();

      this.init = await this._saveIfNotExists(this.init);
      this.language = await this._saveIfNotExists(this.language);
      this.profession = await this._saveIfNotExists(this.profession);
      this.job = await this._saveIfNotExists(this.job);

      this.beginInstructions = await Promise.all(
        this.beginInstructions.map(
          async (attr) => await this._saveIfNotExists(attr)
        )
      );
      this.inputsFormat = await Promise.all(
        this.inputsFormat.map(async (attr) => await this._saveIfNotExists(attr))
      );
      this.outputsFormat = await Promise.all(
        this.outputsFormat.map(
          async (attr) => await this._saveIfNotExists(attr)
        )
      );
      this.endInstructions = await Promise.all(
        this.endInstructions.map(
          async (attr) => await this._saveIfNotExists(attr)
        )
      );

      const newDoc = await db.insert(this);
      this._id = newDoc._id;

      return newDoc;
    } catch (error) {
      console.error("Error saving the document:", error);
    }
  }

  /**
   * Save the attribute if it doesn't exist in the database.
   * @param {*} attr
   * @returns the ID of the attribute
   */
  async _saveIfNotExists(attr) {
    try {
      if (attr._id) {
        return attr._id;
      } else {
        const savedAttr = await attr.save();
        return savedAttr._id;
      }
    } catch (error) {
      console.error("Error checking and saving the attribute:", error);
    }
  }

  /**
   * Get a prompt model by ID from the database.
   * @param {string} id - The ID of the prompt model.
   * @return {Promise<PromptModel>} The found prompt model.
   */
  static async get(id) {
    try {
      return db.findOne({ _id: id });
    } catch (err) {
      console.error(`Failed to get PromptModel: ${err}`);
    }
  }

  /**
   * Update the prompt model in the database.
   * @param {Object} changes - The changes to update.
   * @return {Promise<number>} The number of affected documents.
   */
  async update(changes) {
    try {
      this.updatedAt = new Date();
      return db.update({ _id: this._id }, { $set: changes });
    } catch (err) {
      console.error(`Failed to update PromptModel: ${err}`);
    }
  }

  /**
   * Delete a prompt model by ID from the database.
   * @param {string} id - The ID of the prompt model.
   * @return {Promise<number>} The number of affected documents.
   */
  static async delete(id) {
    try {
      return db.remove({ _id: id });
    } catch (err) {
      console.error(`Failed to delete PromptModel: ${err}`);
    }
  }

  /**
   * Get a prompt model by ID from the database with all its attributes.
   * @param {string} id
   * @returns
   */
  static async getFull(id) {
    try {
      const promptModel = await db.findOne({ _id: id });

      promptModel.init = await InstructionModel.get(promptModel.init);
      promptModel.language = await InstructionModel.get(promptModel.language);
      promptModel.profession = await InstructionModel.get(
        promptModel.profession
      );
      promptModel.job = await InstructionModel.get(promptModel.job);

      promptModel.beginInstructions = await Promise.all(
        promptModel.beginInstructions.map((id) => InstructionModel.get(id))
      );
      promptModel.inputsFormat = await Promise.all(
        promptModel.inputsFormat.map((id) => FormatModel.get(id))
      );
      promptModel.outputsFormat = await Promise.all(
        promptModel.outputsFormat.map((id) => FormatModel.get(id))
      );
      promptModel.endInstructions = await Promise.all(
        promptModel.endInstructions.map((id) => InstructionModel.get(id))
      );

      return promptModel;
    } catch (error) {
      console.error("Error getting the full prompt model:", error);
    }
  }

  /**
   * Add a begin instruction to the prompt model.
   * @param {InstructionModel} instruction
   */
  async addBeginInstruction(instruction) {
    this.beginInstructions.push(instruction._id);
    await this.save();
  }

  /**
   * Remove a begin instruction from the prompt model.
   * @param {InstructionModel} instruction
   */
  async removeBeginInstruction(instruction) {
    const index = this.beginInstructions.indexOf(instruction._id);
    if (index > -1) {
      this.beginInstructions.splice(index, 1);
      await this.save();
    }
  }

  /**
   * Add an end instruction to the prompt model.
   * @param {InstructionModel} instruction
   */
  async addEndInstruction(instruction) {
    this.endInstructions.push(instruction._id);
    await this.save();
  }

  /**
   * Remove an end instruction from the prompt model.
   * @param {InstructionModel} instruction
   */
  async removeEndInstruction(instruction) {
    const index = this.endInstructions.indexOf(instruction._id);
    if (index > -1) {
      this.endInstructions.splice(index, 1);
      await this.save();
    }
  }

  /**
   * Add an input format to the prompt model.
   * @param {FormatModel} format
   */
  async addInputFormat(format) {
    this.inputsFormat.push(format._id);
    await this.save();
  }

  /**
   * Remove an input format from the prompt model.
   * @param {FormatModel} format
   */
  async removeInputFormat(format) {
    const index = this.inputsFormat.indexOf(format._id);
    if (index > -1) {
      this.inputsFormat.splice(index, 1);
      await this.save();
    }
  }

  /**
   * Add an output format to the prompt model.
   * @param {FormatModel} format
   */
  async addOutputFormat(format) {
    this.outputsFormat.push(format._id);
    await this.save();
  }

  /**
   * Remove an output format from the prompt model.
   * @param {FormatModel} format
   */
  async removeOutputFormat(format) {
    const index = this.outputsFormat.indexOf(format._id);
    if (index > -1) {
      this.outputsFormat.splice(index, 1);
      await this.save();
    }
  }
}

module.exports = PromptModel;
