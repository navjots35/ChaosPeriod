---
title: Getting Started with Vagrant.
version: Part 1
description: "Learn vagrant from scratch with all the in's and out's"
---

Learning docker the right way could be much more fun and exciting. Docker is a runtime which allows engineers to abstract a layer of your application and packege it into a *container* to ship.

We'll learn each and every bit of it along the way.
[Docker](https://imgs.search.brave.com/KLQtBHcge3DM6nyOJ_fYUhEC1GVMsNxdIbsKsVpmFcs/rs:fit:1200:992:1/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/bWF4LzI0ODAvMSo5/aEd2WUU1amVnSG0x/cl85N2dILWpRLnBu/Zw).



Now, select the provider, which, in our case, is VirtualBox. After selecting the provider you'll notice that all boxes compatible with VirtualBox are listed below.
You can choose any box you want; however, in this lesson, we'll be choosing 
`ubuntu/xenial64`.

## Run your virtual machine
>From this point onwards, we will be looking into Ubuntu-based commands only. 

Open up your terminal and create your very first Vagrant VM.

1. Create a Working Directory.
```
$ mkdir vagrant
```


2. Move into the Directory.
```
$ cd vagrant
```
3. Now, initialize your Vagrant box.
```
$ vagrant init ubuntu/xenial64
```
`Output`
```output
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
```
4. Spin up your VM
```
$ vagrant up
```
`Output`
```output
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'ubuntu/xenial64' could not be found. Attempting to find and install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'ubuntu/xenial64'
    default: URL: https://vagrantcloud.com/ubuntu/xenial64
==> default: Adding box 'ubuntu/xenial64' (v20200822.0.0) for provider: virtualbox
    default: Downloading: https://vagrantcloud.com/ubuntu/boxes/xenial64/versions/20200822.0.0/providers/virtualbox.box
    default: Download redirected to host: cloud-images.ubuntu.com
``` 

5. Do the SSH
```
$ vagrant ssh
```
`Output`
```output
Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.4.0-187-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


0 packages can be updated.
0 updates are security updates.

New release '18.04.5 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


vagrant@ubuntu-xenial:~$ 

``` 

If you're following along in the local environment, that's great!


Give it a go!
