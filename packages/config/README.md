# @forge/config

Loads FORGE configuration once at application startup. The public API is
`loadConfig()` and the exported configuration types.

Configuration precedence is:

1. Environment variables
2. The `localConfig` object supplied to `loadConfig`
3. Package defaults

Supported environment variables are `NODE_ENV`, `DATABASE_URL`, `LOG_LEVEL`,
`APP_NAME`, and `APP_VERSION`. `DATABASE_URL` is required. Defaults are
`development` for `NODE_ENV`, `info` for `LOG_LEVEL`, `forge` for `APP_NAME`,
and `0.1.0` for `APP_VERSION`.

The returned configuration and each of its top-level sections are frozen.
Invalid explicitly supplied values throw `ConfigValidationError`.
