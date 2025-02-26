declare const kafka_Constants: {
    AdminCouponUsers: {
        topic: string;
        events: {
            usersListQueue: string;
        };
        group: string;
    };
    AdminReportExports: {
        topic: string;
        events: {
            reportExports: string;
            revenueReportExports: string;
            misReportExports: string;
        };
        group: string;
    };
    BillingApproval: {
        topic: string;
        events: {
            invoiceApproval: string;
        };
        group: string;
        agendaJob: string;
    };
    PaymentApproval: {
        topic: string;
        events: {
            captureVoidPayment: string;
            paymentRefund: string;
            authorizePaymentForTrip: string;
        };
        group: string;
        delay: number;
    };
    TripReportExports: {
        topic: string;
        events: {
            reportExports: string;
            completeTrip: string;
        };
        group: string;
        delay: number;
    };
    DriverTripInitiation: {
        topic: string;
        events: {
            driverNotificationForTripInitiation: string;
        };
        group: string;
    };
    DriverTripNonInitiation: {
        topic: string;
        events: {
            notificationForNonInitiatedTrip: string;
        };
        group: string;
    };
    DriverNotification: {
        topic: string;
        events: {
            driverNotification: string;
        };
        group: string;
    };
};
export default kafka_Constants;
