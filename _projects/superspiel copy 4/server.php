<?php
function readPlayerData() {
    $allPlayers = [];

    if (file_exists('playerdata.json')) {
        $allPlayers = json_decode(file_get_contents('playerdata.json'), true);
    }

    return $allPlayers;
}
function savePlayerData($allPlayers) {
    file_put_contents('playerdata.json', json_encode($allPlayers));
}
function deleteFile($filename){

    if (file_exists($filename)) {
        if (unlink($filename)) {
            echo "File deleted successfully!";
        } else {
            echo "An error occurred!";
        }
    } else {
        echo "The file does not exist!";
    }    
}
function saveCsv($data){

    $filename = "output.csv";

    //if (count($data) < 1) {deleteFile($filename); exit;}
    
    $file = fopen($filename, "w"); // Open the file for write
    
    // If you want to save the array keys (column names) as the first row in the CSV
    $header = array_keys($data[0]);
    fputcsv($file, $header);
    
    // Loop through the data and save each row to the CSV
    foreach ($data as $row) {
        //print_r($row);  
        $arr=convertAssocArrayValues($row);
        fputcsv($file, $arr);
    }
    
    // Close the file
    fclose($file);
    
}
function convertAssocArrayValues($arr) {
    foreach ($arr as $key => $value) {
        if (is_array($value) && isset($value['x'])) { 
            $string = $value['x'] . '_' . $value['y'];
            $arr[$key] = $string; // implode('_', array_values($value));
        }
    }
    return $arr;
}
function isPositionInt($str) {
    return preg_match('/^\d+_\d+$/', $str);
}
function isPosition($str) {
    return preg_match('/^(\d+(\.\d+)?)_(\d+(\.\d+)?)$/', $str);
}
function convertToPositions($arr){
    foreach ($arr as $key => $value) {
        if (isPosition($value)) { 
            $arr1 = convertStringToArray($value);
            $arr[$key] = $arr1;
        }
    }
    return $arr;
}
function convertStringToArray($str) {
    list($x, $y) = explode('_', $str);
    return ['x' => (int)$x, 'y' => (int)$y];
}
function readCsv(){
    $filename = "output.csv";
    $data = [];

    if (file_exists($filename)) {

        // Open the file for reading
        $file = fopen($filename, "r");
        
        // Get the headers (column names) from the first line
        $headers = fgetcsv($file);
        
        // Read the rest of the data
        while ($row = fgetcsv($file)) {
            $convertedRow = convertToPositions($row);
            $data[] = array_combine($headers, $convertedRow);
        }
        
        // Close the file
        fclose($file);
    }
    return $data;
    // Print the data
    //print_r($data);    
}
function generateRandomPlayerData($goalPosition) {
    $id = dechex(rand(0x000000, 0xFFFFFF));
    return [
        'id' => $id, //rand(1, 10),
        'color' => '#' . $id, //dechex(rand(0x000000, 0xFFFFFF)),
        'goalPosition' => $goalPosition,
        'piecePosition' => [
            'x' => rand(0, 500), // assuming canvas width is 500 for simplicity
            'y' => rand(0, 500)  // assuming canvas height is 500
        ]
    ];
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $allPlayers = readCsv(); //readPlayerData();

    // update allPlayers
    $data = json_decode(file_get_contents('php://input'), true);
    $thisPlayer = $data['thisPlayer'];
    $cmd = $data['cmd'];
    $id = null;
    if ($cmd == 'join') {
        //$newPlayer = generateRandomPlayerData($thisPlayer['goalPosition']);
        $id = count($allPlayers); //$thisPlayer['id'];
        $thisPlayer['id'] = $id;
        $allPlayers[$id] = $thisPlayer;
    } else if ($cmd == 'start') {
        $allPlayers = [];
        deleteFile('output.csv');
    } else {
        $id = $thisPlayer['id'];
        $allPlayers[$id]['goalPosition'] = $thisPlayer['goalPosition'];
        $allPlayers[$id]['piecePosition'] = $thisPlayer['piecePosition'];
    }

    if (count($allPlayers)>=1) saveCsv($allPlayers); //savePlayerData($allPlayers);
    echo json_encode(['allPlayers' => $allPlayers,'cmd' => $cmd, 'id' => $id]);
    exit;
}

?>
