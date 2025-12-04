pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 's1-nk', url: 'https://github.com/spectradevops/spectra_one_ui.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install -force'
            }
        }

        stage('Build React App') {
            steps {
                bat 'set CI=false && npm run build'
            }
        }

        stage('Serve App Locally') {
            steps {
                bat 'npm install -g serve'
                bat 'serve -s build -l 3000'
            }
        }
    }
}
