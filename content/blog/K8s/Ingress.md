---
title: Kubernetes Ingress
version: Part 5
description: "In this lesson, we'll cover how ingress plays critical role in exposing the applications to multiple endpoints and how industries continue using it making applications accessible to the internet."
---

## What is Ingress?

Till now, we've learned the deployment and exposed our application to the end-user. So, where does ingress comes in? 

At the moment, we're just sending our traffic to a static endpoint. What if we've multiple?

`Ingress` exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. Traffic routing is controlled by rules defined on the Ingress resource.

Here is a simple example where an Ingress sends all its traffic to one Service:

An Ingress may be configured to give Services externally-reachable URLs, load balance traffic, terminate SSL / TLS and offer name-based virtual hosting. An Ingress controller is responsible for fulfilling the Ingress, usually with a load balancer, though it may also configure your edge router or additional frontends to help handle the traffic.

An Ingress does not expose arbitrary ports or protocols. Exposing services other than HTTP and HTTPS to the internet typically uses a service of type `Service.Type=NodePort` or `Service.Type=LoadBalancer`.

You must have an Ingress controller to satisfy an Ingress. Only creating an Ingress resource has no effect.

We'll be using the NGINX Ingress controller, using the following command to install it for Docker-Desktop. If you're using a Cloud Provider such as AWS, Azure, GCP or any other feel free the explore around.

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
```

```output
namespace/ingress-nginx created
serviceaccount/ingress-nginx created
configmap/ingress-nginx-controller created
clusterrole.rbac.authorization.k8s.io/ingress-nginx created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx created
role.rbac.authorization.k8s.io/ingress-nginx created
rolebinding.rbac.authorization.k8s.io/ingress-nginx created
service/ingress-nginx-controller-admission created
service/ingress-nginx-controller created
deployment.apps/ingress-nginx-controller created
ingressclass.networking.k8s.io/nginx created
validatingwebhookconfiguration.admissionregistration.k8s.io/ingress-nginx-admission created
serviceaccount/ingress-nginx-admission created
clusterrole.rbac.authorization.k8s.io/ingress-nginx-admission created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
role.rbac.authorization.k8s.io/ingress-nginx-admission created
rolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
job.batch/ingress-nginx-admission-create created
job.batch/ingress-nginx-admission-patch created
```

As we can see, that it has deployed the ingress controller in a different namespace `ingress-Nginx. Let's get all the objects that reside in this namespace.

```bash
kubectl get all -n ingress-Nginx
```

```output
NAME                                           READY   STATUS      RESTARTS   AGE
pod/ingress-nginx-admission-create-lgwpf       0/1     Completed   0          99s
pod/ingress-nginx-admission-patch-khww7        0/1     Completed   0          99s
pod/ingress-nginx-controller-fd7bb8d66-2dgs6   1/1     Running     0          99s

NAME                                         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
service/ingress-nginx-controller             LoadBalancer   10.107.102.118   localhost     80:30832/TCP,443:31160/TCP   99s
service/ingress-nginx-controller-admission   ClusterIP      10.101.209.102   <none>        443/TCP                      99s

NAME                                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/ingress-nginx-controller   1/1     1            1           99s

NAME                                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/ingress-nginx-controller-fd7bb8d66   1         1         1       99s

NAME                                       COMPLETIONS   DURATION   AGE
job.batch/ingress-nginx-admission-create   1/1           7s         99s
job.batch/ingress-nginx-admission-patch    1/1           7s         99s
```

So we got a lot of things here! Don't worry we just need to focus on the services for now and see if the deployment is in a healthy state or not. 

The ingress service has been assigned an `EXTERNAL-IP` of Localhost because this is a local cluster.

Copy the value of the EXTERNAL-IP field and visit it in a new web browser tab.

You will see a 404 Not Found page displayed

Note: If you don't see a 404 page, it is likely the Ingress controller is still setting up, wait a minute or two, and then retry.

No Ingress resources have been created in this cluster yet. The Ingress controller responds to all requests that it doesn't have a rule for by sending the request to the default backend. When using the NGINX Ingress controller, this results in the 404 page you see.

Leave this browser tab open, you will use it again later.

> At this point, we've successfully done the deployment of our ingress controller but does it know about the applications residing in the cluster?

No, Ingress doesn't know where your application is and how it's working. We need to let ingress know about the services and the endpoints that it needs to map for an end-user to access the application.

The NGINX Ingress Controller supports other clouds, such as Google Cloud Platform and Microsoft Azure. It also supports deployment onto a bare-metal cluster, in which case it will create a Service resource with a Node Port to receive external traffic.

Let's do some practical, we will create an Ingress resource with rules to route to the applications based on URL path, and you will test how the ingress routing works.


Let's first deploy our application into the cluster.

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-kubernetes-first
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-kubernetes-first
  template:
    metadata:
      labels:
        app: hello-kubernetes-first
    spec:
      containers:
      - name: hello-kubernetes
        image: paulbouwer/hello-kubernetes:1.8
        ports:
        - containerPort: 8080
        env:
        - name: MESSAGE
          value: Hello from the first deployment!
```

```YAML
apiVersion: v1
kind: Service
metadata:
  name: hello-Kubernetes-first
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: hello-kubernetes-first
```

Here, We're using a Demo Image `paulbouwer/hello-kubernetes:1.8` to kick start our Ingress journey.

```bash
kubectl apply -f deployment-one. YAML
```

```bash
kubectl apply -f service-one.YAML
```

Let's do the same for our second application.

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-kubernetes-second
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-kubernetes-second
  template:
    metadata:
      labels:
        app: hello-kubernetes-second
    spec:
      containers:
      - name: hello-kubernetes
        image: paulbouwer/hello-kubernetes:1.8
        ports:
        - containerPort: 8080
        env:
        - name: MESSAGE
          value: Hello from the second deployment!
```

```YAML
apiVersion: v1
kind: Service
metadata:
  name: hello-Kubernetes-second
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: hello-kubernetes-second
```

```bash
kubectl apply -f deployment-two.yaml
```

```bash
kubectl apply -f service-two.yaml
```

Now, it's time to introduce ingress nginx to our applications and learn about routing in Kubernetes. We've already validated our ingress deployment. 

Our current Kubernetes cluster looks like this:

