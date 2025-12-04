// ==================== Jenkinsfile Live =================

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
                bat """
                    set CI=false
                    npm run build
                """
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
                        sshPublisherDesc(
                            configName: "spectra_server",
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "build/**",
                                    removePrefix: "build",
                                    remoteDirectory: "/var/www/spectra_ui/",
                                    execCommand: """
                                        cd /var/www/spectra_ui

                                        # Stop existing PM2 app (if running)
                                        pm2 delete spectra_ui || true

                                        # Serve React build using PM2
                                        pm2 serve . 3000 --spa --name "spectra_ui"

                                        # Save PM2 process list
                                        pm2 save
                                    """
                                )
                            ],
                            usePromotionTimestamp: false
                        )
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
