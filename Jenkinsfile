pipeline {
  agent any
  stages {
    stage('Automation Test') {
      steps {
        sh '/var/www/html/karma-builder/vendor/phpunit/phpunit/phpunit'
      }
    }
  }
}