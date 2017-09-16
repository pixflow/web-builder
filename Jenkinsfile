pipeline {
  agent any
  stages {
    stage('Automation Test') {
      properties([pipelineTriggers([[$class: 'GitHubPushTrigger'], pollSCM('H/15 * * * *')])])
	  checkout scm
	  env.PATH = "${tool 'Maven 3'}/bin:${env.PATH}"
	  sh 'mvn clean package'
      steps {
        sh '''cd /var/www/html/karma-test/src/wp-content/plugins/karma-builder
git pull
cd /var/www/html/karma-test/
./vendor/phpunit/phpunit/phpunit'''
      }
    }
  }
}
