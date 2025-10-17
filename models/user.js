const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

class User extends Model {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

User.init({
    matricule: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option: {
        type: DataTypes.ENUM('cybersecurite', 'genie_logiciel'),
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await User.hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await User.hashPassword(user.password);
            }
        }
    }
});

module.exports = User;