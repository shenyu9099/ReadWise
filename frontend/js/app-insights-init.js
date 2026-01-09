// Application Insights Initialization Script
// This script initializes Application Insights with the connection string

(function () {
    'use strict';

    // Application Insights Configuration
    const connectionString = "InstrumentationKey=5afd61df-6ab8-4e3c-89af-169d8791663b;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=0a33f593-2ae5-4ce1-aa58-ac246a8fcb9b";

    let retryCount = 0;
    const maxRetries = 10;

    // Wait for Application Insights SDK to load
    function initAppInsights() {
        if (typeof Microsoft === 'undefined' || typeof Microsoft.ApplicationInsights === 'undefined') {
            retryCount++;
            if (retryCount < maxRetries) {
                setTimeout(initAppInsights, 200);
            } else {
                console.warn('Application Insights SDK failed to load after ' + maxRetries + ' attempts');
            }
            return;
        }

        try {
            // Initialize Application Insights
            var snippet = {
                config: {
                    connectionString: connectionString,
                    enableAutoRouteTracking: true,
                    enableRequestHeaderTracking: true,
                    enableResponseHeaderTracking: true,
                    autoTrackPageVisitTime: true,
                    enableCorsCorrelation: true,
                    disableAjaxTracking: false,
                    disableExceptionTracking: false
                }
            };

            var init = new Microsoft.ApplicationInsights.ApplicationInsights(snippet);
            var appInsights = init.loadAppInsights();

            // Make appInsights globally available
            window.appInsights = appInsights;

            console.log('✅ Application Insights initialized');

            // Set user context if available
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userObj = JSON.parse(user);
                    const userId = userObj.id || userObj.userId || userObj.email;
                    if (userId) {
                        appInsights.setAuthenticatedUserContext(userId.toString(), undefined, true);
                        console.log('✅ User context set:', userId);
                    }
                }
            } catch (e) {
                console.warn('⚠️ Failed to set user context:', e);
            }
        } catch (error) {
            console.error('❌ Failed to initialize Application Insights:', error);
        }
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAppInsights);
    } else {
        initAppInsights();
    }
})();