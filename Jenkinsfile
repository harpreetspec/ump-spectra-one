// ==================== Jenkinsfile Live =================

pipeline {
    agent any

    tools {
        nodejs 'node20'   // Make sure this name exists in Global Tool Configuration
    }

    stages {

        stage('Checkout') {
            steps {
                // Reuse job's SCM + credentials
                checkout scm

                // OR explicit:
                // git branch: 's1-nk',
                //     url: 'https://github.com/spectradevops/spectra_one_ui.git',
                //     credentialsId: 'git-naveen'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --force'
                // or:
                // sh 'npm ci --force'
            }
        }

        stage('Build React App') {
            steps {
                // CRA warning about bundle size is just a warning, not a failure
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
                sshPublisher(
                    publishers: [
                        [
                            configName: 'spectra_server',      // must match your Publish over SSH server name
                            transfers: [[
                                sourceFiles: 'build/**',
                                removePrefix: 'build',
                                remoteDirectory: '/var/www/html/spectra_ui',
                                execCommand: '''
                                    set -e

                                    cd /var/www/html/spectra_ui

                                    # Stop existing PM2 app (if running)
                                    pm2 delete spectra_ui || true

                                    # Serve React build using PM2 on port 3000
                                    pm2 serve . 3000 --spa --name "spectra_ui"

                                    # Optionally persist PM2 config across reboots
                                    # pm2 save
                                '''
                            ]],
                            usePromotionTimestamp: false,
                            verbose: true
                        ]
                    ]
                )
            }
        }

    }
}





// ========== Jenkinsfile Locally ==========
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
