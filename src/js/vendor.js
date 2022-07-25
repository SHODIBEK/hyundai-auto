import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
// import $ from 'jquery';

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');

import 'owl.carousel';
import './vendor/datetimepicker';
import './vendor/revelalotor';
