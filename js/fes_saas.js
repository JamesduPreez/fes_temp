
var config = {
	host: 'fes.eu.qlikcloud.com',
	prefix: '/',
	port: 443,
	isSecure: true,
	webIntegrationId:'dAyQLawWpoewvH17sujCqZstQqnxPk_Q'
};





//Redirect to login if user is not logged in
async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}
login().then(() => {
	require.config({
		baseUrl: `https://${config.host}/resources`, webIntegrationId: config.webIntegrationId
	});


	require(["js/qlik"], function (qlik) {
		/********************************************* Profit and Loss Analysis - Group *****************************************/


		qlik.on('error', (error) => console.error(error));


		//callbacks -- inserted here --

		//open apps -- inserted here --
		AppIdDev = '1cc2c33d-4f54-4a9a-879b-3dea21219a4d';
		appId = '1cc2c33d-4f54-4a9a-879b-3dea21219a4d';
		const app = qlik.openApp(AppIdDev, config);

		//get objects -- inserted here --

		html = '';
		/*********************************************** Top Calendar Selection *****************************************/

		app.getObject('QV01', 'a8ed595b-7b5a-4b9e-98f3-bc6a6bd49016');
		app.field('[Company]').clear();
		app.field('[Financial Year]').selectValues(['April/2021 - March/2022'], true);
		app.field('[Fin Month]').selectValues([8], true);

		/***** Empty HTML Before loading */
		$("#report-consolidated").empty();
		/********************************************* Group Income Statement *****************************************/

		html = '<!-- Consolidated Income Statement -->' +
			'<div class="flex-container print_scale item-margin report-description">' +
			'<h3>GROUP INCOME STATEMENT (USD)</h3>' +
			'<div id="QV02" class="qvplaceholder  consolidated-is"></div>' +
			'</div>';


		$("#report-consolidated").append(html);
		app.getObject('QV02', '8192fca6-3555-4d53-bda1-89cbd91765a0', {
			noSelections: true,
			noInteraction: true
		});

//


		/********************************************* Group Balance Sheet *****************************************/

		thisID = 'QV03';
		html = '<!-- Consolidated Income Statement -->' +
			'<div class="flex-container print_scale item-margin report-description">' +
			'<h3>BALANCE SHEET (Consolidated)</h3>' +
			'<div id="' + thisID + '" class="qvplaceholder  item-height-1000k"></div>' +
			'</div>';

		$("#report-consolidated").append(html);
		app.getObject(thisID, 'dae9498b-debb-4ef3-88bf-7ce218f6fde1', {
			noSelections: true,
			noInteraction: true
		});

		/********************************************* Group Cashflow *****************************************/

		thisID = 'QV04';
		html = '<!-- Consolidated Income Statement -->' +
			'<div class="flex-container print_scale item-margin report-description">' +
			'<h3>CASH FLOW STATEMENT</h3>' +
			'<div id="' + thisID + '" class="qvplaceholder  item-height-1000k"></div>' +
			'</div>';

		$("#report-consolidated").append(html);
		app.getObject(thisID, '4c86a713-8a95-4804-8b4a-9248016e3e7a', {
			noSelections: true,
			noInteraction: true
		});


		/*********************************************** MALAWI ****************************************************/

		function malawi() {

			app.field('[Company]').selectValues(['FES Malawi Limited'], true);
			app.field('[Site]').selectValues(['Cont ZW'], true);
			app.field('[Site]').selectExcluded();

			/***** Empty HTML Before loading */
			$("#report-malawi").empty();
			/********************************************* Profit and Loss Analysis - Malawi *****************************************/

			app.getObject("pzHu").then(function (model) {
				console.log(model);
			});

			thisID = 'QV10';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>MALAWI INCOME STATEMENT ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1500k" ></div>' +
				'</div>';


			$("#report-malawi").append(html);
			app.getObject(thisID, 'pzHu', {
				noSelections: true,
				noInteraction: true
			});


			/********************************************* TOP Customers - Malawi *****************************************/

			thisID = 'QV11';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>MALAWI TOP CUSTOMERS ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height" ></div>' +
				'</div>';

			$("#report-malawi").append(html);
			app.getObject(thisID, 'vZfJe', {
				noSelections: true,
				noInteraction: true
			});

			/********************************************* OPEX - Malawi *****************************************/
			thisID = 'QV12';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>MALAWI OPERATING EXPENSES ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-2000k" ></div>' +
				'</div>';

			$("#report-malawi").append(html);
			app.getObject(thisID, 'NLVENsw', {
				noSelections: true,
				noInteraction: true
			});


			/********************************************* Balance Sheet - Malawi *****************************************/
			thisID = 'QV13';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>MALAWI BALANCE SHEET ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1000k" ></div>' +
				'</div>';

			$("#report-malawi").append(html);
			app.getObject(thisID, 'dae9498b-debb-4ef3-88bf-7ce218f6fde1', {
				noSelections: true,
				noInteraction: true
			});


			/********************************************* Cash flow - Malawi *****************************************/
			thisID = 'QV14';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>MALAWI CASH FLOW STATEMENT ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1000k" ></div>' +
				'</div>';

			$("#report-malawi").append(html);
			app.getObject(thisID, '4c86a713-8a95-4804-8b4a-9248016e3e7a', {
				noSelections: true,
				noInteraction: true
			});


		}


		/*********************************************** ZAMBIA ****************************************************/

		function zambia() {

			app.field('[Company]').selectValues(['FES Zambia Limited'], true);
			app.field('[Site]').clear();
			/***** Empty HTML Before loading */
			$("#report-zambia").empty();
			/********************************************* Profit and Loss Analysis - ZAMBIA *****************************************/

			app.getObject("pzHu").then(function (model) {
				console.log(model);
			});

			thisID = 'QV100';
			thisHeight = 1500;
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>ZAMBIA INCOME STATEMENT ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1500k" ></div>' +
				'</div>';


			$("#report-zambia").append(html);
			app.getObject(thisID, 'pzHu', {
				noSelections: true,
				noInteraction: true
			});


			/********************************************* TOP Customers - ZAMBIA *****************************************/

			thisID = 'QV110';
			thisHeight = 1000;
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>ZAMBIA TOP CUSTOMERS ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-500k" ></div>' +
				'</div>';

			$("#report-zambia").append(html);
			app.getObject(thisID, 'vZfJe', {
				noSelections: true,
				noInteraction: true
			});

			/********************************************* OPEX - ZAMBIA *****************************************/
			thisID = 'QV120';
			thisHeight = 1000;
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>ZAMBIA OPERATING EXPENSES ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-2000k" ></div>' +
				'</div>';

			$("#report-zambia").append(html);
			app.getObject(thisID, 'NLVENsw', {
				noSelections: true,
				noInteraction: true
			});


//********************************************* Balance Sheet - Zambia *****************************************/
			thisID = 'QV130';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>ZAMBIA BALANCE SHEET ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1000k" ></div>' +
				'</div>';

			$("#report-zambia").append(html);
			app.getObject(thisID, 'dae9498b-debb-4ef3-88bf-7ce218f6fde1', {
				noSelections: true,
				noInteraction: true
			});


			/********************************************* Cash flow - Zambia *****************************************/
			thisID = 'QV140';
			html = "<!-- Consolidated Income Statement -->" +
				'<div class="flex-container print_scale item-margin report-description">' +
				'<h3>ZAMBIA CASH FLOW STATEMENT ($USD)</h3>' +
				'<div id="' + thisID + '" class="qvplaceholder item-height-1000k" ></div>' +
				'</div>';

			$("#report-zambia").append(html);
			app.getObject(thisID, '4c86a713-8a95-4804-8b4a-9248016e3e7a', {
				noSelections: true,
				noInteraction: true
			});


		}

		/********************************************* JAVA FUNCTIONS *****************************************/


		//SET START VARIABLE
		app.variable.setNumValue('vDivision', 1000);
		app.field('[Company]').clear();
		app.field('[Site]').clear();

		$('a[data-mdb-toggle="tab"]').on('shown.bs.tab', function (e) {

			html_tab = e.currentTarget.getAttribute("data-qlik-select");
			app.variable.setNumValue('vDivision', 1000);


			if (html_tab === 'Malawi') {
				console.log(html_tab);

				malawi();

			}
			if (html_tab === 'Group') {
				console.log(html_tab);
				app.field('[Company]').clear();
				app.field('[Site]').clear();

			}
			if (html_tab === 'Zambia') {
				console.log(html_tab);
				zambia();

			}


			qlik.resize();

		})


	});
});
