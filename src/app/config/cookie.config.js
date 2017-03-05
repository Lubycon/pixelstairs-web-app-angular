

export function cookieConfig($cookiesProvider) {
    'ngInject';

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    $cookiesProvider.defaults.expires = expires;
}
