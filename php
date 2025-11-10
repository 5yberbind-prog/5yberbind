<?php
// download.php?file=teenpatti.apk
$allowed = ['teenpatti.apk']; // सुरक्षा: सिर्फ allowed files
$file = isset($_GET['file']) ? basename($_GET['file']) : '';
if (!in_array($file, $allowed)) {
    header("HTTP/1.1 404 Not Found");
    echo "File not found.";
    exit;
}

$path = __DIR__ . '/files/' . $file;
if (!file_exists($path)) {
    header("HTTP/1.1 404 Not Found");
    echo "File not found.";
    exit;
}

// (Optional) Click counter
$counterFile = __DIR__ . '/counters/' . $file . '.count';
$count = 0;
if (file_exists($counterFile)) {
    $count = (int)file_get_contents($counterFile);
}
file_put_contents($counterFile, $count + 1);

// Force download headers
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="'.basename($path).'"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($path));
readfile($path);
exit;
?>
