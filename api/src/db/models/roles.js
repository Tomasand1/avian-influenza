import * as Sequelize from 'sequelize';

export default sequelize => {
    const Roles = sequelize.define(
        'Roles',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            roleName: { type: Sequelize.STRING(50), field: 'role_name' },
        },
        {
            tableName: 'roles',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    return Roles;
};
