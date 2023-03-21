---
title: Terraform - Get Started
version: Part 1
description: "In this lesson, we'll be learning about the what is Terraform and IaC"
---

Terraform is an open-source tool that allows you to define and manage your infrastructure as code (IaC). In this blog post, we will explore what IaC is, why it is beneficial, and how Terraform works.

## What is Infrastructure as Code?

Infrastructure as code (IaC) is a practice of managing infrastructure with configuration files rather than through a graphical user interface (GUI). IaC enables you to build, change, and maintain your infrastructure in a consistent, repeatable, and scalable way.

Some of the advantages of IaC are:

- **Speed**: You can provision and update your infrastructure faster and more efficiently with code than with manual actions.
- **Quality**: You can reduce human errors and ensure compliance with best practices by using code that can be tested, reviewed, and versioned.
- **Collaboration**: You can share and reuse your code with other developers and teams, and integrate it with other tools and workflows.
- **Portability**: You can use the same code to deploy your infrastructure across different environments and cloud platforms.

## What is Terraform?

Terraform is one of the most popular IaC tools developed by HashiCorp. It lets you define resources and infrastructure in human-readable, declarative configuration files. Terraform then translates your configuration into API calls to create or modify your infrastructure on various cloud platforms.

Some of the features of Terraform are:

- **Cloud-Agnostic**: Terraform supports over 1,000 providers that allow you to manage resources on AWS, Azure, GCP, Kubernetes, GitHub, DataDog, and many more. You can also write your own providers if needed.
- **Declarative Language**: Terraform uses a configuration language called HCL (HashiCorp Configuration Language) that describes the desired state of your infrastructure. You don't need to specify how to achieve that state; Terraform will figure out the steps for you.
- **State Management**: Terraform keeps track of your current infrastructure state in a file called state file. This file helps Terraform compare your configuration with reality and determine what changes need to be made.
- **Modularity**: Terraform allows you to organize your configuration into reusable units called modules. Modules can encapsulate common patterns or best practices for deploying certain types of resources or services.
- **Lifecycle Management**: Terraform provides a consistent workflow for creating, updating, or destroying your infrastructure. You can use commands like init, validate, plan, apply, and destroy to perform these actions safely and efficiently.

## How to Use Terraform?

To use Terraform for managing your infrastructure as code (IaC), you need to follow these steps:

1. Scope: Identify the infrastructure components that you want to manage with Terraform. For example: compute instances,
   networks,
   load balancers,
   databases,
   etc.
2. Author: Write the configuration files for each component using HCL syntax. For example: `resource "aws_instance" "web" { ... }`
3. Initialize: Run `terraform init` command in your working directory to install the plugins (providers) that Terraform needs
   to interact with
   the APIs of your cloud platform(s).
4. Plan: Run `terraform plan` command to preview what changes Terraform will make based on your configuration files. This
   command will also
   check for any syntax errors or conflicts in your configuration.
5. Apply: Run `terraform apply` command to execute the changes proposed by the plan command. This command will create,
   modify,
   or delete
   the resources according to your configuration files.
6. Destroy: Run `terraform destroy` command when you no longer need some or all of your resources managed by
   Terraform.This command will remove
   them from your cloud platform(s).

You can also use other commands like validate (to check if your configuration is valid), fmt (to format your configuration files), or output (to display values from outputs defined in modules).

## Conclusion

Terraform is a powerful tool that enables you to manage your infrastructure as code (IaC). It offers many benefits such as speed,
quality,
collaboration,
and portability over manual management of infrastructure.