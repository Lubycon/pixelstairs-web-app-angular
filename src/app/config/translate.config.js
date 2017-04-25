

export function translateConfig(
    $translateProvider, $translatePartialLoaderProvider,
    APP_LANGUAGES
) {
    'ngInject';

    /*
        each module loads its own translation file - making it easier to create translations
        also translations are not loaded when they aren't needed
        each module will have a il8n folder that will contain its translations
    */

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'app/il8n/{lang}.json'
    });

    $translatePartialLoaderProvider.addPart('app');

    // make sure all values used in translate are sanitized for security
    $translateProvider.useSanitizeValueStrategy('escaped');

    // cache translation files to save load on server
    $translateProvider.useLoaderCache(true);

    let languageTemp = APP_LANGUAGES.map((v) => {
        return v.key.split('-')[0];
    });
    /**
     *  try to detect the users language by checking the following
     *      navigator.language
     *      navigator.browserLanguage
     *      navigator.systemLanguage
     *      navigator.userLanguage
     */

    $translateProvider.registerAvailableLanguageKeys(languageTemp, {
        'ko_KR': 'ko',
        'en_*': 'en'
    }).determinePreferredLanguage();

    $translateProvider.useLocalStorage();
}
