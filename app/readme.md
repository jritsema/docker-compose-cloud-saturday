demo
====

A simple demo app with a react.js front-end that talks to a node.js rest api that talks to a mysql database.  Used to demo docker-compose and deploy to various clouds: aws, azure, gcp, etc.

### usage

Use the `docker-compose.yml` file as the app definition to deploy the containerized app to a variety of production cloud environments.

db credentials go in a `.env` file

```
DB_USER=xxxx
DB_PASSWORD=xxxx
```

bare metal
```
$ npm run dev
```

local docker
```
$ docker-compose up -d
```

------

Run on cloud production-grade container orchestrators (2 container instances behind a load balancer).


#### Azure ACS (swarm/1.1.0)

```
$ docker-compose pull
$ docker-compose up -d
$ docker-compose scale web=2
```

#### AWS ECS

using [ecs-cli](https://github.com/aws/amazon-ecs-cli) + [aws](https://aws.amazon.com/cli/)

```
$ ecs-cli compose --project-name cloud-saturday create
$ aws elb create-load-balancer --load-balancer-name cloud-saturday --listeners Protocol="TCP,LoadBalancerPort=80,InstanceProtocol=TCP,InstancePort=80"
$ aws ecs create-service --service-name "ecscompose-service-cloud-saturday" --cluster cloud-saturday --task-definition "ecscompose-cloud-saturday" --load-balancers "loadBalancerName=cloud-saturday,containerName=web,containerPort=80" --desired-count 1 --role my-role
$ ecs-cli compose scale 2
```

#### GCP GKE

using [kompose](https://github.com/kubernetes-incubator/kompose) + [kubectl](https://kubernetes.io/docs/user-guide/kubectl-overview/)

```
$ kompose up
$ kubectl scale --replicas=2 deployment/web
```
