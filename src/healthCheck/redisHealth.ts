import redis from "ioredis";

export async function checkRedisHealth(REDIS_HOST:any,REDIS_PORT:any,REDIS_PASSWORD:any) {
    
const client = new redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    ...(REDIS_PASSWORD && { password: REDIS_PASSWORD }),
  });

    try {
        if (client.status == "close") {
            await client.connect(); 
          }
        await client.ping();
        return { status: 'SUCCESS',
            message: 'Redis is up and running'
         }; 
    } catch (error) {
        return { status:  "FAILURE",
            env:`${REDIS_HOST},${REDIS_PORT}`,
            message: `Redis is down.. error: ${error}`
         }; 
    } 
}
