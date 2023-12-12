'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    id: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
    eventName: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    note: DataTypes.STRING,
    time: DataTypes.STRING,
    organizationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};