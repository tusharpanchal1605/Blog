import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from "../sequelize";
import { User } from './user-model';

interface PostAttributes {
    id?: string;
    title: string;
    description: string;
    userId: string;
    author: string;
    // Add other attributes as needed
}

interface PostInstance extends Model<PostAttributes>, PostAttributes {}



export const Post = db.define<PostInstance>('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


Post.belongsTo(User, { foreignKey: 'userId' });
//const postTable=Post.sync({force: true});