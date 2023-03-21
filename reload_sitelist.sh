#!/bin/bash

cd /home/ubuntu/Site_Status/projects.42seoul.link
systemctl daemon-reload
sudo systemctl stop sitestatus
sudo systemctl start sitestatus
sudo systemctl status sitestatus