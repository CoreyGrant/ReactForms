module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('js', ["browserify"]);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [["babelify"]],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					"public/javascripts/app.js": "client/main.js"
				}
			}
		},
		watch: {
			files: ["client/main.js"],
			tasks: ['js']
		}
	});
}