const missinSetting = "Warning: No value set for this environment variable";

const config = {
    "PORT": process.env.PORT || missinSetting,
    "SESSION_SECRET": process.env.SESSION_SECRET || missinSetting,
    "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID || missinSetting,
    "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET || missinSetting,
    "GITHUB_CALLBACK_URL": process.env.GITHUB_CALLBACK_URL || missinSetting, 
};

export default config;