var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jade = require('gulp-jade'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	batch = require('gulp-batch'),
	jshint = require('gulp-jshint'),
	gulpsync = require('gulp-sync')(gulp),
	server = require('gulp-server-livereload'),
	connect = require('gulp-connect'),
	Karma = require('karma').Server,
	gls = require('gulp-live-server'),
	monitorCtrlC = require('monitorctrlc');
	browserify = require('gulp-browserify');

var server = gls.new('server.js');

gulp.task('serve', function() {
	// server ;
	server.start();

	monitorCtrlC();

	 gulp.watch(['public/**/*.js', 'public/**/*.html'], function (file) {
	    server.notify.apply(server, [file]);
	  });
})

gulp.task('test', function(done) {
	new Karma({
		configFile: __dirname + '/karma.conf.js',
	}, done).start();
});

gulp.task('clean', function() {
	return gulp.src('public', { read: false })
		.pipe(clean());
})

gulp.task('jade', function() {
	return gulp.src('frontend/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('public/templates'))
});

gulp.task('jade-index', function() {
	return gulp.src('frontend/layout/index.jade')
		.pipe(jade())
		.pipe(gulp.dest('public'))
})

gulp.task('css', function() {
	return gulp.src('frontend/**/*.styl')
		.pipe()
})

gulp.task('concat-libs', function() {
	return gulp.src([
			'bower_components/angular/angular.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('concat-app', function() {
	return gulp.src([
			'frontend/app.module.js',
			'frontend/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/javascripts'))
});

gulp.task('jshint', function() {
	return gulp.src('frontend/**/*.js')
	// return gulp.src('public/javascripts/app.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function() {
	monitorCtrlC();
	gulp.watch(['frontend/**/*.js', 'tests/**/*.js'], ['js']);
	monitorCtrlC();
	gulp.watch('frontend/**/*.jade', ['html']);
	monitorCtrlC();
	gulp.watch('server.js', ['restart']);
})

gulp.task('js', gulpsync.sync([
		'jshint',
		// 'test',
		[
			'concat-app',
			'concat-libs'
		]
	])
);


gulp.task('restart', function() {
	server.stop().then(function(){
		server.start();
	})
})

gulp.task('html', ['jade', 'jade-index']);

gulp.task('build', ['js', 'html']);

gulp.task('default', ['build'], function() {
	gulp.start(['serve', 'watch'])
});

