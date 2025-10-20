const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
    if (IS_DEV) return 'com.lucrecolon.nitronote.dev';
    if (IS_PREVIEW) return 'com.lucrecolon.nitronote.preview';
    return 'com.lucrecolon.nitronote';
};

const getAppName = () => {
    if (IS_DEV) return 'NitroNote (Dev)';
    if (IS_PREVIEW) return 'NitroNote (Preview)';
    return 'NitroNote';
};

export default ({ config }) => ({
    ...config,
    name: getAppName(),
    ios: {
        ...config.ios,
        bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
        ...config.android,
        package: getUniqueIdentifier(),
    },
    plugins: [
        "expo-font",
        [
            "expo-notifications",
            {
                icon: "./assets/NitroNoteIcon.png",
                color: "#ffffff"
            }
        ],
        "expo-updates"
    ],
    extra: {
        eas: {
            projectId: "6666c354-4eee-4a68-a69f-3e1e4959e283"
        },
        API_URL: "https://nitronotebackend-production.up.railway.app",
        APP_VARIANT: process.env.APP_VARIANT || 'production'
    },
    updates: {
        url: "https://u.expo.dev/6666c354-4eee-4a68-a69f-3e1e4959e283",
        fallbackToCacheTimeout: 0
    }
});
