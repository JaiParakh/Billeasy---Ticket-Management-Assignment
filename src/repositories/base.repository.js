/**
 * Common CRUD operations for all models
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(conditions) {
    return this.model.findOne(conditions);
  }

  async find(conditions = {}) {
    return this.model.find(conditions);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;