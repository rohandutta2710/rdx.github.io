<?php
$txt = $_POST['highscore'];
$txt1 = $_POST['highscores'];
if(strlen($txt)!=0){
    $myfile = fopen("./highscore.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $txt);
    fclose($myfile);
}
else if(strlen($txt1)==0){
    $output=file_get_contents('./highscore.txt');
    echo $output;
}
?>