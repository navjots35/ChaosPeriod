---
title: Kubernetes Fundamentals - Part 2
version: Part 2
description: "Learn kubernetes namespaces isolation and how it works."
---

## Namespace Isolation

Let's continue with namespaces in kubernetes. 
`Namespaces` in kubernetes is used to organize applications into multiple sub clusters backed by same physical cluster. This technique helps in organizing things between multiple teams and projects and multiple enviornments. 

Kubernetes comes with 3 namespaces out-of-the-box:
1. default - As its name implies, this is the namespace that is referenced by default for every Kubernetes command, and where every Kubernetes resource is located by default. Until new namespaces are created, the entire cluster resides in ‘default’.
2. kube-system: Used for Kubernetes components and should be avoided.
3. kube-public: Used for public resources. Not recommended for use by users.

**Advantages of having a namespace**
There are many use cases for Kubernetes namespaces, including:

- Allowing teams or projects to exist in their own virtual clusters without fear of impacting each other’s work. 
- Enhancing role-based access controls (RBAC) by limiting users and processes to certain namespaces. 
- Enabling the dividing of a cluster’s resources between multiple teams and users via resource quotas.
- Providing an easy method of separating development, testing, and deployment of containerized applications enabling the entire lifecycle to take place on the same cluster.

**When should one use multiple Kubernetes namespaces?**
Small teams or smaller organizations may be perfectly content using the default namespace. This is particularly relevant if there is no need to isolate developers or users from each other. However, there are many useful benefits to having multiple namespaces, including:


- Isolation. Large or growing teams can use namespaces to isolate their projects and microservices from each other. Teams can re-use the same resource names in different workspaces without a problem. Also, taking an action on items in one workspace never affects other workspaces.
- Organization. Organizations that use a single cluster for development, testing, and production can use namespaces to sandbox dev and test environments. This ensures production code is not affected by changes that developers or testers make in their own namespaces throughout the application lifecycle. 
- Permissions. Namespaces enable the use of Kubernetes RBAC, so teams can define roles that group lists of permissions or abilities under a single name. This can ensure that only authorized users have access to resources in a given namespace. 
- Resource Control. Policy-driven resource limits can be set on namespaces by defining resource quotas for CPU or memory utilization. This can ensure that every project or namespace has the resources it needs to run, and that no one namespace is hogging all available resources.
- Performance. Using namespaces can help improve performance of a given cluster. If a cluster is separated into multiple namespaces for different projects, the Kubernetes API will have fewer items to search when performing operations. This can reduce latency and speed overall application performance for each application running on the cluster.


> Wait! if we've our applications into multiple namespaces, how would they communicate?

Even though, we've our applications spread across multiple namespaces, but they can easily communicate with each other. Kubernetes DNS Service can easily locate any service by using it's name following the below notation to call services.

```bash
<service_name>.<namespace>.svc.cluster.local
```
I know it's a lot to digest at this point in time but don't worry we'll go through each and every step to get you covered. First of all, we'd be needing a kubernetes cluster to interact with and a client to connect to it. Let's install those steps first and explore a bit more.

1. Minikube or Docker Desktop(for cluster provisioning on local system), keep in mind Docker Desktop only works for Windows and MacOS, if you're using Linux Distros then we'll need to install Minikube to provision the Cluster.

2. Install Kubectl to interact with Kubernetes Cluster using the following methods,
- For Windows: 
    ```bash
    choco install kubernetes-cli
    ```
- For Linux: while there are multiple options to install kubectl, I prefer to use this way.
    ```bash
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    ```
    confirm the version of client
    ```bash
    kubectl version --client
    ```
- For MacOS: 
    ```bash
    brew install kubernetes-cli
    kubectl version --client
    ```
### Explore Kubernetes

Let's first explore kubernetes and then go ahead with namespace introduction on the enviornment.

```bash
kubectl cluster-info
```
The above command will output the information regarding the kubernetes cluster that is currently being utilized.

**Kubectl** uses a syntax which is easier to understand and work with. Use the following syntax for kubernetes to run a kubectl command. 
```c
kubectl [command] [TYPE] [NAME] [flags]
```
where *command*, *TYPE*, *NAME*, and *flags* are:

1. command: Specifies the operation that you want to perform on one or more resources, for example create, get, describe, delete.
2. TYPE: Specifies the resource type. Resource types are case-insensitive and you can specify the singular, plural, or abbreviated forms. For example, the following commands produce the same output:
```bash
kubectl get pod pod1
kubectl get pods pod1
kubectl get po pod1
```

Now, there are some resource type that gets used on a day to day basis, you can refer to the table below:

You can also perform the following command to get the list of resources
```bash
kubectl api-resources
```

As, you have saw that we can use abbreviated forms to list the resources. Here's a question:

> What is the abbreviated form of Namespace?

We can use just `ns` to list the namespaces in the cluster.
```bash
kubectl get ns
```
```c
NAME              STATUS   AGE
default           Active   50d
kube-node-lease   Active   50d
kube-public       Active   50d
kube-system       Active   50d
```

We've the following namespaces in the cluster. Now, this might vary if you're using Minikube. Let's understand what each namespace is for and how we can create multiple namespace to organize and work efficiently with kubernetes.

Kubernetes starts with four initial namespaces:

`default` - The default namespace for objects with no other namespace

`kube-system` - The namespace for objects created by the Kubernetes system. This namespace contains all the kubernetes components that are needed for scheduling, communication and much more.

`kube-public` - This namespace is created automatically and is readable by all users (including those not authenticated). This namespace is mostly reserved for cluster usage, in case that some resources should be visible and readable publicly throughout the whole cluster. The public aspect of this namespace is only a convention, not a requirement.

`kube-node-lease` - This namespace for the lease objects associated with each node which improves the performance of the node heartbeats as the cluster scales.

> Can you delete the `kube-system` namespace and still work with kubernetes?

No, `kube-system` namespace contains all the important components of kubernetes that helps it to run properly. 

Let's create namespace using 2 ways.
- Imperative 
When using imperative commands, a user operates directly on live objects in a cluster. The user provides operations to the kubectl command as arguments or flags.

This is the recommended way to get started or to run a one-off task in a cluster. Because this technique operates directly on live objects, it provides no history of previous configurations.

Let's create a namespaces using imperative way
```bash
kubectl get ns <namespace_name>
```
```bash
kubectl get ns dev
```

- Declerative 
When using declarative object configuration, a user operates on object configuration files stored locally, however the user does not define the operations to be taken on the files. Create, update, and delete operations are automatically detected per-object by kubectl. This enables working on directories, where different operations might be needed for different objects.

Let's create a namespace using declerative way
```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: dev
  labels:
    name: dev
```
```bash
kubectl apply -f dev.yaml
```

Now, there are lot of things which are unknown at this moment. We'll cover all those things in-between to make it understand better the hard way.
