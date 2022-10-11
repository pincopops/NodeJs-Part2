const missinSetting = "Warning: No value set for this environment variable";

const config = {
    "PORT": process.env.PORT || missinSetting,
};

export default config;