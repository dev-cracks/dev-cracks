Add-Type -AssemblyName System.Net.HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:80/')
$listener.Start()
Write-Host 'Servidor HTTP iniciado en puerto 80'
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $path = $request.Url.LocalPath
        if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
        $filePath = Join-Path 'C:/app/wwwroot' $path.TrimStart('/').Replace('/', '\')
        if (-not (Test-Path $filePath)) { $filePath = 'C:/app/wwwroot/index.html' }
        if (Test-Path $filePath) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                '.html' { $response.ContentType = 'text/html; charset=utf-8' }
                '.js' { $response.ContentType = 'application/javascript' }
                '.css' { $response.ContentType = 'text/css' }
                '.json' { $response.ContentType = 'application/json' }
                '.jpg' { $response.ContentType = 'image/jpeg' }
                '.png' { $response.ContentType = 'image/png' }
                '.svg' { $response.ContentType = 'image/svg+xml' }
                default { $response.ContentType = 'application/octet-stream' }
            }
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        Write-Host "Error: $_"
        if ($response) { $response.Close() }
    }
}

