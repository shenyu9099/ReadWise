// Application Insights Telemetry for ReadWise
// This file initializes and provides telemetry tracking functions

(function() {
    'use strict';

    // Application Insights Configuration
    const APP_INSIGHTS_CONFIG = {
        connectionString: "InstrumentationKey=5afd61df-6ab8-4e3c-89af-169d8791663b;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=0a33f593-2ae5-4ce1-aa58-ac246a8fcb9b",
        instrumentationKey: "5afd61df-6ab8-4e3c-89af-169d8791663b"
    };

    let appInsights = null;

    // Initialize Application Insights
    function initAppInsights() {
        if (typeof appInsights !== 'undefined' && appInsights !== null) {
            // Already initialized
            return appInsights;
        }

        try {
            // Check if Application Insights SDK is loaded
            if (typeof applicationInsights === 'undefined') {
                console.warn('Application Insights SDK not loaded. Loading from CDN...');
                loadAppInsightsSDK();
                return null;
            }

            // Initialize Application Insights
            const config = {
                config: {
                    connectionString: APP_INSIGHTS_CONFIG.connectionString,
                    enableAutoRouteTracking: true,
                    enableRequestHeaderTracking: true,
                    enableResponseHeaderTracking: true,
                    autoTrackPageVisitTime: true,
                    enableCorsCorrelation: true,
                    enableAjaxErrorStatusText: true,
                    enableAjaxPerfTracking: true,
                    maxAjaxCallsPerView: -1,
                    disableAjaxTracking: false,
                    disableExceptionTracking: false,
                    disableTelemetry: false,
                    instrumentationKey: APP_INSIGHTS_CONFIG.instrumentationKey
                }
            };

            appInsights = applicationInsights.init(config.config);
            applicationInsights.loadAppInsights();
            
            // Get the current user from localStorage if available
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userObj = JSON.parse(user);
                    appInsights.setAuthenticatedUserContext(
                        userObj.id || userObj.userId || userObj.email,
                        undefined,
                        true
                    );
                }
            } catch (e) {
                console.warn('Failed to set user context:', e);
            }

            console.log('✅ Application Insights initialized successfully');
            return appInsights;
        } catch (error) {
            console.error('❌ Failed to initialize Application Insights:', error);
            return null;
        }
    }

    // Load Application Insights SDK from CDN
    function loadAppInsightsSDK() {
        const script = document.createElement('script');
        script.src = 'https://az416426.vo.msecnd.net/scripts/b/ai.2.min.js';
        script.async = true;
        script.onload = function() {
            console.log('Application Insights SDK loaded, initializing...');
            initAppInsights();
        };
        script.onerror = function() {
            console.error('Failed to load Application Insights SDK');
        };
        document.head.appendChild(script);
    }

    // Track custom event
    function trackEvent(name, properties, measurements) {
        if (appInsights) {
            try {
                appInsights.trackEvent({
                    name: name,
                    properties: properties || {},
                    measurements: measurements || {}
                });
            } catch (e) {
                console.warn('Failed to track event:', e);
            }
        }
    }

    // Track page view
    function trackPageView(name, url, properties, measurements) {
        if (appInsights) {
            try {
                appInsights.trackPageView({
                    name: name,
                    uri: url || window.location.href,
                    properties: properties || {},
                    measurements: measurements || {}
                });
            } catch (e) {
                console.warn('Failed to track page view:', e);
            }
        }
    }

    // Track exception
    function trackException(exception, handledAt, properties, measurements) {
        if (appInsights) {
            try {
                appInsights.trackException({
                    exception: exception,
                    handledAt: handledAt || 'browser',
                    properties: properties || {},
                    measurements: measurements || {}
                });
            } catch (e) {
                console.warn('Failed to track exception:', e);
            }
        }
    }

    // Track user action
    function trackUserAction(action, target, properties) {
        trackEvent('UserAction', {
            action: action,
            target: target,
            page: window.location.pathname,
            ...properties
        });
    }

    // Track API call
    function trackApiCall(apiName, success, duration, properties) {
        trackEvent('ApiCall', {
            apiName: apiName,
            success: success,
            duration: duration,
            ...properties
        }, {
            duration: duration
        });
    }

    // Set user context
    function setUserContext(userId, accountId, storeInCookie) {
        if (appInsights) {
            try {
                appInsights.setAuthenticatedUserContext(userId, accountId, storeInCookie);
            } catch (e) {
                console.warn('Failed to set user context:', e);
            }
        }
    }

    // Clear user context
    function clearUserContext() {
        if (appInsights) {
            try {
                appInsights.clearAuthenticatedUserContext();
            } catch (e) {
                console.warn('Failed to clear user context:', e);
            }
        }
    }

    // Flush telemetry
    function flush() {
        if (appInsights) {
            try {
                appInsights.flush();
            } catch (e) {
                console.warn('Failed to flush telemetry:', e);
            }
        }
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAppInsights();
            // Track initial page view
            setTimeout(function() {
                trackPageView(window.location.pathname);
            }, 100);
        });
    } else {
        initAppInsights();
        setTimeout(function() {
            trackPageView(window.location.pathname);
        }, 100);
    }

    // Expose Telemetry object globally
    window.Telemetry = {
        init: initAppInsights,
        trackEvent: trackEvent,
        trackPageView: trackPageView,
        trackException: trackException,
        trackUserAction: trackUserAction,
        trackApiCall: trackApiCall,
        setUserContext: setUserContext,
        clearUserContext: clearUserContext,
        flush: flush,
        getAppInsights: function() { return appInsights; }
    };

    // Global error handler to track unhandled exceptions
    window.addEventListener('error', function(event) {
        trackException({
            name: event.error ? event.error.name : 'Error',
            message: event.error ? event.error.message : event.message,
            stack: event.error ? event.error.stack : undefined
        }, 'browser', {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        trackException({
            name: 'UnhandledPromiseRejection',
            message: event.reason ? (event.reason.message || String(event.reason)) : 'Unknown promise rejection'
        }, 'browser');
    });

    console.log('📊 Telemetry module loaded');
})();
