export declare function checkSESHealth(EMAIL_PROVIDER_BUCKET_REGION: any, EMAIL_PROVIDER_ACCESS_KEY_ID: any, EMAIL_PROVIDER_SECRET_ACCESS_KEY: any): Promise<{
    status: string;
    message: string;
    env?: undefined;
} | {
    status: string;
    env: string;
    message: string;
} | undefined>;
