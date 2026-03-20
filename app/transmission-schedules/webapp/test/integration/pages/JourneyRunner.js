sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"transmissionschedules/test/integration/pages/SchedulesList",
	"transmissionschedules/test/integration/pages/SchedulesObjectPage"
], function (JourneyRunner, SchedulesList, SchedulesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('transmissionschedules') + '/test/flpSandbox.html#transmissionschedules-tile',
        pages: {
			onTheSchedulesList: SchedulesList,
			onTheSchedulesObjectPage: SchedulesObjectPage
        },
        async: true
    });

    return runner;
});

