sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"countingevents/test/integration/pages/CountingEventsList",
	"countingevents/test/integration/pages/CountingEventsObjectPage"
], function (JourneyRunner, CountingEventsList, CountingEventsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('countingevents') + '/test/flpSandbox.html#countingevents-tile',
        pages: {
			onTheCountingEventsList: CountingEventsList,
			onTheCountingEventsObjectPage: CountingEventsObjectPage
        },
        async: true
    });

    return runner;
});

