---
title: Building VMs using Vagrant
version: Part 1
description: "Learn to manage VMs using Vagrant"
---

## Vagrant

Vagrant is an open-source software product that is used to manage any development environment. Using Vagrant, you can install any virtual OS using the CLI (Command Line Interface), run it, do some work, and shut it down.
Vagrant works with any virtualization engine, such as VirtualBox, VMware, libvirt (Linux) etc.

You need to have one of these virtualization engines for Vagrant to run a virtual OS.

## Why use Vagrant?
Vagrant uses a clean and easy method to define and run different environment setups. There’s a large community that is pushing their ready-to-go images onto Vagrant Cloud.

Vagrant can also be used to test provisioning scripts before pushing them to production. Applications and other related tests are also being done using Vagrant.

There are a variety of cases in which using Vagrant will be the optimal choice over using any other plain virtual engines, such as VirtualBox, VMware, etc. Let’s look at some scenarios in which Vagrant is the optimal choice for the given task.

Let’s say you’re working on an application that you want to ensure is working well and has no more debugging left to do. You wouldn’t want to go through the painstaking process of making a Virtual Machine in one of the virtualization engines, such as VMware or VirtualBox, setting up the GUI, and configuring the necessary files. Vagrant becomes a savior in this scenario. With just a few lines of terminal commands, you’ll be up and running the virtual OS using Vagrant, allowing you to decrease the downtime and increase your workflow efficiency. In addition, you can export the Vagrant file into another system, and it’ll work exactly the same, preventing the library and dependency conflicts.

There are many preconfigured boxes available on the Vagrant website, which means that there’s no need to provision anything; everything is preconfigured, and you’ll be up and running the virtual OS in no time.

You can also create multiple machines within a single Vagrantfile to check how your application works across different environments.

Head over to the Vagrant website for a chance to familiarize yourself with Vagrant.

## Building first VM using Vagrant

Let’s have a look at the image below to understand how Vagrant lets you create and run VMs within a couple of minutes.

1. Vagrant pulls an image from the Vagrant Cloud. For example: ubuntu, centos, alpine, etc.

2. Vagrant creates a Vagrantfile from an image and stores it in the local system. The Vagrantfile consists of the configuration of the VM, which is then used to boot up the VM.

3. The user then runs the Vagrant VM with the help of the vagrant up command


## Run your virtual machine

| From this point onwards, we will be looking into Ubuntu-based commands only.

Open up your terminal and create your very first Vagrant VM.

1. Create a Working Directory.
```bash
mkdir vagrant
```

2. Move into the Directory
```bash
cd vagrant
```

3. Now, initialize your Vagrant box.
```bash
vagrant init ubuntu/xenial64
```

```output
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
```

4. Spin up your VM
```bash
vagrant up
```

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
```bash
vagrant ssh
```

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

If you’re following along in the local environment, that’s great!

Give it a go!

> So far, we've just spun up our Vagrant VM. Now, let’s get our hands dirty with Vagrantfile.

## `Vagrantfile`

`Vagrantfile` is a configuration file that Vagrant creates during the `vagrant init <box name>` process. This file consists of the configuration for your `VM`. This configuration file is defined completely in the Ruby language. Don’t worry if you don’t know the Ruby language, as it is quite easy to use.  When we run the `vagrant up` command, Vagrant locates this config file in the current directory and loads the guest machine using the configuration defined in the file.

We can do a lot more than run a default configured VM. Let’s look at some of our options.


### Customizing `Vagrantfile`

Now, let's spin up our Vagrant VM again, but this time, with a new image and in minimal mode.

When we first built our VM, we ran the command: `vagrant init ubuntu/xenial64`. By running this command, we successfully generated our `Vagrantfile`. But, in that config file, there are a lot of comments, and it’s quite long, isn’t it?  Just forget about those long comments for now! We'll build something cleaner. 

You remember boxes, right? We'll add a box first, and, then we'll do `init` in `--minimal` mode.

### Adding a box

Make sure you’re in the Vagrant directory that we created earlier. Then, run the command below.
```
$ vagrant box add centos/7
```
This time, we're running a centos image - A Redhat Distro.

**Run Cleaner Mode**

Run the following command to initialize the `Vagrantfile` in minimal mode. 
```
$ vagrant init --minimal
```

Now, if you open up your `Vagrantfile`, it'll look something like this.
```
Vagrant.configure("2") do |config|
  config.vm.box = "base"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```
Note, the `config.vm.box` is set to  `"base"`, i.e., we’re working with a `“base”` box.
We need to change this. Let's add the box that we've created in the previous step.

```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```

Now this config file tells us that it is running the Vagrant configuration version, `configure("2")`, and the box or image we're using is `config.vm.box = "centos/7"`.

