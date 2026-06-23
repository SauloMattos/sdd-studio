param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $MessageParts
)

$ErrorActionPreference = "Stop"

function Write-FriendlyError {
  param([Parameter(Mandatory = $true)][string] $Message)

  [Console]::Error.WriteLine($Message)
}

function Invoke-GitChecked {
  param([Parameter(Mandatory = $true)][string[]] $Arguments)

  & git @Arguments

  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
}

$message = ($MessageParts -join " ").Trim()

if ([string]::IsNullOrWhiteSpace($message)) {
  Write-FriendlyError "Erro: informe uma mensagem de commit."
  Write-FriendlyError 'Uso: npm run ship -- "sua mensagem de commit"'
  exit 1
}

& git rev-parse --is-inside-work-tree *> $null

if ($LASTEXITCODE -ne 0) {
  Write-FriendlyError "Erro: este comando precisa ser executado dentro de um repositorio Git."
  exit 1
}

$status = & git status --porcelain

if ($LASTEXITCODE -ne 0) {
  Write-FriendlyError "Erro: nao foi possivel verificar o status do Git."
  exit $LASTEXITCODE
}

if ([string]::IsNullOrWhiteSpace(($status -join "`n"))) {
  Write-Host "Nenhuma alteracao para commitar. Nada foi enviado."
  exit 0
}

Write-Host "Alteracoes encontradas:"
$status | ForEach-Object { Write-Host "  $_" }

Write-Host "Executando git add ."
Invoke-GitChecked -Arguments @("add", ".")

& git diff --cached --quiet
$diffExitCode = $LASTEXITCODE

if ($diffExitCode -eq 0) {
  Write-Host "Nenhuma alteracao staged para commitar apos git add ."
  exit 0
}

if ($diffExitCode -ne 1) {
  Write-FriendlyError "Erro: nao foi possivel verificar as alteracoes staged."
  exit $diffExitCode
}

Write-Host "Criando commit..."
Invoke-GitChecked -Arguments @("commit", "-m", $message)

Write-Host "Enviando para o remoto..."
Invoke-GitChecked -Arguments @("push")

Write-Host "Ship concluido com sucesso."
