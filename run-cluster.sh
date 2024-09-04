#!/bin/sh

docker build -t note-manager-keycloak:latest ./keycloak
docker build -t note-manager-prometheus:latest ./prometheus
docker build -t note-manager-grafana:latest ./grafana
docker build -t note-manager-backend:latest ./backend
docker build -t note-manager-frontend:latest -f ./frontend/Dockerfile.prod ./frontend

kubectl apply -f kubernetes/
