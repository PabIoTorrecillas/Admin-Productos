import { Sequelize } from 'sequelize';

const db = new Sequelize('postgresql://rest_api_node_typescript_ba80_user:5winowOWJkao02GPEcpy6Ig1zU4pX4jV@dpg-d0tp9oc9c44c739na800-a.oregon-postgres.render.com/rest_api_node_typescript_ba80?ssl=true');

export default db;