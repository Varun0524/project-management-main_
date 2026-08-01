Project Management & Workflow System

A multi-tenant project management web application with a Node.js/Express backend, PostgreSQL database, and asynchronous background job processing.
Live Demo: https://project-management-three-eta.vercel.app/

Features
Projects & Tasks — create projects, add tasks, assign members, and track status through the workflow
Multi-tenant architecture — data is isolated per organization/workspace using relational modeling in PostgreSQL
REST APIs — clean, resource-based endpoints for projects, tasks, users, and workspaces
Background jobs — repetitive and long-running tasks (notifications, scheduled updates) run asynchronously via Inngest, keeping API responses fast
Validation & error handling — request validation and consistent error responses across all endpoints

Tech Stack
Layer	              Technology
Backend	            Node.js, Express
Database	          PostgreSQL
ORM	                Prisma
Background jobs	    Inngest
Deployment	        Vercel

What I Learned
Designing relational data models for multi-tenant applications with Prisma and PostgreSQL
Building and validating REST APIs following the full software development life cycle
Offloading repetitive work to asynchronous background jobs to improve performance
Testing, debugging, and resolving defects before release
