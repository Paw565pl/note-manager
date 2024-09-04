FROM grafana/grafana:11.2.0

ENV GF_AUTH_DISABLE_LOGIN_FORM "true"
ENV GF_AUTH_ANONYMOUS_ENABLED "true"
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"

COPY datasources.yml /etc/grafana/provisioning/datasources
COPY dashboards.yml /etc/grafana/provisioning/dashboards
COPY fastapi_dashboard.json /var/lib/grafana/dashboards/
