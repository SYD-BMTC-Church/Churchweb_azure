# Azure App Service Deployment Script
param(
    [Parameter(Mandatory=$true)]
    [string]$AppName,
    
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroup,
    
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [string]$ZipFile = "deployment.zip"
)

Write-Host "Deploying $ZipFile to Azure App Service: $AppName"

# Check if zip file exists
if (-not (Test-Path $ZipFile)) {
    Write-Error "Deployment file $ZipFile not found!"
    exit 1
}

Write-Host "Please provide your Azure credentials when prompted..."

# Login to Azure (this will open browser)
az login

# Set subscription
az account set --subscription $SubscriptionId

# Deploy the zip file
Write-Host "Deploying to App Service..."
az webapp deployment source config-zip --resource-group $ResourceGroup --name $AppName --src $ZipFile

Write-Host "Deployment completed!"
Write-Host "Your app should be available at: https://$AppName.azurewebsites.net"