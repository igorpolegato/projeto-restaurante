function getEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`)
    }
    return value
}

export const ENV = {
    NODE_ENV: getEnv("NODE_ENV"),
    PORT: Number(getEnv("PORT") || 5000),

    DB: {
        DIALECT: getEnv("DB_DIALECT"),
        HOST: getEnv("DB_HOST"),
        PORT: Number(getEnv("DB_PORT") || 5432),
        NAME: getEnv("DB_NAME"),
        USER: getEnv("DB_USER"),
        PASS: getEnv("DB_PASS"),
    },
}
