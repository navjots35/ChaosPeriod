---
title: Kubernetes Services 
version: Part 4
description: "In this lesson, we'll learn how to expose services and why labels are important in kubernetes for application to communicate."
---

## Using services to expose your application.

We've understood how the application deployment lifecycle happens in kubernetes. Given, we had done the deployment of our application so far but how are we gonna access it? What are `kubernetes services`? How it works? Let's learn all that in this lesson!

**Objectives**
- Learn about a Service in Kubernetes
- Understand how labels and `LabelSelector` objects relate to a Service
- Expose an application outside a Kubernetes cluster using a Service

Kubernetes Pods are mortal. Pods in fact have a lifecycle. When a worker node dies, the Pods running on the Node are also lost. A ReplicaSet might then dynamically drive the cluster back to desired state via creation of new Pods to keep your application running. As another example, consider an image-processing backend with 3 replicas. Those replicas are exchangeable; the front-end system should not care about backend replicas or even if a Pod is lost and recreated. That said, each Pod in a Kubernetes cluster has a unique IP address, even Pods on the same Node, so there needs to be a way of automatically reconciling changes among Pods so that your applications continue to function.

A `Service` in Kubernetes is an abstraction which defines a logical set of Pods and a policy by which to access them. Services enable a loose coupling between dependent Pods. A Service is defined using YAML (preferred) or JSON, like all Kubernetes objects. The set of Pods targeted by a Service is usually determined by a `LabelSelector`.

Although each Pod has a unique IP address, those IPs are not exposed outside the cluster without a Service. Services allow your applications to receive traffic. Services can be exposed in different ways by specifying a type in the ServiceSpec:

- `ClusterIP (default)` - Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.
- `NodePort` - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using <NodeIP>:<NodePort>. Superset of ClusterIP.
- `LoadBalancer` - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.
### Services and Labels

A Service routes traffic across a set of Pods. Services are the abstraction that allow pods to die and replicate in Kubernetes without impacting your application. Discovery and routing among dependent Pods (such as the frontend and backend components in an application) is handled by Kubernetes Services.

Services match a set of Pods using labels and selectors, a grouping primitive that allows logical operation on objects in Kubernetes.

Let's get our nginx deployment from previous lesson and expose it using a Service.

Firstly, We need to look at the deploymeny yaml file.

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

The deployment does have labels associated with it under `metadata`, `app: nginx-deploy`. The labels are crucial for a service to identtify which deployment needs to use which service and how it's gonna be exposed.

We can now create a service and using the labels we'll let the service know where to send the traffic.


```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  selector:
    app: nginx-deploy
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

Save the above file as `nginx-svc.yaml`

We can apply this onto our cluster

```bash
kubectl apply -f nginx-svc.yaml
```

```output
service/nginx-svc created
```

List the services

```bash
kubectl get svc
```

```output
NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   89d
service/nginx-svc    ClusterIP   10.101.109.45   <none>        80/TCP    10s
```

We can see our service has started and also we've correctly defined the labels selector for our nginx deployment but how can we confirm or validate that our service is correctly configured?

Let's start by describing the service. Here, as well we follow the same syntax.

```bash
kubectl describe svc nginx-svc
```

```output
Name:              nginx-svc
Namespace:         default
Labels:            <none>
Annotations:       <none>
Selector:          app=nginx-deploy
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                10.101.109.45
IPs:               10.101.109.45
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         10.1.1.12:80
Session Affinity:  None
Events:            <none>
```

We can see that it's a type `ClusterIP`, The important parameter that we need is `Endpoints`

```bash
Endpoints:         10.1.1.12:80
```

What is this IP Address? This is not the service IP address? So, where it's getting this IP? To drill down further, let list our pods.


```bash
kubectl get pods
```

```output
NAME                           READY   STATUS    RESTARTS   AGE
nginx-deploy-fc6884c76-nvk8d   1/1     Running   0          43m
```

There must be an IP assigned to the Pod, right? How can we see it? Let's do a wide output by passing `-o` followed by `wide`

```bash
kubectl get pods -o wide
```

```output
NAME                           READY   STATUS    RESTARTS   AGE   IP          NODE             NOMINATED NODE   READINESS GATES
nginx-deploy-fc6884c76-nvk8d   1/1     Running   0          38m   10.1.1.12   docker-desktop   <none>           <none>
```

That's better! We can see that Pod's IP is the endpoint at our exposed service. Which means that any traffic that hits the service will be sent to the endpoints, which in turn is Pod's IP where our application is hosted.

### NodePort Service

Now, Let's have a look at other service type `NodePort`

NodePort - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using <NodeIP>:<NodePort>. Superset of ClusterIP.

Let's edit our `nginx-svc` to change the type from `ClusterIP` to `NodePort`


```bash
kubectl edit svc nginx-svc
```

Change the type to `NodePort` and list the services.

```bash
NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        89d
service/nginx-svc    NodePort    10.101.109.45   <none>        80:32282/TCP   12m
```

We can see the change getting reflected and also have a look at the Ports. It's mapping the `80` port to a port `32282` which is at the node where the pod is placed at the moment.

### LoadBalancer Service

We use LoadBalancer service type when we want our application to be exposed to the internet. Let's expose our nginx pod as `LoadBalancer` and access it through the browser.

Edit the service `nginx-svc`

```bash
kubectl edit svc nginx-svc
```

Change the service type to `LoadBalancer` and list the services

```bash
kubectl get svc
```

```output
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP        89d
nginx-svc    LoadBalancer   10.101.109.45   localhost     80:32282/TCP   22m
```

Now the service has been assigned an External-IP, In our case, since, we're using docker-desktop which is a local cluster, it's assigned to a `localhost` at Port `80`

If we do a curl to localhost, we can see nginx welcome page.

```output
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h2>Welcome to nginx!</h2>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html> 
```

This was a fun lesson, we've learned about services and specially how `labels` are crucial in connecting the service to a Pod and how applications can be exposed using the different services types.
