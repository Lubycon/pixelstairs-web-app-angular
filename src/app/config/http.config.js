

export function httpConfig($httpProvider) {
    'ngInject';

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('HTTPInterceptorService');
}
