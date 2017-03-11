import { intCommaFilter } from './intComma.filter';
import { numberSuffixFilter } from './numberSuffix.filter';

angular
    .module('app.filters', [

    ])
    .filter('intCommaFilter', intCommaFilter)

    .filter('numberSuffixFilter', numberSuffixFilter)
    ;
