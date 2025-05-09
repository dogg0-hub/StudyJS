<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
    <link rel="stylesheet" href="sample.css">
</head>

<body>

    <h1>お問い合わせフォーム</h1>

    <form action="" method="post" id="form">
        <dl>
            <dt>
                <label>お名前</label>
            </dt>
            <dt>
                <input id="userName" type="text" name="name" required>
                <div id="userNameError" class="formError"></div>
            </dt>
            <br>
            
            <dt>
                <label>パスワード</label>
            </dt>
            <dt>
                <input type="password" name="password" id="password" required>
            </dt>

            <dt>
                <label>パスワード（確認用）</label>
            </dt>
            <dt>
                <input type="password" name="passwordConfirm" id="passwordConfirm" required>
                <div id="passwordError" class="formError"></div>
            </dt>

            <dt>
                <label>性別</label>
            </dt>
            <dt>
                <label>女性</label><br>
            </dt>
            <dt>
                <input type="radio" name="gender" id="female" value="女性" required>
            </dt>

            <dt>
                <label>男性</label><br>
            </dt>
            <dt>
                <input type="radio" name="gender" id="male" value="男性" required>
            </dt>

            <dt>
                <label>その他</label><br>
            </dt>
            <dt>
                <input type="radio" name="gender" id="other" value="その他" required>
            </dt>

            <dt>
                <label>住所</label>
            </dt>
            <dt>
                <input type="text" name="address" id="address" required>
            </dt>


            <dt>
                <label>お問い合わせ項目</label>
            </dt>
            <dt>
                <label for="question">質問</label>
                <input type="checkbox" name="item[]" id="question1" value="質問">
                <label for="question">見積り</label>
                <input type="checkbox" name="item[]" id="question2" value="見積り">
                <label for="question">提案</label>
                <input type="checkbox" name="item[]" id="question3" value="提案">
            </dt>
            <br>

            <dt>
                <label for="content">お問い合わせ内容</label>
            </dt>
            <dt>
                <textarea name="content" id="content" required></textarea><br>
            </dt>
            <dt>
                <input type="submit" value="送信" name="submit" id="submit">
            </dt>

        </dl>
    </form>

    <script>

        var form = document.getElementById("form");
        var submitButton = document.getElementById("submit");

        //このイベントは何だ
        function submitButtonClick(event){
            event.preventDefault();
            var userName = document.getElementById("userName").value;
            var userNameError = document.getElementById("userNameError");//?

            var password = document.getElementById("password").value;
            var passwordConfirm = document.getElementById("passwordConfirm").value;
            var passwordError = document.getElementById("passwordError");

            var gender = document.getElementsByName("gender");
            var address = document.getElementById("address").value;
            var questionItem = document.getElementsByName("item[]");
            var content = document.getElementById("content").value;

            userNameError.style.display = "none";
            userNameError.textContent = "";
            passwordError.style.display = "none";
            passwordError.textContent = "";

            if(!form.checkValidity()){
                form.reportValidity();
                return;
            }

            if(userName.length >= 20){
                userNameError.style.display = "block";
                userNameError.textContent = "※名前は20文字以内にしてください";
            }else if(password !== passwordConfirm){
                passwordError.style.display = "block";
                passwordError.textContent = "※パスワードが一致しません";
            }else if(password.length >= 10 && passwordConfirm.length >= 10){
                passwordError.style.display = "block";
                passwordError.textContent = "※パスワードは10文字以下にしてください";
            }else{
                alert("送信完了");
                form.submit();
                userNameError.style.display = "none";
                userNameError.textContent = "";
                passwordError.style.display = "none";
                passwordError.textContent = "";
            }

        }

        submitButton.addEventListener("click",submitButtonClick);
        //↓上手くいかない
        //form.addEventListener("submit", submitButtonClick);

    </script>

    <?php
        //ここから反映されない
        if($_POST){
            echo '名前 : ' . $_POST['name'] . '<br>';
            echo '性別 : ' . $_POST['gender'] . '<br>';
            echo '住所 : ' . $_POST['address'] . '<br>';
            $item = implode($_POST['item']);
            echo '項目 : ' . $item . '<br>';
            echo 'お問い合わせ内容 : ' . $_POST['content'];
        }

    ?>


</body>

</html>