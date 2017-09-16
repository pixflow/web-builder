pipeline {
  agent any
  triggers {
    cron('H/15 * * * *')
  }
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
