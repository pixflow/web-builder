pipeline {
  agent any
  triggers { pollSCM('H 4/* 0 0 1-5') }
  stages {
    stage('Automation Test') {
      steps {
        sh '''cd /var/www/html/karma-test/src/wp-content/plugins/karma-builder
git pull
cd /var/www/html/karma-test/
./vendor/phpunit/phpunit/phpunit'''
      }
    }
  }
}
