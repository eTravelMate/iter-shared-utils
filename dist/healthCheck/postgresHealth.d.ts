export declare function checkPostgresHealth(DB_HOST: any, DB_USER: any, DB_NAME: any, DB_PASSWORD: any): Promise<{
    status: string;
    message: string;
    env?: undefined;
} | {
    status: string;
    env: string;
    message: string;
}>;
