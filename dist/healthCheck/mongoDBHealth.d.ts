export declare function checkMongodbHealth(MONGO_URL: any): Promise<{
    status: string;
    message: string;
    env?: undefined;
} | {
    status: string;
    env: string;
    message: string;
} | undefined>;
