---
title: Kubernetes Fundamentals - Part 1
version: Part 1
description: "Learn kubernetes and manage microservices like a pro"
---

## Introduction to Kubernetes

In this lesson, we'll be going through the concepts and terminologies of kubernetes, but, before that, there are some pre-requisites to kubernetes on how we come to this technology to further optimize our production workloads and save us some lifelines.

Pre-requisite to kubernetes
1. Docker fundamentals
2. Basic working knowledge of containers
3. Ability it work with command line
4. Some working knowledge on Cloud Services (not required but would be beneficial)


### Flashback

Before deep diving into kubernetes, let's take a step back and understand why we need kuberenetes in the first place. 

> Why do you think kubernetes and containers play such an important role in DevOps? Think about it...

Let's go back to Virtual Machines, In VMs, we deploy our application as a monolithic architecture, means, our application is in a single binary file and is deployed onto a Virtual Machine. Let's say the VM size is 2vCPU and 4GB of memory. Your application is running fine without any challenges, but guess what? The application is experiencing traffic more than you anticipated and unfortunately our 2vCPU/4GB VM is unable to handle that much load. 

> What would be the next step? Think and try to answer...

We need to spin up more VMs to handle that much load but spinning up VMs takes time. Let's say, about 5 mins, now, you're experiencing an unexpected downtime which you didn't anticipate for either! This downtime is bad for our application as well as our business. Spinning up new instances of VMs takes time because it's heavy, it's virtualizes hardware and all the other dependencies that your application needs in order to run safe and sound. but, what if we can improve this workflow?

> What could be the possible solution to this?

Containers came into the picture! VMs virualizes hardware and takes time to boot up but on the other hand, containres virtualizes operating system and doesn't need that much time to boot. Docker plays an important role in managing and spinning up the containers. Let's learn more about it.

> Is Docker a container or something else? this is a crucial topic here...

Docker is just a runtime which is being used heavily by developers and architects around the world. It's not a container but rather it's a tool to spin up containers.

```bash
## for help
docker -h
```
```bash
## a command to show all containers in the system
docker ps -a
```
Let's run some containers using docker and expose a nginx server on port 8080

```bash
docker run --name nginx-alpine -p 8080:80 nginx:alpine
```
The above command will spin up a docker container for nginx server and expose it to port `8080` on local machine

- `--name`: Name a docker container 
- `-p`: Port mapping for a container to run `[host-port]:[container-port]`.
- `nginx:alpine`: Name of the Image to run `[Image-name]:[tag]`

Now, we've come to a point where we're able to run our applications in a docker container. Now, let's see, why we want to use kubernetes on the top of it. 

Let's assume we've our application docker container is up and running. Out of sudden, docker container stopped working so, we get into the server and spinned up another container. Container hardly takes 15 seconds to get up and running. 

> So, if a container stopped working? What would be the next step?

Spinning up another instances of container manually. Suppose, we have 100 docker container running in the system. If 10 stopped working, would this be an ideal approach to go and spin up another instance manually one by one? This would be tiring, and a manual overhead. We need to make this automated process. 
Containers are a good way to bundle and run your applications. In a production environment, you need to manage the containers that run the applications and ensure that there is no downtime. For example, if a container goes down, another container needs to start. Wouldn't it be easier if this behavior was handled by a system? This is where kubernetes comes into the picture of orchestrating containers. 

Features of Kubernetes:
1. Automates various manual processes: for instance, Kubernetes will control for you which server will host the container, how it will be launched etc.
2. Interacts with several groups of containers: Kubernetes is able to manage more cluster at the same time
3. Provides additional services: as well as the management of containers, Kubernetes offers security, networking and storage services
4. Self-monitoring: Kubernetes checks constantly the health of nodes and containers
5. Horizontal scaling: Kubernetes allows you scaling resources not only vertically but also horizontally, easily and quickly
6. Storage orchestration: Kubernetes mounts and add storage system of your choice to run apps
7. Automates rollouts and rollbacks: if after a change to your application something goes wrong, Kubernetes will rollback for you
8. Container balancing: Kubernetes always knows where to place containers, by calculating the “best location” for them
9. Run everywhere: Kubernetes is an open source tool and gives you the freedom to take advantage of on-premises, hybrid, or public cloud infrastructure, letting you move workloads to anywhere you want

