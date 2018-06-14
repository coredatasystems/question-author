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

$statement = $pdo->prepare("INSERT INTO questions(question, correct_answer, incorrect_answers, image, tags)
    VALUES(:question, :correct_answer, :incorrect_answers, :image, :tags)");

$upload_directory = __DIR__ . '/uploads/';
$uploaded_images = [];

for ($i = 0; $i < count($_FILES['images']['tmp_name']); $i++) {
    if ($_FILES['images']['tmp_name'][$i] === '') continue;
    $extension = pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION);
    $upload_filename = uniqid() . '.' . $extension;
    $upload_path = $upload_directory . $upload_filename;
    if (!move_uploaded_file($_FILES['images']['tmp_name'][$i], $upload_path)) {
        die('Could not upload ' . $_FILES['images']['name'][$i]);
    }
    array_push($uploaded_images, $upload_filename);
}

$statement->execute(array(
    "question" => $_POST['question'],
    "correct_answer" => $_POST['correct_answer'],
    "incorrect_answers" => implode(',', $_POST['incorrect_answers']),
    "image" => implode(',', $uploaded_images),
    "tags" => $_POST['tags'],
));

header("Location: /question_author#submitted");
