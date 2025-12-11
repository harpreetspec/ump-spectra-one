// ==================== Jenkinsfile Live =================

pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --force'
            }
        }

        stage('Build React App') {
            steps {
                sh 'CI=false npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Deploy to CentOS') {
            steps {
                sh '''
                    set -e

                    REMOTE_HOST="root@localhost"
                    TARGET_DIR="/var/www/html/spectra_ui"

                    # Create folder if not exists
                    ssh "$REMOTE_HOST" "mkdir -p $TARGET_DIR"

                    # Clear previous build
                    ssh "$REMOTE_HOST" "rm -rf $TARGET_DIR/*"

                    # Upload new build using scp
                    scp -r build/* "$REMOTE_HOST:$TARGET_DIR/"

                    # Restart PM2 App
                    ssh "$REMOTE_HOST" "
                        pm2 delete spectra_ui || true
                        pm2 serve $TARGET_DIR 3000 --spa --name spectra_ui
                        pm2 save
                    "
                '''
            }
        }
    }

    post {

        success {
            emailext(
                to: 'naveen.kumar3@spectra.co, megha.deshmukh@spectra.co',
                subject: "SUCCESS: Jenkins Build #${env.BUILD_NUMBER}",
                body: "The Jenkins pipeline completed successfully."
            )
        }

        failure {
            emailext(
                to: 'naveen.kumar3@spectra.co, megha.deshmukh@spectra.co',
                subject: "FAILED: Jenkins Build #${env.BUILD_NUMBER}",
                body: "The Jenkins pipeline failed. Please check the console logs."
            )
        }
    }
}


// pipeline {
//     agent any

//     tools {
//         nodejs 'node20'   // Make sure this name exists in Global Tool Configuration
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 // Reuse job's SCM + credentials configured in the job
//                 checkout scm

//                 // Or explicit:
//                 // git branch: 's1-nk',
//                 //     url: 'https://github.com/spectradevops/spectra_one_ui.git',
//                 //     credentialsId: 'git-naveen'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install --force'
//                 // or:
//                 // sh 'npm ci --force'
//             }
//         }

//         stage('Build React App') {
//             steps {
//                 // That CRA message about bundle size is only a WARNING, not an error
//                 sh 'CI=false npm run build'
//             }
//         }

//         stage('Archive Build') {
//             steps {
//                 archiveArtifacts artifacts: 'build/**', fingerprint: true
//             }
//         }

//         stage('Deploy to CentOS') {
//             steps {
//                 sh '''
//                     set -e

//                     REMOTE_HOST="user@your-centos-host"
//                     TARGET_DIR="/var/www/html/spectra_ui"

//                     # Ensure target dir exists and clear old files
//                     ssh "$REMOTE_HOST" "mkdir -p $TARGET_DIR && rm -rf $TARGET_DIR/*"

//                     # Copy new build
//                     scp -r build/* "$REMOTE_HOST:$TARGET_DIR/"

//                     # Restart PM2 app on remote
//                     ssh "$REMOTE_HOST" "cd $TARGET_DIR && pm2 delete spectra_ui || true"
//                     ssh "$REMOTE_HOST" "cd $TARGET_DIR && pm2 serve . 3000 --spa --name spectra_ui"

//                     # Optionally persist PM2 across reboot:
//                     # ssh "$REMOTE_HOST" "pm2 save"
//                 '''
//             }
//         }
//     }
// }


// ========== Jenkinsfile Local ==========
// pipeline {
//     agent any

//     tools {
//         nodejs "node20"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 's1-nk', url: 'https://github.com/spectradevops/spectra_one_ui.git'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install -force'
//             }
//         }

//         stage('Build React App') {
//             steps {
//                 bat """
//                     set CI=false
//                     npm run build
//                 """
//             }
//         }

//         stage('Archive Build') {
//             steps {
//                 archiveArtifacts artifacts: 'build/**', fingerprint: true
//             }
//         }
//     }
// }
