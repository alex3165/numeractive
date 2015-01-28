module.exports = function(grunt) {

	grunt.initConfig({
        // lint the code with project jshintrc definition
        jshint: {
            src: ['public/js/*.js'],
            options: {
                jshintrc: true
            }
        },
        stylus: {
            'dev': {
                options: {
                    compress: false
                },
                src: ['public/style.styl'],
                dest: 'public/dist/style.css'
            }
        },
	});

}