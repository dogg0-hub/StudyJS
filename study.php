<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<?php

$students = [
    "sato"=>[
        "kokugo" => 30,
        "sugaku" => 50,
    ],

    "tanaka"=>[
        "kokugo" => 11,
        "sugaku" => 55,
    ],

    "suzuki"=>[
        "kokugo" => 32,
        "sugaku" => 57,
    ],
    
];

?>

<table class="test_tbl">
            <tr>
                <th>
                    名前
                </th>
                <th>
                    国語
                </th>
                <th>
                    数学
                </th>
            </tr>
            <?php
            foreach($students as $key => $val){
                echo "<tr><th>".$key."</th>";
                foreach($val as $subject){
                    echo "<td>".$subject."点</td>";
                }
                echo "</tr>";
            }
            ?>
        </table>
</body>
</html>