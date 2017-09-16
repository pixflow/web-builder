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
      
      post {
        success {
          echo "Only when we haven't failed running the first stage"
        }

        failure {
          mail(from: "m.rezaei@airinmedia.com", 
             to: "rezaei.expert@gmail.com", 
             subject: "That build failed!", 
             body: "Please check the master branch")
        }
      }
    }
  }
}
