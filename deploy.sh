#!/bin/bash
# deploy.sh

# Step 1: Build
npm run build

# Step 2: SSH into server, clean the directory
ssh cs 'rm -rf ~/www/cpsc383/*'

# Step 3: SCP files to the server
scp -r out/* cs:~/www/cpsc383/

# Step 4: Set permissions for files and directories
ssh cs 'cd ~/www/cpsc383 && find . -type f -exec chmod 644 {} \; && find . -type d -exec chmod 711 {} \;'
