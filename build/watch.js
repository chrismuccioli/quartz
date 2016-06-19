'use strict';

const chokidar    = require('chokidar');
const fs          = require('fs');
const walk        = require('fs-walk');
const hljs        = require('highlight.js');
const chalk       = require('chalk');
const babel       = require('babel-core');
const sass        = require('node-sass');
const uglify      = require('uglify-js');
const concat      = require('concat-files');
const src         = {
  // app
  appcss: {
    watch: './app/client/styles/*.scss',
    manifest: './build/_app.scss',
    distr: 'app/public/app.css'
  },
  appjs: {
    watch: './app/client/**/*.js',
    manifest: './build/_app.js',
    distr: 'app/public/app.js'
  },
  // vendor
  vendorjs: {
    manifest: './build/_vendor.js',
    distr: 'app/public/vendor.js'
  },
  // quartz
  quartzjs: {
    watch: './quartz-js/**/*.js',
    manifest: './build/_quartz.js',
    distr: 'app/public/quartz.js'
  },
  quartzcss: {
    watch: './quartz-css/**/*.scss',
    manifest: './quartz-css/vhx.scss',
    distr: 'app/public/quartz.css'
  },
  quartzicons: {
    manifest: './quartz-css/vhx-style-icons/styles/icons.svg.scss',
    distr: 'app/public/quartz-icons.css'
  }
};

/* ....................................
  APP CSS > public/app.css
....................................*/
const app_css_watcher = chokidar.watch(src.appcss.watch, {
  ignored: /[\/\\]\./
});

app_css_watcher.add(src.appcss.manifest);
app_css_watcher.on('change', function() {
    sass.render({
      file: src.appcss.manifest
    }, function(err, output) {
      fs.writeFile(src.appcss.distr, output.css, function(err) {
        if (err) {
          process.stdout.write(chalk.red(err));
        }
      });
    });
});

/* ....................................
  APP JS > public/app.js
....................................*/
const app_js_watcher = chokidar.watch(src.appjs.watch, {
  ignored: /[\/\\]\./
});

app_js_watcher.add('quartz-css/**/*.html.js');
app_js_watcher.add(src.appjs.manifest);
app_js_watcher.on('change', function() {
  concat(require('.' + src.appjs.manifest), src.appjs.distr, function() {
    let components = babel.transform(fs.readFileSync(src.appjs.distr).toString(), {
      'presets': ['es2015']
    }).code;
    let scope = babel.transform(fs.readFileSync('app/client/scope.js').toString(), {
      'presets': ['es2015']
    }).code;

    let Q = { code: {} };
    let views = '';

    walk.walkSync('quartz-css', function(base_dir, filename) {
      if (base_dir.match(/\/docs/) && filename.match(/\.html\.js/)) {
        let template = fs.readFileSync(base_dir + '/' + filename, 'utf8');
        views = views + template;
      }
      if (base_dir.match(/\/docs\/code/)) {
        let temp = fs.readFileSync(base_dir + '/' + filename, 'utf8');
        let name = filename.split('.')[0];
        let language = filename.split('.')[1];

        if (language.match(/rb/)) {
          language = 'ruby';
        }

        Q.code[name] = {
          language: language,
          template: hljs.highlight(language, temp).value
        };
      }
    });

    let min = uglify.minify(scope + ';' + views + ';' + ';Q.code=' + JSON.stringify(Q.code) + ';' + components, { fromString: true });

    fs.writeFile(src.appjs.distr, min.code, 'utf-8');
  });
});


/* ....................................
  VENDOR JS > public/vendor.js
....................................*/
chokidar.watch(src.vendorjs.manifest, {
  ignored: /[\/\\]\./
}).on('change', function() {
  fs.writeFile(src.vendorjs.distr, '', 'utf-8');
  concat(require('.' + src.vendorjs.manifest), src.vendorjs.distr, function(err) {
    if (err) {
      process.stdout.write(chalk.red(err));
    }

    let min = uglify.minify(src.vendorjs.distr);
    fs.writeFile(src.vendorjs.distr, min.code, function(err) {
      if (err) {
        process.stdout.write(chalk.red(err));
      }
    });
  });
});


/* ....................................
  QUARTZ ICONS > public/quartz-icons.css
....................................*/
chokidar.watch(src.quartzicons.manifest, {
  ignored: /[\/\\]\./
}).on('change', function() {
  sass.render({
      file: src.quartzicons.manifest
  }, function(err, output) {
    fs.writeFile(src.quartzicons.distr, output.css, function(err) {
      if (err) {
        process.stdout.write(chalk.red(err));
      }
    });
  });
});

/* ....................................
  QUARTZ CSS > public/quartz.css
....................................*/
const quartz_css_watcher = chokidar.watch(src.quartzcss.watch, {
  ignored: /[\/\\]\./
});

quartz_css_watcher.add(src.quartzcss.manifest);
quartz_css_watcher.on('change', function() {
    sass.render({
      file: src.quartzcss.manifest
    }, function(err, output) {
      fs.writeFile(src.quartzcss.distr, output.css, function(err) {
        if (err) {
          process.stdout.write(chalk.red(err));
        }
      });
    });
});

/* ....................................
  QUARTZ JS > public/quartz.js
....................................*/
const quartz_js_watcher = chokidar.watch(src.quartzjs.watch, {
  ignored: /[\/\\]\./
});

quartz_js_watcher.add(src.quartzjs.manifest);
quartz_js_watcher.on('change', function() {
  walk.walkSync('quartz-js/components', function(base_dir, filename, stat) {
    if (!stat.isDirectory() && !filename.match(/scope\.js/)) {
      src.quartzjs.manifest.push(base_dir + '/' + filename);
    }
  });

  concat(src.quartzjs.manifest, src.quartzjs.distr, function() {
    let result = babel.transform(fs.readFileSync(src.quartzjs.distr).toString(), {
      'presets': ['es2015']
    });

    let min = uglify.minify(result.code, { fromString: true });
    fs.writeFile(src.quartzjs.distr, min.code, function(err) {
      if (err) {
        process.stdout.write(chalk.red(err));
      }
    });
  });
});