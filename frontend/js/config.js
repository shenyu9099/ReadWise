const CONFIG = {
    // Application Insights Configuration
    APP_INSIGHTS: {
        instrumentationKey: "5afd61df-6ab8-4e3c-89af-169d8791663b",
        connectionString: "InstrumentationKey=5afd61df-6ab8-4e3c-89af-169d8791663b;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=0a33f593-2ae5-4ce1-aa58-ac246a8fcb9b"
    },

    // Replace these URLs after creating Logic Apps
    API: {
        REGISTER: "https://prod-27.uksouth.logic.azure.com:443/workflows/39395ce0cba04a2f824d33537b19da09/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=l_nQsKkqWoqpg0cmdbS5xrsUFwMVHXTgAwTu5qTgeQU",
        LOGIN: "https://prod-47.uksouth.logic.azure.com:443/workflows/9628282e1e95451b8ab437e02d926916/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oZ-7An6QT5_GjRePaMsmSZgr5kuzON_isCbCQvWToMA",

        JOURNAL: {
            CREATE: "https://prod-10.uksouth.logic.azure.com:443/workflows/21b4716dfa914dc38065568ee647637c/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=JEv42tjXgRXdW1LvAMUOHoveDcX1q3gjHTyM_4YpE4E",
            GET_ALL: "https://prod-00.uksouth.logic.azure.com:443/workflows/ac6a7316763d4b80b7463a09a9faa098/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2j_VOzkkktyZ4NiHJxX7hzAYyi9yQsv-79fyl3OEDH0",
            GET_ONE: "https://prod-08.uksouth.logic.azure.com:443/workflows/2d6c5d41a73d4f439f82703fb1205e28/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_2fCFBu__YtvDflvMORx0xMymvSVwnyJM-pRzFhzJg",
            UPDATE: "https://prod-62.uksouth.logic.azure.com:443/workflows/00b2e5dad6d44948828c7e427ee5d291/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5dMQ8HK3ZvtLM-0PJqmi61YcA0nP8pDqJENXUaBCVbg",
            DELETE: "https://prod-35.uksouth.logic.azure.com:443/workflows/34db89abb555482390b96833fc0810c0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Wt163B3yN8IvNNlzhUvMWHYhTElG0xja5TvHy2urshA"
        },

        REVIEW: {
            CREATE: "https://prod-05.uksouth.logic.azure.com:443/workflows/34f1b10193264f00b1db4cb6b70d7aac/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W90cd6B917idf-e2WNt2-sX7xFmfspyWzAkTxVy-BuY",
            GET_USER_REVIEWS: "https://prod-24.uksouth.logic.azure.com:443/workflows/52cf240c9da9498bb0665220aff26b8d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-1x2HlMgNqY64RIc1YyrGJFXfbwYCe3DZwiV6oaWXd8",
            UPDATE: "https://prod-29.uksouth.logic.azure.com:443/workflows/b243e2d046804dfc848e7499ee96ea83/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nXFjJtGHv0pn7XsOWHcOXryWuZbD2k6yFjNugF7b8MM",
            DELETE: "https://prod-05.uksouth.logic.azure.com:443/workflows/aeebc3592761422f9c142ddb879b621c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UkDnLFedgNd7AqopuRe8AwrMeRno3z4HnAFheASRFlo"
        },

        UPLOAD: "https://prod-27.uksouth.logic.azure.com:443/workflows/2a4cf2476e604b34845da116abd7c10c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aZEXO8L-MjOIZM3bWunmYpaWnKCCk6GPSL6v5YaAwWw"
    },

    // Helper to check if user is logged in
    requireAuth: () => {
        const user = localStorage.getItem('user');
        if (!user) {
            window.location.href = 'index.html';
        }
        return JSON.parse(user);
    }
};
