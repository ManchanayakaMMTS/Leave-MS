pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dckr_pat_B2demgPOONx0FttaaK0ULJI-xeM'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/DulshanSiriwardhana/4219-Siriwardhana.git'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build and push frontend image
                    docker.build('frontend', '-f frontend/Dockerfile .').push()

                    // Build and push backend image
                    docker.build('backend', '-f backend/Dockerfile .').push()
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy using Docker Compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
