import {Sequelize } from "sequelize"

export async function checkPostgresHealth( DB_HOST:any, DB_USER:any, DB_NAME:any, DB_PASSWORD:any) {
    const sequelize = new Sequelize(
        DB_NAME as string, 
        DB_USER as string, 
        DB_PASSWORD as string, 
        {
          host: DB_HOST as string,
          dialect: "postgres", 
          logging: false, 
          pool: {
            max: 5,
            min: 0, 
            acquire: 30000, 
            idle: 10000, 
          },
        }
      );

    try {
        
        await sequelize.query("select 1");
        return { status: 'SUCCESS',
            message: 'Postgres DB is UP and healthy ',
         };  
    } catch (error) {
        return { status: "FAILURE",
            env:`${DB_HOST},${DB_USER}`,
            message:`Postgres DB is Down, error: ${error}`
         };  
    }
}