### Providers
Let's learn about the code that I've added below.
```
config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
```

Vagrant needs providers to run their VMs. In our case, we’re using `VirtualBox`, so we have to define our provider configuration using the `config.vm.provider` method. Without this block of code, Vagrant won’t be able to boot up our Virtual Machine.

Explore more about providers here: [Providers](https://www.vagrantup.com/docs/providers/).

The information discussed so far is sufficient enough for you to tell what’s really going on in the config file.

### Updating `Vagrantfile`
To update the `Vagrantfile`, just replace `base` with the box name from the previous step.

```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
end
```
Now, let’s declare a `hostname` for our Virtual Machine.

A `hostname` is a unique name for a computer or network node in a network. Hostnames are specific names, or character strings, that refer to a host and make it usable for the network and users.

```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```

Now, let’s learn about networking.

## Networking

### Private IP addresses

Some IP addresses are set aside so that they can’t be used in the public space/Internet.

These IP addresses are for internal private use only and are not routable on the public internet.

The public and private IP addresses lie in specific ranges, and we can use these ranges to identify whether a given IP is private or public.
| From    |  To  |
| --- | --- |
|10.0.0.0 | 10.255.255.255 |
|    172.16.0.0 |  172.31.255.255   |
|  192.168.0.0   |   192.168.255.255  |

Any IP address residing between these ranges are private addresses.

### Public IP addresses

This course does not require a deep understanding of public IP addresses. We will only look into classful addressing of public IPs to better understand them.

In classful addressing, different ranges of IP addresses are assigned specific classes, as shown in the table below. Each class of IP addresses serves a specific function.

| Class | From | To |
| --- | --- | --- |
| A | 0.0.0.0 | 127.255.255.255 |
| B | 128.0.0.0 | 191.255.255.255 |
| C | 192.0.0.0 | 223.255.255.255 |
| D | 224.0.0.0 | 239.255.255.255 |
| E | 240.0.0.0 | 255.255.255.255 |

Classes **A, B, and C** are publicly available IP addresses on the internet. These classes contain **unicast addresses**. In the case of unicast addresses, only one single device on the internet is trying to connect to another single device.
Whereas, Class **D** consists of **multicast** addresses, which means one device can connect to multiple devices. These are used in enterprises for meetings, etc. These addresses are not available on the public internet.

Lastly, **Class E** IP addresses are reserved for future or experimental purposes only.


Now, let’s get back to our `Vagrantfile` and implement some network-based settings.

## Configure network settings

The `Vagrantfile` generated in the last lesson is shown below.

Open up your `Vagrantfile`.
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```
### Assign a private IP
Let's try to assign a private IP address to our Virtual Machine.
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.network "private_network", ip: "192.168.10.1"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```
Remember the private IP ranges discussed above. The IP address assigned in the `Vagrantfile` above lies in one of those ranges.


### Assign a public IP
Now, let’s try to assign a public IP address to our Virtual Machine using the `Vagrantfile`.
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.network "public_network"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```
This is a simple example of how we can assign a public network so that our Vagrant VM can be accessed by anyone.

We need to update the `config.vm.network` field as shown below.
```
config.vm.network "public_network"
```
This config will load the public IP address via DHCP.

Now, you can access your VM and check your assigned IP address using the following command: 
```
vagrant ssh
```

## Provisioning

Let's first understand what provisioning means and why we need it in the first place.

### What is provisioning?
Provisioning is the process of setting up an IT infrastructure. It can also refer to the steps required to manage access to data and resources and make them available to users and systems. 

Provisioning is not the same thing as configuration, but they are both steps in the deployment process. Once something has been provisioned, the next step is configuration. 

The term "provisioning" means to make resources available before booting up the VM. There are many terms associated with provisioning, such as server provisioning, network provisioning, user provisioning, service provisioning, etc.

Let's do some provisioning.

We'll add a piece of code to our Vagrantfile. We'll be feeding a series of commands to a variable and, then, passing the variable to a method, called `config.vm.provision`. It's simple; let's do this.

First, create a variable with `$variableName` as shown below.
```
$httpd
```
Second, feed a series of commands to this variable as shown below.
```
$httpd = <<SCRIPT
yum install httpd
systemctl start httpd
systemctl enable httpd
SCRIPT
```
Finally, put this block of code before your Virtual Machine config in a Vagrantfile.

It'll look something like this:
```
$httpd = <<SCRIPT
yum install httpd
systemctl start httpd
systemctl enable httpd
SCRIPT
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.network "public_network"
  config.vm.synced_folder ".", "/home/vagrant/stuff"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```

Now, we just have to use the `provision` method to let Vagrant know that we are provisioning.

Add the following line to your `Vagrantfile`.
```
config.vm.provision "shell", inline: $httpd
```

Finally, your `Vagrantfile` will look something like this.
```
$httpd = <<SCRIPT
yum install httpd
systemctl start httpd
systemctl enable httpd
SCRIPT
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.network "public_network"
  config.vm.synced_folder ".", "/home/vagrant/stuff"
  config.vm.provision "shell", inline: $httpd
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```

Something to note here: if your Vagrant VM is already up, the provisioning won’t happen. You will have to force provision next time you spin up your VM using the `--provision` flag. Moreover, we can also use the command, `vagrant provision <vm-name>`.

In the example above, we've used the `inline` script, which is defined within the Vagrantfile. We can also use an external script by replacing `inline` with `path`, and, instead of passing the variable, we can pass the path to that script.

The following example will clarify this.
```
config.vm.provision "shell", path: "script.sh"
```
We can also pass the URL to the external script as shown below.
```
config.vm.provision "shell", path: "https://example.com/script.sh"
```

That's it. You can run your Vagrant VM however you want. Whether you want to provision or not, that's totally up to you. 


## Folder sync
You can also share files between guest OS and host OS. We can do this with the help of the `synced_folders` method.

Let's see this method in action.
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "server.example.com"
  config.vm.network "public_network"
  config.vm.synced_folder ".", "/home/vagrant/stuff"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
end
```

In the `Vagrantfile` above, we’ve added a new piece of code.
```
config.vm.synced_folder ".", "/home/vagrant/stuff"
```

The first parameter, `"."`, specifies the path on the host machine, while the second parameter, `"/home/vagrant/stuff"`, specifies the path within your Vagrant VM.

This line of code will pick all of the files or folders that are present in the current directory, `"."`,  of the host OS and share all the content within the `/home/vagrant/stuff` directory of the guest OS. If the folder `stuff` doesn’t exist on the guest machine, it will create one.

Simple, isn't it? Let's move forward with multi-machine VMs.

## What are multi-machine VMs and why do we need them?

Vagrant is able to define and control multiple guest machines per Vagrantfile. This is known as a `"multi-machine"` environment.

These machines are generally able to work together or are somehow associated with each other. Here are some use cases describing what people are using multi-machine environments for today:

1. Accurately modeling a multi-server production topology, such as separating a web and database server.
2. Modeling a distributed system and how they interact with each other.
3. Testing an interface, such as an API, to a service component.
4. Disaster-case testing: machines dying, network partitions, slow networks, inconsistent world views, etc.

We can also use multi-machine VMs to play around with Ansible. 

In this chapter, we'll be looking at how you can build and run multi-machine Vagrant VMs. 

## Build a multi-machine Vagrant VM.

Let's start off with just one machine Vagrantfile.
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
end
```

We can use the `config.vm.define` method in the `Vagrantfile` to create multi-machine VMs.
```
config.vm.define "node1" do |node1|
```
Here, `node1` is the name of the VM, however, the name can be anything.

Let's provide a box, or an image, to our VM `node1` using the `vm.box` file. Moreover, let’s assign it a hostname using the `node1.vm.hostname` file.
```
config.vm.define "node1" do |node1|
    node1.vm.box = "ubuntu/trusty64"
    node1.vm.hostname = "webserver"
  end
```
Similarly, we can add a second VM, `node2`, in our `Vagrantfile` as shown below.
```
config.vm.define "node2" do |node2|
    node2.vm.box = "centos/7"
    node2.vm.hostname = "database"
  end
```
Then, put it all together.
```
Vagrant.configure("2") do |config|
  
  config.vm.define "node1" do |node1|
    node1.vm.box = "ubuntu/trusty64"
    node1.vm.hostname = "webserver"
  end

  config.vm.define "node2" do |node2|
    node2.vm.box = "centos/7"
    node2.vm.hostname = "database"
  end
end
```

Now, when starting up with `vagrant up`, both 2 machines will get started. Now, do the `vagrant status` to check the status of your machines.

You can `ssh` into an individual machine by specifying its `hostname`.
```
vagrant ssh webserver
```

You can also specify your primary machine, in case you haven’t already, by adding `primary: true` in the Vagrantfile as shown below.
```
Vagrant.configure("2") do |config|
  
  config.vm.define "node1", primary: true do |node1|
    node1.vm.box = "ubuntu/trusty64"
    node1.vm.hostname = "webserver"
  end
 
  config.vm.define "node2" do |node2|
    node2.vm.box = "centos/7"
    node2.vm.hostname = "database"
  end
end
```

We’ve added `primary: true` against the node1 VM. Now, if the VM hostname is not specified during `vagrant ssh <vm-name>`, you’ll get logged into node1 by default.

### Conclusion
Congratulations on completing this course. The next step would be to learn some automation tools, like Ansible or chef, and use that technology with Vagrant. All of this will prepare you for your journey towards DevOps. 