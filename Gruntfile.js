module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'js/',
                    ext: '.min.js'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles/sass',
                    src: ['*.scss', '**/*.scss'],
                    dest: 'styles/',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 0%']
            },
            dist: {
                src: ['styles/**/*.css', '!styles/sass/**/*.css']
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles/',
                    src: ['*.css', '**/*.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            sass: {
                files: ['styles/sass/*.scss', 'styles/sass/**/*.scss'],
                tasks: ['scss', 'prefix', 'css'],
                options: {},
            },
            js: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['js'],
                options: {},
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['scss', 'prefix', 'css']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('scss', ['sass']);
    grunt.registerTask('prefix', ['autoprefixer']);
    grunt.registerTask('css', ['cssmin']);
}