This is it for this lesson. Let's get into more details on kubernetes in the next lesson.

## Fundamentals of Kubernetes

In this lesson, we're going to cover the core fundamentals of kubernetes and where should we use it and where not to. 

Kubernetes, as we explained in the last post, is a container orchestration tool able to simplify the management of containers and, simultaneously, to make it more efficient. The main aim of Kubernetes, as the other orchestration systems, is to simplify the work of technical teams, by automating many processes of applications and services deployment that before were carried out manually.
Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.

The name Kubernetes originates from Greek, meaning helmsman or pilot. K8s as an abbreviation results from counting the eight letters between the "K" and the "s". Google open-sourced the Kubernetes project in 2014. Kubernetes combines over 15 years of Google's experience running production workloads at scale with best-of-breed ideas and practices from the community.

So, this is container deployment era which states the benefits of containers and how it makes the application management efficiently.
Containers have become popular because they provide extra benefits, such as:

- Agile application creation and deployment: increased ease and efficiency of container image creation compared to VM image use.
- Continuous development, integration, and deployment: provides for reliable and frequent container image build and deployment with quick and efficient rollbacks (due to image immutability).
- Dev and Ops separation of concerns: create application container images at build/release time rather than deployment time, thereby decoupling applications from infrastructure.
- Observability not only surfaces OS-level information and metrics, but also application health and other signals.
- Environmental consistency across development, testing, and production: Runs the same on a laptop as it does in the cloud.
- Cloud and OS distribution portability: Runs on Ubuntu, RHEL, CoreOS, on-premises, on major public clouds, and anywhere else.
- Application-centric management: Raises the level of abstraction from running an OS on virtual hardware to running an application on an OS using logical resources.
- Loosely coupled, distributed, elastic, liberated micro-services: applications are broken into smaller, independent pieces and can be deployed and managed dynamically – not a monolithic stack running on one big single-purpose machine.
- Resource isolation: predictable application performance.
- Resource utilization: high efficiency and density.

### What Kubernetes Provides you with?

- Service discovery and load balancing Kubernetes can expose a container using the DNS name or using their own IP address. If traffic to a container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
- Storage orchestration Kubernetes allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers, and more.
- Automated rollouts and rollbacks You can describe the desired state for your deployed containers using Kubernetes, and it can change the actual state to the desired state at a controlled rate. For example, you can automate Kubernetes to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.
- Automatic bin packing You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. Kubernetes can fit containers onto your nodes to make the best use of your resources.
- Self-healing Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
- Secret and configuration management Kubernetes lets you store and manage sensitive information, such as passwords, OAuth tokens, and SSH keys. You can deploy and update secrets and application configuration without rebuilding your container images, and without exposing secrets in your stack configuration

### What Kubernetes is not

Not all application are desgined for container architecture and some performs better on monolithic architecture then microservices. It's crucial to understand the importance of when not to use kubernetes. Kubernetes provides the building blocks for building developer platforms, but preserves user choice and flexibility where it is important.

What kubernetes is not:

- Does not limit the types of applications supported. Kubernetes aims to support an extremely diverse variety of workloads, including stateless, stateful, and data-processing workloads. If an application can run in a container, it should run great on Kubernetes.
- Does not deploy source code and does not build your application. Continuous Integration, Delivery, and Deployment (CI/CD) workflows are determined by organization cultures and preferences as well as technical requirements.
- Does not provide application-level services, such as middleware (for example, message buses), data-processing frameworks (for example, Spark), databases (for example, MySQL), caches, nor cluster storage systems (for example, Ceph) as built-in services. Such components can run on Kubernetes, and/or can be accessed by applications running on Kubernetes through portable mechanisms, such as the Open Service Broker.
- Does not dictate logging, monitoring, or alerting solutions. It provides some integrations as proof of concept, and mechanisms to collect and export metrics.
- Does not provide nor mandate a configuration language/system (for example, Jsonnet). It provides a declarative API that may be targeted by arbitrary forms of declarative specifications.
- Does not provide nor adopt any comprehensive machine configuration, maintenance, management, or self-healing systems.
- Additionally, Kubernetes is not a mere orchestration system. In fact, it eliminates the need for orchestration. The technical definition of orchestration is execution of a defined workflow: first do A, then B, then C. In contrast, Kubernetes comprises a set of independent, composable control processes that continuously drive the current state towards the provided desired state. It shouldn't matter how you get from A to C. Centralized control is also not required. This results in a system that is easier to use and more powerful, robust, resilient, and extensible

