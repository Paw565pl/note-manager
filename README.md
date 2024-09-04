# Note manager

This is a note manager web app built with Next.js and FastAPI. It uses Keycloak for authentication and PostgreSQL for the database. It also has Prometheus configured along with Grafana for monitoring. It was created entirely for educational purposes. I wanted to elevate my skills in OpenID Connect / OAuth2 authentication and authorization and Kubernetes deployments.

### How to run it locally?

Start with **cloning the repository**.

You can use either docker compose or kubernetes to run the application. Remember to uncomment the appropriate lines in `env.production` inside the frontend directory.

##### docker compose

```sh
docker compose -f docker-compose.prod.yml up --build
```

##### kubernetes

```sh
sh run-cluster.sh
```

That's all! Now simply hit [http://localhost:3000/](http://localhost:3000/) and explore. API is documented at this URL [http://localhost:8000/docs](http://localhost:8000/docs). Monitoring dashboard is available here [http://localhost:4000/dashboards](http://localhost:4000/dashboards).

There are two built-in user accounts for testing purposes:

```
username / password - role
test / test - regular user
admin / admin - admin user
```

Remember to never expose real secrets in repositories. I have included env files here only as examples.
