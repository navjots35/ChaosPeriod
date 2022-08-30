---
title: Docker - Part 1
version: Part 1
description: "Learn docker from scratch with all the in's and out's"
---

Learning docker the right way could be much more fun and exciting. Docker is a runtime which allows engineers to abstract a layer of your application and packege it into a *container* to ship.

## What is Docker?

Long Story short, Docker is a container runtime and not the **container** itself. It's a software tool that is used widely to build, package and ship containerized applications.

let's try building an application or maybe spinning up a Nginx Server using docker. We'll learn more about the architecture along the way.

Now, docker allows us to utilize the CLI utility to build and package our applications within a container and push them. So, push those containerized applications? but Where? These packaged containerized applications are known as ***Docker Images***. Once, we've the docker image ready, we push it to a centralized repository. Coming to the repositories, these can be either public or private. In most cases, it'd be [Docker Hub](https://hub.docker.com/).

Let's try to install docker on our local system first.
- Windows & Mac & Linux Systems - Go ahead and install the [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Docker Desktop is available for all the operating systems. I'll be doing this on Ubuntu and I prefer installing docker using convinience script. 

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
After this, we can check the status of the docker process if it's running. Simply, run the following command

```bash
systemctl status docker
```
you'll see the following out saying the process is active.

```output
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2022-07-10 20:42:38 UTC; 5min ago
     Docs: https://docs.docker.com
 Main PID: 2906 (dockerd)
    Tasks: 10
   CGroup: /system.slice/docker.service
           └─2906 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Jul 10 20:42:37 ubuntu1804.localdomain dockerd[2906]: time="2022-07-10T20:42:37.401269714Z" level=info msg="ClientConn switching balancer to \"pick_first\"" module=grpc
Jul 10 20:42:37 ubuntu1804.localdomain dockerd[2906]: time="2022-07-10T20:42:37.555121801Z" level=warning msg="Your kernel does not support swap memory limit"
Jul 10 20:42:37 ubuntu1804.localdomain dockerd[2906]: time="2022-07-10T20:42:37.555209533Z" level=warning msg="Your kernel does not support CPU realtime scheduler"
Jul 10 20:42:37 ubuntu1804.localdomain dockerd[2906]: time="2022-07-10T20:42:37.555749781Z" level=info msg="Loading containers: start."
...
```

## Create your first container

Let's first run hello world using docker and try implementing some command lines to work around with Docker.

```bash
docker run hello-world
```

This is the most basic fundamental command everyone tries out when working with docker for the first time. You'd get output something similar to what's shown below:
```output
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:7d246653d0511db2a6b2e0436cfd0e52ac8c066000264b3ce63331ac66dca625
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Now, we know how to run a container let's do some deep dive and fast forward things!

## What is a Dockerfile

Dockerfile is a set of instructions on how to build a specific image. Now, this custom image building process is beneficial in many ways, for example, we've our custom set of variations to the image specific to the application that needs to be build. This Dockerfile image building process is crucial for that. Once, we've the image with us, we can use it again and again without rebuilding it. 

These custom images are then pushed to a docker registry either private or public.

### Building a Dockerfile

1. Let's create a directory for building the image.
```bash
mkdir ~/docker-image
```

2. Changing into the directory
```bash
cd ~/docker-image
```

3. Let's get into the editor and start building an image
```bash
nano Dockerfile
```

4. Let's build a simple ubuntu image with custom utilities.
```Dockerfile
FROM ubuntu:latest

RUN apt-get update -y && apt-get upgrade -y && apt-get install tree
```

5. Save the file and build the docker image.
```bash
docker build -t ubuntu:custom .
```

Now, we've built an image let's learn what we've done throughout the process.

We can see the `Dockerfile` is named using a followed convention with a capital `D`

```Dockerfile
FROM ubuntu:latest

RUN apt-get update -y && apt-get upgrade -y && apt-get install tree
```
The keywords such as `FROM`, `RUN` are specific to Dockerfile while building an image. These keywords needs to be understood before constructing a Dockerfile. There are many keywords that can be used while building the `Dockerfile` depends on the use-case from application to application.

- `FROM` - Defines the base image to use for the build process.
- `RUN` - The command triggers while we build the image, used in the image building process.
- `CMD` - The command triggers when launching the created docker image.
- `ENTRYPOINT` - Sets a default application to be used everytime a docker image is started.
- `ENV` - Sets the Environment Variable
- `LABEL` - adds labels to docker image, author specific.
- `USER` - sets the UID or a default username to start the container.
- `EXPOSE` - This is used to expose the default port on the container for traffic between container and the internet.

These are some keywords that are used but not limited to.
 
After saving the dockerfile, we need to build the file so that an image is created. To build an image, docker `build` command is used followed by the <image_name> : <tag> and location of the `Dockerfile`, in our case it's in the current directory so it's `.`