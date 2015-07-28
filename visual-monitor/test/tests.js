'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'iphone5': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://www.fattal-alazman.co.il';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl + '/deal/leonardo_plaza_eilat_8210')
      .click('#closeBTN')
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude: [
          // Dynamic deal content
          '.content',
          '.hotelLogo',
          '.roomType',
          '.date',
          '.totalPrice',
          '.beforeDis',
          '.forNightsDealPage',
          '.precents',
          '.roomsNum',
          '.roomsSoldNum',
          '#countdown_dashboard2',
          '#countdown_dashboard2  span > div',
          '.mainTextHolder p',
          '.mainTextHolder div',


          // Hotel details
          '.hotelNameBottom',
          '.address',
          '.phone',
          '.email',
          '.smallMap img',

          // Other deals content
          '.more0pportunityTitle',
          '.more0pportunityImg',
          '.totalPriceSide',


          // Social counter
          '.fbLike',
          '.gPlus',
          '.facebookFanBox',
          '.pluginConnectButton',
          '._2ph-'
        ],
        remove: [
          '.stickyFtr',
          '.textHolder'
        ]
        //screenWidth: selectedCaps == 'chrome' ? [320, 640, 960, 1200] : undefined,
      }, console.log())
      .call(done);
  });
});
