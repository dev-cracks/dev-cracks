# Script para matar el proceso que está usando el puerto 5173

$port = 5173

Write-Host "Buscando procesos en el puerto $port..." -ForegroundColor Yellow

# Obtener todas las conexiones TCP en el puerto especificado
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($connections) {
    $pids = $connections | Select-Object -Unique -ExpandProperty OwningProcess
    
    foreach ($pid in $pids) {
        if ($pid) {
            Write-Host "`nProceso encontrado: PID $pid" -ForegroundColor Green
            
            # Obtener información del proceso
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Nombre del proceso: $($process.ProcessName)" -ForegroundColor Cyan
                if ($process.Path) {
                    Write-Host "Ruta: $($process.Path)" -ForegroundColor Cyan
                }
            }
            
            # Terminar el proceso
            try {
                Stop-Process -Id $pid -Force
                Write-Host "Proceso $pid terminado exitosamente" -ForegroundColor Green
            }
            catch {
                Write-Host "Error al terminar el proceso $pid : $_" -ForegroundColor Red
            }
        }
    }
}
else {
    Write-Host "No se encontró ningún proceso usando el puerto $port" -ForegroundColor Yellow
    Write-Host "Buscando procesos de Node.js que puedan estar relacionados..." -ForegroundColor Yellow
    
    # Buscar procesos de node que puedan estar relacionados con el proyecto
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -like "*dev-cracks*" -or $_.CommandLine -like "*server.js*" -or $_.CommandLine -like "*vite*"
    }
    
    if ($nodeProcesses) {
        Write-Host "`nSe encontraron procesos de Node.js relacionados:" -ForegroundColor Yellow
        foreach ($proc in $nodeProcesses) {
            Write-Host "  PID: $($proc.Id) - $($proc.ProcessName)" -ForegroundColor Cyan
            try {
                Stop-Process -Id $proc.Id -Force
                Write-Host "  Proceso $($proc.Id) terminado" -ForegroundColor Green
            }
            catch {
                Write-Host "  Error al terminar proceso $($proc.Id): $_" -ForegroundColor Red
            }
        }
    }
    else {
        Write-Host "No se encontraron procesos de Node.js relacionados" -ForegroundColor Yellow
    }
}

