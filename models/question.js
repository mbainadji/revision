const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Question extends Model {}
class Reponse extends Model {}

Question.init({
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    option: {
        type: DataTypes.ENUM('cybersecurite', 'genie_logiciel'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Question'
});

Reponse.init({
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Reponse'
});

// Définir les relations
const User = require('./user');

Question.belongsTo(User, { as: 'auteur' });
Reponse.belongsTo(User, { as: 'auteur' });
Reponse.belongsTo(Question);
Question.hasMany(Reponse);

module.exports = { Question, Reponse };