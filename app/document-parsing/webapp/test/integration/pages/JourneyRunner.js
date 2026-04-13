sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"documentparsing/test/integration/pages/DocumentsList",
	"documentparsing/test/integration/pages/DocumentsObjectPage"
], function (JourneyRunner, DocumentsList, DocumentsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('documentparsing') + '/test/flpSandbox.html#documentparsing-tile',
        pages: {
			onTheDocumentsList: DocumentsList,
			onTheDocumentsObjectPage: DocumentsObjectPage
        },
        async: true
    });

    return runner;
});

