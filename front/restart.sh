#!/bin/bash

cd /home/ubuntu/Site_Status/projects.42seoul.link/front
npm run build
pm2 restart next-app
