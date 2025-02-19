

---

# Rainbow Colors App

This is a simple Node.js application that displays the colors of the rainbow and dynamically changes the background color of the webpage based on an environment variable. The app is containerized using Docker and can be deployed on Kubernetes using `kubectl`.

---

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Running with Docker](#running-with-docker)
4. [Deploying on Kubernetes](#deploying-on-kubernetes)
5. [How It Works](#how-it-works)
6. [License](#license)

---

## Features
- Displays the colors of the rainbow.
- Dynamically changes the background color of the webpage based on an environment variable.
- Containerized using Docker for easy deployment.
- Deployed on Kubernetes using `kubectl` with a **NodePort** service and **ConfigMap** for environment variables.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- A Kubernetes cluster (e.g., Minikube, GKE, EKS, AKS)

---

## Running with Docker

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/rainbow-app.git](https://github.com/CHAFAH/rainbow-app.git)
cd rainbow-app
```

### 2. Build the Docker Image
```bash
docker build -t rainbow-app .
```

### 3. Run the Docker Container
To run the container with a specific background color (e.g., `red`):
```bash
docker run -e COLOR=red -p 3000:3000 rainbow-app
```

To run the container with a different color (e.g., `blue`):
```bash
docker run -e COLOR=blue -p 3000:3000 rainbow-app
```

### 4. Access the Application
Open your browser and go to:
```
http://localhost:3000
```

---

## Deploying on Kubernetes

### 1. Create a ConfigMap for the `COLOR` Environment Variable
Create a file named `rainbow-configmap.yaml` with the following content:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: rainbow-config
data:
  COLOR: "blue"  # Set the background color here
```

### 2. Create a Kubernetes Deployment
Create a file named `rainbow-deployment.yaml` with the following content:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rainbow-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rainbow-app
  template:
    metadata:
      labels:
        app: rainbow-app
    spec:
      containers:
      - name: rainbow-app
        image: rainbow-app
        ports:
        - containerPort: 3000
        env:
        - name: COLOR
          valueFrom:
            configMapKeyRef:
              name: rainbow-config
              key: COLOR
```

### 3. Create a NodePort Service
Create a file named `rainbow-service.yaml` with the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: rainbow-service
spec:
  selector:
    app: rainbow-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: NodePort
```

### 4. Deploy to Kubernetes
Apply the ConfigMap, Deployment, and Service to your Kubernetes cluster:
```bash
kubectl apply -f rainbow-configmap.yaml
kubectl apply -f rainbow-deployment.yaml
kubectl apply -f rainbow-service.yaml
```

### 5. Access the Application
To access the application, first get the NodePort assigned to the service:
```bash
kubectl get svc rainbow-service
```

The output will look something like this:
```
NAME              TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
rainbow-service   NodePort   10.96.123.45    <none>        80:30007/TCP   10s
```

- If you're using **Minikube**, run the following command to get the application URL:
  ```bash
  minikube service rainbow-service --url
  ```

- If you're using a **cloud provider**, access the application using:
  ```
  http://<Node-IP>:<NodePort>
  ```
  Replace `<Node-IP>` with the IP of one of your Kubernetes nodes and `<NodePort>` with the port number from the `kubectl get svc` output (e.g., `30007`).

---

## How It Works

### 1. **Docker**
- The application is containerized using Docker.
- The `Dockerfile` defines the environment and dependencies required to run the app.
- The `COLOR` environment variable is passed to the container to dynamically set the background color of the webpage.

### 2. **Kubernetes**
- The `COLOR` environment variable is managed using a **ConfigMap**.
- The application is deployed as a Kubernetes Deployment with 3 replicas for scalability.
- A **NodePort** service exposes the application to the outside world.

### 3. **Application Logic**
- The Node.js app uses Express to serve a webpage.
- The background color of the webpage is dynamically set based on the `COLOR` environment variable.
- If no color is specified, the default color is `white`.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

---

Enjoy the colors of the rainbow! 🌈

---
