compose file basics
====================

### imperative vs declarative 

#### imperative (with `docker`)

```bash
$ docker run -it --rm -p 80:3000 -e "PORT=3000" -e "DATABASE=foo" -e "TIMEOUT=60" --name web jritsema/web-app:1.0.0
$ docker run -it --rm -p 81:4000 -e "PORT=4000" -e "QUEUE=bar" -e "TIMEOUT=60" --name worker jritsema/worker-app:1.0.0
```

#### declarative (with `docker-compose`)

docker-compose.yml

```yaml
version: '2'
services:
  web:
    image: jritsema/web-app:1.0.0
    ports:
      - "80:3000"
    environment:
      PORT: 3000
      DATABASE: foo
      TIMEOUT: 60    
  worker:
    image: jritsema/worker-app:1.0.0
    ports:
      - "81:4000"
    environment:
      PORT: 4000
      QUEUE: bar
      TIMEOUT: 60    
```

```bash
$ docker-compose up
```


### services example

```yaml
version: '2'
services:
  service1:
    image: ubuntu:14.04
    command: sleep 3600
  service2:
    image: ubuntu:14.04
    command: sleep 3600
```

### volumes example

```yaml
version: '2'

services:

  service1:
    image: ubuntu:14.04
    command: sleep 3600
    volumes:
      - ./data:/data

  service2:
    image: ubuntu:14.04
    command: sleep 3600
    volumes:
      - ./data:/data

volumes:
  data:
    driver: local
```

### networks example

```yaml
version: '2'

services:

  service1:
    image: ubuntu:14.04
    command: sleep 3600
    networks:
      - default
      - network1

  service2:
    image: ubuntu:14.04
    command: sleep 3600
    networks:
      - default

  service3:
    image: ubuntu:14.04
    command: sleep 3600
    networks:
      - network1       

networks:
  network1:
    driver: bridge
```


### environment variables


#### environment section

```yaml
environment:
  FOO: 1
  BAR: 1
```

OR

```yaml
environment:
  - FOO=1
  - BAR=1  
```

#### shell variable substitution

```yaml
web:
  image: "webapp:${TAG}"
```

#### shell passthrough

```yaml
web:
  environment:
    - FOO
```

#### env-file

```yaml
web:
  env_file:
    - secrets.env
```

#### .env file substitution

```
$ cat .env
TAG=v1.5
```

```yaml
version: '2.0'
services:
  web:
    image: "webapp:${TAG}"
```

NOTE: `shell values override values in .env files`

#### set on container

```bash
$ docker-compose run -e DEBUG=1 web python console.py
```
