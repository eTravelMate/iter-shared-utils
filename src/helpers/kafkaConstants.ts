const kafka_Constants = {
    AdminCouponUsers: {
      topic: "couponUsers",
      events: {
        usersListQueue: "users-list-queue",
      },
      group: "couponUsers-group",
    },
    AdminReportExports: {
      topic: "admin-report-exports",
      events: {
        reportExports: "report-exports",
        revenueReportExports: "revenue-report-exports",
        misReportExports: "mis-report-exports",
      },
      group: "group-admin-report-exports",
    },
    BillingApproval: {
      topic: "invoice-Approval",
      events: {
        invoiceApproval: "invoice-Approval",
      },
      group: "group-invoice-Approval",
      agendaJob: "invoice-approval",
    },
    PaymentApproval: {
      topic: "payment",
      events:{
        captureVoidPayment: "capture_void_payment",
        paymentRefund: "payment-refund",
        authorizePaymentForTrip: "authorize_payment_for_trip",
      },
    group: "group-payment",
    delay: 10000, //delays is in millisecond
    },
    TripReportExports: {
      topic: "trip-report-exports",
      events: {
        reportExports: "report-exports",
        completeTrip: "complete-trip",
      },
      group: "group-trip-report-exports",
      delay: 90000, //delay is in millisecond
    },
    DriverTripInitiation: {
        topic: "driver_notification_for_trip_initiation",
        events: {
            driverNotificationForTripInitiation: "driver_notification_for_trip_initiation",
        },
        group: "group-driver_notification_for_trip_initiation",
    },
    DriverTripNonInitiation: {
        topic: "driver_notification_for_trip_non_initiation",
        events: {
            notificationForNonInitiatedTrip: "notification_for_non_initiated_trip",
        },
        group: "group-driver_notification_for_trip_non_initiation",
    },
    DriverNotification:{
        topic: "driver_notification_trip_post_payment_confirmation",
        events:{
          driverNotification:"driver_notification"
        },
        group: "group-driver_notification_trip_post_payment_confirmation"        

    }
  };
  
  export default kafka_Constants;
  