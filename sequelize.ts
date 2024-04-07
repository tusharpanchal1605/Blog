import { Sequelize} from 'sequelize';

export const db = new Sequelize('blog','postgres','root',{
    host:'localhost',
    dialect:'postgres'
});
