const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize("node-server", 'root', "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const User = sequelize.define('user_test', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

const Picture = sequelize.define('picture', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bool: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

})

User.hasOne(Picture);
Picture.belongsTo(User);

/* sequelize.sync({ force: true }).then(() => {
    console.log('Tables have been created')
}).catch(err => console.log(err)); */

const x = async () => {
    await User.create({ name: "Jane" });
    await User.create({ name: "Rita" });
    await Picture.create({ path: "gdfgf", userTestId: 1 });
    await Picture.create({ path: "fdg", userTestId: 2 });
    const a = await User.findAll({ include: Picture });
    console.log(JSON.stringify(a, null, 2));
};
x();

/* User.hasMany(Picture)
User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false }) */


/* 
sequelize.sync({ force: true }).then(() => {
    console.log('Tables have been created')
}).catch(err => console.log(err));
 */
/* const x = async () => {
    const jane = await User.create({ name: "Jane" });
    console.log("Jane's auto-generated ID:", jane.id);
};
x(); */


/* 
User.findAll({
  include: [
    { model: Picture }, 
    { model: Picture, as: 'ProfilePicture' }, 
   
  ]
}).then(data=>console.log(data))
 */










