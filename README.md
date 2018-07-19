# healthdata project
This repository holds the code for the healthdata project, aka homo belgicus. It consists of two directories, one holding the frontend code and one holding the backend code.

## running the project
This project uses [docker](https://docs.docker.com/install/) and  [docker-compose](https://docs.docker.com/compose/install/).

```
docker-compose up -d
docker-compose exec api python manage.py migrate # only when you need to run migrations (make sure the db is up)

#import data using bonobo
docker-compose exec api python manage.py historicaldata
docker-compose exec api python manage.py importDetailedHospitals
```

To access the api : http://localhost:8000/api/hospitals

#### To run the frontend locally with hot reloading:

Requires Node version >= 8.0.0

`yarn` or `npm install`  
`yarn start` or `npm start`

Requires a `.env` file in the frontend folder to run.  
If using the standard docker configuration and port, the env file should look like:
```
REACT_APP_API_URL=http://localhost:8000/api
```

The backend should be available on http://localhost:8000 and the frontend should be available on http://localhost:9000
