<?php
// file to display in table
$txt = $_POST['data'];
$myfile = fopen("./winner_spin.txt", "a") or die("Unable to open file!");
fwrite($myfile, $txt);
fclose($myfile);
if($txt=="")
{
    $output=file_get_contents('./winner_spin.txt');
    echo $output;
}
// file to save the data in a organised manner
$txt1 = $_POST['data1'];
$myfile1 = fopen("./winner_spin1.txt", "a") or die("Unable to open file!");
fwrite($myfile1, $txt1);
fclose($myfile1);
?>
