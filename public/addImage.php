<?php

class SQLiteConnection {
    /**
     * PDO instance
     * @var type
     */
    private $pdo;

    /**
     * return in instance of the PDO object that connects to the SQLite database
     * @return \PDO
     */
    public function connect() {
        if ($this->pdo == null) {
            $this->pdo = new \PDO("sqlite:" . 'sqlite.db');
        }
        return $this->pdo;
    }
}

$pdo = (new SQLiteConnection())->connect();
if ($pdo == null)
    echo 'Whoops, could not connect to the SQLite database!';

$statement = $pdo->prepare("SELECT image FROM questions WHERE id = :id");
$statement->execute(['id' => $_POST['question_id']]);

$result = $statement->fetch();

$uploaded_images = $result['image'] ? explode(',', $result['image']) : [];

$upload_directory = __DIR__ . '/uploads/';

$extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
$upload_filename = uniqid() . '.' . $extension;
$upload_path = $upload_directory . $upload_filename;

if (!move_uploaded_file($_FILES['image']['tmp_name'], $upload_path)) {
    die('Could not upload ' . $_FILES['image']['name']);
}

$uploaded_images[] = $upload_filename;

$statement = $pdo->prepare("UPDATE questions SET image = :image WHERE id = :id");

$statement->execute(array(
    "id" => $_POST['question_id'],
    "image" => implode(',', $uploaded_images),
));

header("Location: /question_author#submitted");