import * as Sequelize from 'sequelize';

export default sequelize => {
    const Users = sequelize.define(
        'Users',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            firstName: { type: Sequelize.STRING(50), field: 'first_name' },
            lastName: { type: Sequelize.STRING(50), field: 'last_name' },
            password: { type: Sequelize.STRING(50), field: 'password' },
            email: { type: Sequelize.STRING(355), field: 'email' },
            role: { type: Sequelize.STRING(50), field: 'role' },
        },
        {
            tableName: 'users',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    Users.associate = models => {
        Users.hasMany(models.UserRole, {
            sourceKey: 'id',
            foreignKey: 'userId',
        });
    };

    return Users;
};
