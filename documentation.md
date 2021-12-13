- **POST `/questions`**

    Add a new question

    ```json
    {
     "question": "Uki ta contecendo?",
     "student": "Zoru",
     "class": "T3",
     "tags": "typescript, vida, javascript, java?"
    }
    ```

    The return must be an id of the registered question

    ```json
    {
     "id": 123456
    }
    ```

- **GET `/questions/:id`**

    There are two possible answers, unanswered question.

    ```json
    {
     "question": "Uki ta contecendo?",
     "student": "Zoru",
     "class": "T3",
     "tags": "typescript, vida, javascript, java?",
     "answered": false,
     "submitAt": "2021-01-01 10:12"
    }
    ```

    And question answered.

    ```json
    { 
     "question": "Uki ta contecendo?",
     "student": "Zoru",
     "class": "T3",
     "tags": "typescript, vida, javascript, java?",
     "answered": true,
     "submitAt": "2021-01-01 10:12",
     "answeredAt": "2021-01-01 10:30",
     "answeredBy": "Vegeta",
     "answer": "É mais de 8 miiiil!" 
    }
    ```

- **POST `/questions/:id`**

   This route is used to answer questions based on the question id and it must capture a **Bearer token** which will be used to identify who answered the question.

    ```json
    {
     "answer": "É mais de 8 miiiil!" 
    }
    ```

- **GET `/questions`**

    This route should return only unanswered questions.

    ```json
    [
     {
      "id": 123243,
      "question": "Uki ta contecendo?", 
      "student": "Zoru", 
      "class": "T3",
      "submitAt": "2021-01-01 10:12"
     }
    ]
    ```

- **POST `/users`**

    This route is used to register a person and must return a token that will be used to answer questions

    ```json
    {
     "name": "Vegeta",
     "class": "T3" 
    }
    ```

    ```json
    {
     "token": "1234-5678"
    }
    ```
