<?php
declare(strict_types=1);

// Optional: set a shared secret token (leave empty to disable auth).
$expectedToken = '';

$maxFiles = 10;
$maxImageSize = 5 * 1024 * 1024;
$maxDocSize = 10 * 1024 * 1024;
$allowedImageTypes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
$allowedDocTypes = [
    'application/pdf' => 'pdf',
    'application/msword' => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'application/vnd.ms-excel' => 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$incomingToken = '';
if (isset($_SERVER['HTTP_X_UPLOAD_TOKEN'])) {
    $incomingToken = trim((string)$_SERVER['HTTP_X_UPLOAD_TOKEN']);
}
if ($incomingToken === '' && isset($_POST['token'])) {
    $incomingToken = trim((string)$_POST['token']);
}

if ($expectedToken !== '' && $incomingToken !== $expectedToken) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Invalid token.']);
    exit;
}

if (!isset($_FILES['images'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'No files uploaded.']);
    exit;
}

$folder = 'news';
if (isset($_POST['folder'])) {
    $folder = trim((string)$_POST['folder']);
}

$targets = [
    'news' => [
        'dir' => __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'news',
        'public' => 'news',
        'types' => $allowedImageTypes,
        'maxSize' => $maxImageSize,
    ],
    'products/images' => [
        'dir' => __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'products' . DIRECTORY_SEPARATOR . 'images',
        'public' => 'products/images',
        'types' => $allowedImageTypes,
        'maxSize' => $maxImageSize,
    ],
    'products/docs' => [
        'dir' => __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'products' . DIRECTORY_SEPARATOR . 'docs',
        'public' => 'products/docs',
        'types' => $allowedDocTypes,
        'maxSize' => $maxDocSize,
    ],
];

if (!isset($targets[$folder])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Invalid upload folder.']);
    exit;
}

$target = $targets[$folder];
$uploadDir = $target['dir'];
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$files = $_FILES['images'];
$names = $files['name'];
$isMulti = is_array($names);
$fileCount = $isMulti ? count($names) : 1;
$limit = min($fileCount, $maxFiles);
$urls = [];
$finfo = finfo_open(FILEINFO_MIME_TYPE);

for ($i = 0; $i < $limit; $i++) {
    $error = $isMulti ? $files['error'][$i] : $files['error'];
    if ($error === UPLOAD_ERR_NO_FILE) {
        continue;
    }
    if ($error !== UPLOAD_ERR_OK) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Upload error.']);
        exit;
    }

    $tmpName = $isMulti ? $files['tmp_name'][$i] : $files['tmp_name'];
    $size = $isMulti ? (int)$files['size'][$i] : (int)$files['size'];

    if ($size <= 0) {
        continue;
    }
    if ($size > $target['maxSize']) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'File exceeds size limit.']);
        exit;
    }

    $mime = finfo_file($finfo, $tmpName);
    if (!isset($target['types'][$mime])) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Invalid file type.']);
        exit;
    }

    try {
        $filename = bin2hex(random_bytes(16)) . '.' . $target['types'][$mime];
    } catch (Exception $exception) {
        $filename = uniqid('file_', true) . '.' . $target['types'][$mime];
    }

    $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $filename;
    if (!move_uploaded_file($tmpName, $targetPath)) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Failed to save file.']);
        exit;
    }

    $scheme = 'http';
    if (
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
        (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    ) {
        $scheme = 'https';
    }

    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $urls[] = $scheme . '://' . $host . '/uploads/' . $target['public'] . '/' . $filename;
}

finfo_close($finfo);

if (!$urls) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'No valid files uploaded.']);
    exit;
}

header('Content-Type: application/json');
echo json_encode(['urls' => $urls]);
