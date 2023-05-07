var config = {
    host: 'fes.eu.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'dAyQLawWpoewvH17sujCqZstQqnxPk_Q'
};

require.config({
    baseUrl: `https://${config.host}/resources`, webIntegrationId: config.webIntegrationId
});

require(["js/qlik"], function (qlik) {

    qlik.on("error", function (error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    //var AppId = '9734c6a2-10ba-4707-a178-d8e594b59135';
    var AppId = '5d966ff8-03a2-4d22-96f4-f93ab7271e46';
    var app = qlik.openApp(AppId, config);
    app.getObject('QV01', '29490bfa-c5b1-4625-b3e7-a20bf35b4bdb');

    //app.clearAll();
    //app.field('[Financial Year]').selectValues(['April/2021 - March/2022'], true);
    //app.field('[Fin Month]').selectValues([8], true);
    getReports('consolidated');

    async function getReports(targetGroup) {
        //Clear Div before adding new
        $("#report-" + targetGroup).empty();
        $.getJSON("js/reports.json", function (json) {
            let reports = json['reports'];
            for (let i = 0; i < reports.length; i++) {
                let divId = reports[i]['divId'];
                let reportName = reports[i]['reportName'];
                let objectId = reports[i]['objectId'];
                let reportGroup = reports[i]['reportGroup'];
                if (reportGroup === targetGroup) {
                    populateReports(divId, reportName, reportGroup, objectId);
                }
            }
        });
    }


    async function populateReports(divId, reportName, reportGroup, objectId) {
        //console.log('************',divId, reportName, reportGroup, objectId)
        html = '<div class="flex-container item-margin report-description shadow-4">' +
            '<h3>' + reportName + '</h3>' +
            '<div id="' + divId + '" class="qvplaceholder "></div>' +
            '</div>';

        $("#report-" + reportGroup).append(html);

        app.getObject(divId, objectId, {
            noSelections: true,
            noInteraction: true
        }).then(
            function (model) {
                let qSize = model.layout.qHyperCube.qSize;
                let qcy = (qSize.qcy * 23) + 145;    //Y is height of cube
                console.log(divId, reportName, reportGroup, qcy)
                $("#" + divId).height(qcy);
            })
        app.destroySessionObject(objectId)

    }




    $('a[data-mdb-toggle="tab"]').on('shown.bs.tab', function (e) {

        html_tab = e.currentTarget.getAttribute("data-qlik-select");
        app.variable.setNumValue('vDivision', 1000);


        if (html_tab === 'Malawi') {
            app.field('[Company]').clear().then(function () {
                app.field('[Company]').selectValues(['FES Malawi Limited'], true).then(function () {
                    app.field('[Site]').selectValues(['Cont ZW'], true).then(function () {
                        app.field('[Site]').selectExcluded().then(function () {
                            getReports('malawi');
                        })
                    })
                })
            })
        }


        if (html_tab === 'Group') {
            app.field('[Company]').clear().then(function () {
                app.field('[Site]').clear().then(function () {
                    getReports('consolidated');
                })
            })
        }

        if (html_tab === 'Zambia') {
             app.field('[Company]').clear().then(function () {
                 app.field('[Company]').selectValues(['FES Zambia Limited'], true).then(function () {
                     app.field('[Site]').clear().then(function () {
                         getReports('zambia')
                     })
                 })
             })
        }

        if (html_tab === 'Tanzania') {
            app.field('[Company]').clear().then(function () {
                app.field('[Company]').selectValues(['FES Tanzania'], true).then(function () {
                    app.field('[Site]').clear().then(function () {
                        getReports('tanzania')
                    })
                })
            })
        }
    })
})
