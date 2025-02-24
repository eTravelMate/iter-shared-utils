export declare function checkKafkaHealth(clientId: any, brokers: any): Promise<{
    status: string;
    message: string;
    env?: undefined;
} | {
    status: string;
    env: string;
    message: string;
}>;
