// ==================== Jenkinsfile Live =================

pipeline {
    agent any

    tools {
        nodejs 'node20'   // Make sure this name exists in Global Tool Configuration
    }

    stages {

        stage('Checkout') {
            steps {
                // Reuse job's SCM + credentials configured in the job
                checkout scm

                // Or explicit:
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
                // That CRA message about bundle size is only a WARNING, not an error
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
                    TARGET_DIR="/var/www/html/spectra_ui/build"

                    # Ensure target dir exists and clear old files
                    ssh "$REMOTE_HOST" "mkdir -p $TARGET_DIR && rm -rf $TARGET_DIR/*"

                    # Copy new build
                    scp -r build/* "$REMOTE_HOST:$TARGET_DIR/"

                    # Restart PM2 app on remote
                    ssh "$REMOTE_HOST" "cd $TARGET_DIR && pm2 delete spectra_ui || true"
                    ssh "$REMOTE_HOST" "cd $TARGET_DIR && pm2 serve . 3000 --spa --name spectra_ui"

                    # Optionally persist PM2 across reboot:
                    # ssh "$REMOTE_HOST" "pm2 save"
                '''
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
