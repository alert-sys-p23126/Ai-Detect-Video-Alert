## Usage

This section guides you through getting started with the application, setting up your environment, and configuring the necessary services.

### Cloning the Repository

To run the application locally, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

# Managing Application Secrets in Blazor App

## Development Environment

To keep application secrets out of your codebase, use the Secret Manager tool, which interfaces with a secret store that is associated with the project.

# Setting Up Azure AI Multi Services and BlobTrigger Function App

This guide will walk you through the process of obtaining Azure AI Multi Services, retrieving your service key, and setting up an Azure Functions App with Blob Storage and a BlobTrigger.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.com/free).
- Azure CLI or Azure PowerShell module installed. [Install the Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) or [Azure PowerShell](https://docs.microsoft.com/powershell/azure/install-az-ps).

## Step 1: Getting Azure AI Multi Services

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Search for "Cognitive Services" and select **Create** to set up a new service.
3. Fill in the required details like the name, subscription, location, and pricing tier.
4. Review and create the Cognitive Services resource.

## Step 2: Retrieving the Service Key

1. Once the resource is deployed, go to the resource page in the Azure portal.
2. Under the "Resource Management" section, select "Keys and Endpoint".
3. Copy either "Key1" or "Key2" for use in your application.

## Step 3: Creating an Azure Functions App

1. In the Azure portal, select "Create a resource".
2. Search for "Function App" and select **Create**.
3. Provide the necessary details such as app name, runtime stack, region, and plan.
4. Once the configuration is complete, click **Review + create** and then **Create**.

## Step 4: Setting Up Azure Blob Storage

1. In the Azure portal, select "Create a resource".
2. Search for "Storage Account" and select **Create**.
3. Enter the appropriate details like account name, performance, and account kind.
4. Under "Advanced", turn on the "Blob soft delete" option if you want.
5. Review and create the storage account.
6. After creation, go to the storage account resource.
7. Under "Blob service", select "Containers" and create a new container with the desired public access level.

## Step 5: Creating a BlobTrigger Function

1. Go to your Function App created in Step 3.
2. In the Function App's menu, select "Functions" and then **Add**.
3. Choose the "BlobTrigger" template.
4. Set the "Path" to the name of the container you created followed by the pattern to monitor (e.g., `mycontainer/{name}`).
5. Set the "Connection" to the connection string of the storage account created in Step 4.

## Step 6: Setting the `AiServiceKey`

1. In your Function App, go to "Configuration" under "Settings".
2. Click on **New application setting**.
3. Enter `AiServiceKey` as the name and paste the key you copied from Step 2 in the value field.
4. Click "OK" and then "Save" to store the application setting.

### Using Secret Manager with the dotnet CLI

The Secret Manager tool uses the `dotnet user-secrets` command to manage secrets. Here's how to use it:

# Configuring Application Secrets
Configure your local environment with the necessary secrets from Azure services using the Secret Manager tool:

Initialize the Secret Manager for your project if you haven't already:

```bash
dotnet user-secrets init
```
## Set the AI service key and endpoint as user secrets:

```bash
dotnet user-secrets set "AiService:Key" "your-ai-service-key"
dotnet user-secrets set "AiService:Endpoint" "your-ai-service-endpoint"
```

## Set the Azure Blob Storage connection string:

```bash
dotnet user-secrets set "ConnectionStrings:AzureBlobStorage" "your-blob-storage-connection-string"
```
Replace your-ai-service-key, your-ai-service-endpoint, and your-blob-storage-connection-string with the actual values obtained from your Azure resources.

## Running the Application
After setting up the secrets, you can run the application using the .NET CLI:

```bash
dotnet run
```

This will start the application on a local development server, and you'll be able to access it through your web browser.


## Additional Notes

- Always secure your keys and do not expose them in your code or check them into source control.
- Monitor your Azure services for usage and costs to avoid unexpected charges.

With these steps, you should have a fully functional Azure Function App with a BlobTrigger that utilizes Azure AI Multi Services.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.