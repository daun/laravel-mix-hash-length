const mix = require("laravel-mix");

/**
 * Globally adjusting hash length
 */
class HashLength {
  constructor() {
    this.hashLength = null;
  }

  /**
   * Register the component.
   *
   * @param {Number} hashLength
   */
  register(hashLength) {
    if (typeof hashLength === "number") {
      this.hashLength = Math.floor(hashLength);
    } else {
      this.hashLength = null;
    }
  }

  /**
   * Override the generated webpack configuration.
   *
   * @param {Object} webpackConfig
   */
  webpackConfig(webpackConfig) {
    if (!this.hashLength) return;

    const rules = this.findFileLoaderRules(webpackConfig);

    if (webpackConfig.output.filename) {
      webpackConfig.output.filename = this.adjustHashLength(
        webpackConfig.output.filename
      );
    }
    if (webpackConfig.output.chunkFilename) {
      webpackConfig.output.chunkFilename = this.adjustHashLength(
        webpackConfig.output.chunkFilename
      );
    }

    rules.forEach((module) => {
      const fileOptions = this.findFileNameOptions(module);
      fileOptions.forEach((options) => {
        options.name = this.adjustHashLength(options.name);
      });
    });
  }

  /**
   * Find all file-loader rules
   *
   */
  findFileLoaderRules(webpackConfig) {
    const { rules } = webpackConfig.module;
    const isFileLoader = (m) => {
      const loaders = m.loaders || m.use || [];
      return m.loader === "file-loader" || loaders.find(isFileLoader);
    };
    return rules.filter(isFileLoader);
  }

  /**
   * Find all options that define output filenames
   *
   */
  findFileNameOptions(module) {
    const options = [module.options];
    const loaders = module.loaders || module.use || [];
    loaders.forEach((loader) => {
      options.push(loader.options);
    });
    return options.filter((option) => option && option.name);
  }

  /**
   * Adjust the hash length for a given filename config item
   *
   */
  adjustHashLength(filename) {
    if (typeof filename === "string") {
      return filename.replace(
        /\[(hash|chunkhash|contenthash)(:\d+)?\]/,
        `[$1:${this.hashLength}]`
      );
    }
    if (typeof filename === "function") {
      return (path) => this.adjustHashLength(filename(path));
    }
    return filename;
  }
}

mix.extend("hashLength", new HashLength());