Let do a deeper dive on the operations of kubernetes and take a look at the components of kuberentes which makes it possible driving millions of applications around the world.

## Kubernetes Components

In this lesson, we're going to be discussing about the components which drives the kubernetes orchestration tool. 

Before we go any deeper, let's take a step back and look at the monolith architecture. The monolith applications runs on a Virtual Machines whether it would be on any Cloud Provider such as AWS, Azure, GCP and many more, or, we're running it on an on-prem enviornment. These virtual machines are runs your on the host itself. Kubernetes on the other hand, also uses virtual machines to run applications but in a different way. 

Like we talked about containers how it virtualizes the operating system and can seprate application into a logical units which can be spinned up in seconds and brought back down in an instant. 

Kuberentes also host your applications on Virtual machines to be precise but with the integration of containers things are much easier. Now, applications are deployed as a container workload and be placed onto the *Nodes*. These Nodes are the Virtual Machines what we've just talked about.

A Kubernetes cluster consists of a set of worker machines(VMs), called nodes, that run containerized applications. Every cluster has at least one worker node. These worker nodes host the *pods* that are the components of the application workloads. We've been introduced to a new term *pods*.

**What are Pods in kuberentes ecosystem?**

Pods are the fundamental unit in kuberentes which consists of one or more containers to host your application. Assume, we've created an application and containerized it. Whenever we deploy application onto the kubernetes, the fundamental unit that get's deployed is Pods. 
So, application would be inside of the *Pods* and pods can consists one or more container inside of it. However, it's recommended to run one container per pod.

We'll do hands-on lab on pods in kubernetes in later lessons.

Now, we've been introduced to Pods and Nodes but who's driving all this? Who's giving them instructions on what operations needs to be done? 
That is Master Server or it can be called as *Control Plane* 

>Image here for control and data plane

Control plane consists of multiple kubernetes components. Which are responsible for keeping an application alive. 

Components of Control Plane
1. API Server
2. Scheduler
3. Etcd
4. Controller Manager
5. Kubelet
6. Kube-proxy

The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events

**API Server** - This API server is the master of all. It handles the requests and grants the required permissions to access the application inside the cluster. The Kubernetes API server validates and configures data for the api objects which include pods, services, replicationcontrollers, and others. The API Server services REST operations and provides the frontend to the cluster's shared state through which all other components interact.

**Scheduler** - Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on. Whenever we do a deployment onto the kubernetes, the kube-scheduler watches for the upcoming workloads that needs to assigned onto the Nodes.

**Etcd** - Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data. If your Kubernetes cluster uses etcd as its backing store, make sure you have a back up plan for those data.

**Controller Manager** 
Control Plane component that runs controller processes.

Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process.

Some types of these controllers are:

Node controller: Responsible for noticing and responding when nodes go down.
Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
Endpoints controller: Populates the Endpoints object (that is, joins Services & Pods).
Service Account & Token controllers: Create default accounts and API access tokens for new namespaces.

**Kubelet** 
An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn't manage containers which were not created by Kubernetes.

**Kube-proxy**
kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept.

kube-proxy maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.

kube-proxy uses the operating system packet filtering layer if there is one and it's available. Otherwise, kube-proxy forwards the traffic itself.

Take a pause here, and let's talk a bit more about *kubelet* and *kube-proxy*