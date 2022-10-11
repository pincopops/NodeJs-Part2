const missinSetting = "Warning: No value set for this environment variable";

const config = {
    "PORT": process.env.PORT || missinSetting,
    "SESSION_SECRET": process.env.SESSION_SECRET || missinSetting,
};

export default config;