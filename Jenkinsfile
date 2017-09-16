pipeline {
  agent any
  stages {
    stage('Automation Test') {
      steps {
        sh '''cd /var/www/html/karma-builder/
./vendor/phpunit/phpunit/phpunit'''
      }
    }
  }
}