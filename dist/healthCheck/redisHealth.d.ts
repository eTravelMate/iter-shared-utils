export declare function checkRedisHealth(REDIS_HOST: any, REDIS_PORT: any, REDIS_PASSWORD: any): Promise<{
    status: string;
    message: string;
    env?: undefined;
} | {
    status: string;
    env: string;
    message: string;
}>;
