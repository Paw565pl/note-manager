#!/bin/sh

docker build -t note-manager-keycloak:latest ./keycloak
docker build -t note-manager-backend:latest ./backend
docker build -t note-manager-frontend:latest ./frontend

kubectl apply -f kubernetes/
