---
title: Kubernetes - Volume and Data
version: Part 4
description: "In this lesson, we'll be learning about the configuration and settings in Kubernetes."
---

## Using Volumes and Data with containerized applications

In this lesson, we'll go over some basics of data and volumes on how a containerized application can refer the configuraiton values and sensitive information into the application and how volumes work in Kubernetes.

Now, there are 2 things that we need to distinguish
1. Configuration Values
2. Sensitive Information

The `Configuration Values` can be anything, a variable that is being referenced into the code and gets changed every now and then. In this scenario, we can use `configmaps`.

- ConfigMaps - ConfigMaps are Kubernetes objects that allow you to separate configuration data/files from image content to keep containerized applications portable. ConfigMaps bind configuration files, command-line arguments, surroundings variables, port numbers, and alternative configuration artifacts to your Pods containers and system parts at run-time. ConfigMaps are helpful for storing and sharing non-sensitive, unencrypted configuration data. Like Secrets, you’ll be able to produce config maps from files and with YAML declaration. we are able to use config maps by relating its name and as a volume.

On the other hand, `Secrets` are used to store sensitive information

- Secrets - Use secrets to provide sensitive information to your apps or jobs. Secrets are defined in key-value pairs and the data that is stored in secrets is encoded. Both `ConfigMaps` and `Secrets` store data as a key-value pair. The major difference is Secrets stores data in **base64 format** meanwhile ConfigMaps stores data in **plain text**.

### Create ConfigMap

We can create `configmaps` using various options. Let's run the following command and check the possibilities

```bash
kubectl create configmap -h
```

```output
...
Examples:
  # Create a new configmap named my-config based on folder bar
  kubectl create configmap my-config --from-file=path/to/bar

  # Create a new configmap named my-config with specified keys instead of file basenames on disk
  kubectl create configmap my-config --from-file=key1=/path/to/bar/file1.txt --from-file=key2=/path/to/bar/file2.txt

  # Create a new configmap named my-config with key1=config1 and key2=config2
  kubectl create configmap my-config --from-literal=key1=config1 --from-literal=key2=config2

  # Create a new configmap named my-config from the key=value pairs in the file
  kubectl create configmap my-config --from-file=path/to/bar

  # Create a new configmap named my-config from an env file
  kubectl create configmap my-config --from-env-file=path/to/bar.env

Options:
      --allow-missing-template-keys=true: If true, ignore any errors in templates when a field or map key is missing in
the template. Only applies to golang and JSON path output formats.
...
```

There's more to this output, let's have a look at the examples. We can create a `configmap` or `cm` bypassing a set of key and value pairs but we can decide how to pass it. Now, this depends on the type of application and its use case. We can use `folders`, or from a `file`, can also create a `configmap` using `literals`.

Let's create a configmap

```bash
kubectl create configmap `name` `data`
```
`name` - Name of your configmap object.
`data` - the configuration data for the ConfigMap, which can be one of the following: 
a path to a directory containing one or more configuration files indicated using the `--from-file` flag.
key-value pairs, each specified using `--from-literal` flags.

It's time to create a configmap and use it in a pod.

```bash
kubectl create cm demo --from-literal=name=educative
```
```output
configmap/demo created
```

### Configure a Pod to use configmap

We now have the configmap created but how to use it with our application? 

We can configure a configmap to use with our application by refrencing it or mounting it as a volume.

I have got a Pod YAML configured. Let's go over it once

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: demo
  name: demo
spec:
  containers:
  - image: busybox
    name: demo
    command: ["/bin/sh", "-c", "env"]
    env:
        - name: HELLO
          valueFrom:
            configMapKeyRef:
              name: demo
              key: name
  restartPolicy: Never
```

In the above Pod YAML, we're referencing a `value` for `HELLO` using a configmap. 

```yaml
...
    env:
        - name: HELLO
          valueFrom:
            configMapKeyRef:
              name: demo
              key: name
