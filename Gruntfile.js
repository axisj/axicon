module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		cssmin: {
			add_banner: {
				options: {
					banner: '/*! \n<%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
				},
				files: {
					'axicon/axicon.min.css':
						[
							'axicon/axicon.css'
						]
				}
			}
		}
	});
	//grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('css', ['cssmin']);
};