!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1 style="text-align: center">Create a blog</h1>
    <form
      action="/user/blogs/createBlog"
      method="post"
      enctype="multipart/form-data"
      class="container-lg"
    >
      <%- include('./partials/blogForm') %>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </body>
</html>