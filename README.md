# healthdata project
This repository holds the code for the healthdata project, aka homo belgicus. It consists of two directories, one holding the frontend code and one holding the backend code.

## running the project
This project uses [docker](https://docs.docker.com/install/) and  [docker-compose](https://docs.docker.com/compose/install/).

```
docker-compose up -d
drc exec api python manage.py migrate # only when you need to run migrations (make sure the db is up)
```

Go to : http://localhost:8000/importHospitals to import the hospitals.csv files

To access the api : http://localhost:8000/api/hospitals

The backend should be available on http://localhost:8000 and the frontend should be available on http://localhost:9000
