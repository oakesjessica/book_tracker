module.exports = function(grunt) {
  //  Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      scripts: {
        files: ["client/*.js"],
        tasks: ["uglify"],
        options: {
          spawn:false
        } //  options
      } //  scripts
    }, //  watch
    uglify: {
      build: {
        src: "client/client.js",
        dest:
        "server/public/assets/scripts/client.min.js"
      } //  build
    }, //  uglify

    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: [
          "angular/angular.min.js",
          "angular/angular.min.js.map",
          "angular-route/angular-route.min.js",
          "angular-route/angular-route.min.js.map",
          "angular-smart-table/dist/smart-table.min.js",
          "bootbox/bootbox.min.js",
          "bootstrap/dist/css/bootstrap.min.css",
          "bootstrap/dist/css/bootstrap.min.css.map",
          "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2",
          "bootstrap/dist/fonts/glphyicons-halflings-regular.woff",
          "bootstrap/dist/fonts/glyphicons-halfings-regular.tff",
          "bootstrap/dist/js/bootstrap.min.js",
          "font-awesome/css/font-awesome.min.css",
          "font-awesome/fonts/fontawesome-webfont.woff2",
          "font-awesome/fonts/fontawesome-webfont.woff",
          "font-awesome/fonts/fontawesome-webfont.tff",
          "jquery/dist/jquery.min.js",
          "moment/min/moment.min.js"
        ],  //  src
        "dest": "server/public/vendors/"
      }, //  main
      // files: {
      //   expand: true,
      //   cwd: "node_modules/bootstrap/dist/fonts",
      //   src: "**/*",
      //   "dest": "server/public/vendors/bootstrap/dist/fonts"
      // } //  files
    } //  copy
  });  //  grunt.initConfig

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-watch');

  //  Default task(s).
  grunt.registerTask("default", ["copy", "uglify"]);
  grunt.registerTask("start-watch", ["uglify", "copy", "watch"]);
};
