#!/bin/bash
cd /home/kavia/workspace/code-generation/techwriter-hub-73859/devlog_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

