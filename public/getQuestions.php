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

$statement = $pdo->prepare("SELECT * from questions");
$statement->execute();

$result = $statement->fetchAll(PDO::FETCH_CLASS);

header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

echo json_encode($result);