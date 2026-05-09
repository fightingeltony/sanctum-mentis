$root = Split-Path $PSScriptRoot -Parent
$port = 3000
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "Serving $root on http://localhost:$port"
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $res.KeepAlive = $false
    $path = $req.Url.LocalPath -replace "/", "\"
    if ($path -eq "\") { $path = "\prototype\index.html" }
    $file = Join-Path $root $path.TrimStart("\")
    if (Test-Path $file -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($file)
        $mime = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".js"   { "application/javascript" }
            ".json" { "application/json" }
            ".css"  { "text/css" }
            default { "application/octet-stream" }
        }
        $res.ContentType = $mime
        $res.SendChunked = $true
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
        $res.ContentLength64 = 0
    }
    $res.OutputStream.Flush()
    $res.OutputStream.Close()
    $res.Close()
}
