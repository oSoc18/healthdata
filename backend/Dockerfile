FROM python:3

WORKDIR /usr/src/app
ENV PYTHONUNBUFFERED 1
COPY . .
RUN pip install -r requirements.txt
CMD "/usr/src/app/startup.sh"