...
```

for `HELLO`, we have a configmap named `demo` with a key `name` inside the configmap as data.

Let's deploy this pod and see the result.

```bash
kubectl apply -f pod.yaml
```
```output
pod/demo created
```

Now, let's check the logs if pod is using the configmap or not.

```bash
kubectl logs demo
```
```output
...
HELLO=educative
HOSTNAME=demo
...
```

We've validated that pod is using utilizing the configmap and that value `educative` that we've passed to the key `name` in the configmap `demo` can be seen here.


### Configmap as a Volume

Configmap can be referenced using 2 different ways. We've seen the first. Now, let's mount the configmap using a Volume.

Let's create a configmap first

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm-vol
  namespace: default
data:
  one: value-1
  two: value-2
```

```bash
kubectl apply -f cm-vol.yaml
```

Let's use the same pod yaml file with some little tweaks.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cm-vol-pod
spec:
  containers:
  - image: busybox
    name: demo
    command: ["/bin/sh", "-c", "ls /home/config"]
    volumeMounts:
    - name: cm-vol
      mountPath: /home/config
  volumes:
    - name: cm-vol
      configMap:
        name: cm-vol
```

```bash
kubectl apply -f cm-vol-pod.yaml
```

Now, let's check the logs and see if the values are present there or not.

```bash
kubectl logs cm-vol-pod
```
```output
one
two
```

### Using Secrets as a Volume

Now that we've learned how utilizing configmaps can make the configurations dynamic and easy to modify with the code changes. We'll now learn how to use the secrets to use and protect sensitive information such as usernames and passwords and much more.

The secrets are also being referenced in a similar fashion like how we just worked with configmaps. There's just one difference, while the configmaps take plain text values. Secrets, on the other hand, needs `base64` encoded values.

Let's encode some values first before creating a secret. We have username `admin` and password `passcode`. 

```bash
echo -n "admin" | base64
```
```output
YWRtaW4=
```

```bash
echo -n "passcode" | base64
```
```output
cGFzc2NvZGU=
```

Now, create a secret

```yaml
apiVersion: v1
kind: Secret
metadata: 
  name: demo
data:
  username: YWRtaW4=
  password: cGFzc2NvZGU=
```

```bash
kubectl create -f demo.yaml
```

We have a pod where we can reference the secret we just created.


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-vol-pod
spec:
  containers:
  - image: nginx
    name: demo
    volumeMounts:
    - name: secret-vol
      mountPath: /etc/vol-secret
  volumes:
    - name: secret-vol
      secret:
        secretName: demo
```

```bash
kubectl create -f pod.yaml
```

Let's check the status of the pod.

```bash
kubectl get pods
```
```output
NAME                       READY   STATUS             RESTARTS   AGE
secret-vol-pod             1/1     Running            0          73s
```

It's time to validate the secret in the pod. Do ssh in the pod.

```bash
kubectl exec secret-vol-pod -it -- /bin/bash
root@secret-vol-pod:/#
```
Now, we're inside the pod. We have the `mountPath` right! Let's navigate to that path.

```bash
root@secret-vol-pod:/# cd /etc/vol-secret
```
```bash
root@secret-vol-pod:/etc/vol-secret# ls
password username
```

We've validated that our secrets are perfectly mounted into the pod at the specified `mountPath`. 

### Using Secrets as Key Referenced

Let's use the secrets while referring to them. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-pod
spec:
  containers:
  - name: secret-pod
    image: busybox
    command: ["env"]
    env:
    - name: ADMIN_USER
      valueFrom:
        secretKeyRef:
          name: admin
          key: admin-user
    - name: DEV_USER
      valueFrom:
        secretKeyRef:
          name: dev
          key: dev-user
```

WAIT! where are our secrets? We haven't created these secrets yet. So, let's create these secrets `imperatively`.

```bash
kubectl create secret generic admin --from-literal=admin-user=admin
```
```output
secret/admin created
```
```bash
kubectl create secret generic dev --from-literal=dev-user=dev
```
```output
secret/dev created
```

Now, we're good to go! Let's deploy our Pod.

```bash
kubectl create -f secret-pod.yaml
```

Now, as usual, we can check the logs of the pod

```bash
kubectl logs secret-pod
```

```output
...
ADMIN_USER=admin
DEV_USER=dev
...
```

