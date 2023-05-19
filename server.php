<?php

header('Content_Type: application/json');

$jsonTaskString = file_get_contents('database.json');

// True server a rendere la srtinga decodificata un array associativo
$jsonTaskList = json_decode($jsonTaskString, true);

$taskList = json_encode($jsonTaskList);

echo $taskList;