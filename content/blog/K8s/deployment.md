---
title: Kubernetes Application Deployment
version: Part 3
description: "Learn kubernetes application deployment"
---

## Application Deployments

At this point, we know how and why of `Namespaces` now let's do a deep dive on `Deployment` so we can understand much better on how application deployments work.

Before we learn about `deployments`, Let's do a quick comparison between Pods & Deployments. This comparison is critical to understand the working nature of kubernetes.

### What are Pods?

Kubernetes Pods are the smallest fundamental unit of deployment. It's a group of containers that shares the same storage and even the same network resources.

Each kubernetes pods has a unique IP, storage and a configuration that is required for a pod to run. A pod that run more than one container can share resources and information more seamlessly between them. Also, because of the same network, both containers can locate each other at `localhost`.

In case of a static pods, these static pods have no replication and other controllers taking care. If the static pod dies no new pod will get spinned up. However, Deployments are different.

#### Labs on Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

Let's run the nginx pod using the yaml configured above.

```bash
## Set the cluster context
kubectl config use-context docker-desktop
```

```output
Switched to context "docker-desktop".
```

Save the above yaml as `nginx-pod.yaml`

```bash
## Apply the Pod yaml
kubectl apply -f nginx-pod.yaml
```

```output
pod/nginx created
```

Now, that we've our pod created, let's have look at that.

Use the following command to list the pods in default namespace.

```bash
kubectl get pods
```

```output
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          2m19s
```

Bravo! We got out first pod running.

Let's move onto the deployments

### What are Deployments?

A deployment specifies an application lifecycle, the deployment includes the working with controller and changing the deployments current state to a desired state.

The deployments defines the behaviour of Pods and pods assignment to the app. In case the Pods fails, Kubernetes will spinup a new container to achieve the desired state of the deployment.

#### Labs on Deployments

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deploy
  name: nginx-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-deploy
  template:
    metadata:
      labels:
        app: nginx-deploy
    spec:
      containers:
      - image: nginx:latest
        name: nginx
        ports:
        - containerPort: 80
```

Use the above yaml and save it as `nginx-deploy`

Let's apply this onto our cluster.

```bash
kubectl apply -f nginx-deploy.yaml
```

```output
deployment.apps/nginx-deploy created
```

List out the deployments in the default namespace

```bash
kubectl get deploy
```

```output
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy   1/1     1            1           51s
```

So, we've reached at a point where our applications pods are being controller by `Deployments`. What will happen if we delete the pod generate from this deployment?

Let's do that

```bash
## Get the pods

kubectl get pods
```

```output
NAME                            READY   STATUS    RESTARTS   AGE
nginx-deploy-7496796997-nfklp   1/1     Running   0          2m41s
```

```bash
## Let's delete this pod

kubectl delete pod nginx-deploy-7496796997-nfklp
```

```output
pod "nginx-deploy-7496796997-nfklp" deleted
```

We've deleted the pod and guess what? Kubernetes has spinned up a new pod. Let's check the pod again

```bash
kubectl get pods
```

```output
NAME                            READY   STATUS              RESTARTS   AGE
nginx-deploy-7496796997-mkwsh   0/1     ContainerCreating   0          6s
nginx-deploy-7496796997-mkwsh   1/1     Running             0          91s
```

**What if the deployment fails?**

Let's explore some possible phases of pod lifecycle

- Pending - The Pod has been accepted by the Kubernetes cluster, but one or more of the containers has not been set up and made ready to run. This includes time a Pod spends waiting to be scheduled as well as the time spent downloading container images over the network.

- Running - The Pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting.

- Succeeded - All containers in the Pod have terminated in success, and will not be restarted.

- Failed - All containers in the Pod have terminated, and at least one container has terminated in failure. That is, the container either exited with non-zero status or was terminated by the system.

- Unknown - For some reason the state of the Pod could not be obtained. This phase typically occurs due to an error in communicating with the node where the Pod should be running.

Now, Let's go back to out `nginx-deploy.yaml` and make some mistake

```yaml
...
- name: nginx
  image: nginx:alpa
...
```

I've mistakenly specified the wrong image tag. Instead of `nginx:latest`, i specified `nginx:alpa`. What will happen now?


Let's see the status of out deployment

```bash
kubectl get deploy
```

```output
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy   0/1     1            0           33s
```

It looks like our deployment is not ready! Let's dig deeper.

```bash
## List out the pods

kubectl get pods
```

```output
NAME                           READY   STATUS             RESTARTS   AGE
nginx-deploy-cbbdd86d9-z7j9n   0/1     ImagePullBackOff   0          2m6s
```

Ouch! Pod has encountered some error. It state `ImagePullBackOff` What could that mean?

Let's describe the Pod and get some more information regarding this.


```bash
kubectl describe pod nginx-deploy-cbbdd86d9-z7j9n
```

We can see from the Pod events that it had a difficulty while pulling the specified image
```
Failed to pull image "nginx:alpa": rpc error: code = Unknown desc = Error response from daemon: manifest for nginx:alpa not found: manifest unknown: manifest unknown
```

I noticed that, I mistakenly specified incorrect image tag. It should be `alpine` instead of `alpa`. Let's fix this.

Edit the Deployment

```bash
kubectl edit deploy nginx-deploy
```

Change the image tag to `alpine` and save it.


Now, if we see our deployments, we can see that pod is in running status.

```output
NAME                           READY   STATUS    RESTARTS   AGE
nginx-deploy-fc6884c76-nvk8d   1/1     Running   0          58s
```

Now, that we know what pods and deployments are but have were we able to access these applications? How can we access our applications? Here, `Kubernetes Services` comes into the play!

Let's learn kubernetes Services in the next lesson.