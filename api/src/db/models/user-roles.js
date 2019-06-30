import * as sequelize from 'sequelize';

export default sequelize => {
    const UserRoles = sequelize.define(
        'UserRoles',
        {
            userId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'user_id',
            },
            roleId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'role_id',
            },
        },
        {
            tableName: 'user_roles',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    UserRoles.associate = models => {
        UserRoles.belongsTo(models.Roles, {
            sourceKey: 'roleId',
            foreignKey: 'id',
        });
    };

    return UserRoles;
};
