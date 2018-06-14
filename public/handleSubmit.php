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

$statement = $pdo->prepare("INSERT INTO questions(question, correct_answer, incorrect_answers, tags)
    VALUES(:question, :correct_answer, :incorrect_answers, :tags)");

$upload_directory = __DIR__ . '/uploads';

for ($i = 0; $i < count($_FILES['file']['tmp_name']); $i++) {
    $uploaded_file = $upload_directory . uniqid();
    if (!move_uploaded_file($_FILES['file']['tmp_name'][$i], $uploaded_file)) {
        die('Could not upload ' . $uploaded_file);
    }
}

$statement->execute(array(
    "question" => $_POST['question'],
    "correct_answer" => $_POST['correct_answer'],
    "incorrect_answers" => implode(',', $_POST['incorrect_answers']),
    "image" => implode(',', $_FILES['file']['name']),
    "tags" => $_POST['tags'],
));

header("Location: /question_author#submitted");
