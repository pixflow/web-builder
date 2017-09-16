pipeline {
  agent any
  stages {
    stage('Automation Test') {
      steps {
        sh '''cd /var/www/html/karma-builder/src/wp-content/plugins/karma-builder
git pull
cd /var/www/html/karma-builder/
./vendor/phpunit/phpunit/phpunit'''
      }
    }
  }
}