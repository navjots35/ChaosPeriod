---
title: Learn Docker the Hard Way.
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